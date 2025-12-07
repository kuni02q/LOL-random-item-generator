package application.runner;

import application.model.Item;
import application.repository.ItemRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.antlr.v4.runtime.atn.ParseInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Component
@AllArgsConstructor
@Order(1)
public class ItemRunner implements CommandLineRunner {

    private static final Logger LOGGER = LoggerFactory.getLogger(ItemRunner.class);
    private final ItemRepository repository;

    @Override
    public void run(String... args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();

        String versionUrl = "https://ddragon.leagueoflegends.com/api/versions.json";
        JsonNode versions;
        try (InputStream inputStream = new URL(versionUrl).openStream()) {
            versions = mapper.readTree(inputStream);
        }
        String latestVersion = versions.get(0).asText();

        String url = "https://ddragon.leagueoflegends.com/cdn/" + latestVersion + "/data/en_US/item.json";

        try (InputStream inputStream = new URL(url).openStream()) {
            JsonNode root = mapper.readTree(inputStream);
            JsonNode data = root.get("data");

            File imageDir = new File("images/items/");
            if (!imageDir.exists()) {
                imageDir.mkdir();
            }

            Iterator<String> itemIds = data.fieldNames();

            while (itemIds.hasNext()) {
                String itemId = itemIds.next();
                JsonNode item = data.get(itemId);

                if (item == null) {
                    continue;
                }

                JsonNode mapsNode = item.get("maps");
                JsonNode goldNode = item.get("gold");
                if (mapsNode == null
                        || !mapsNode.has("11")
                        || !mapsNode.get("11").asBoolean()
                        || goldNode.get("total").asInt() == 0
                        || itemId.length() >5){
                    continue;
                }

                LOGGER.warn("Skipping invalid item: {}, {}", itemId, item);

                if (repository.existsById(itemId)) {
                    continue;
                }

                JsonNode intoNode = item.get("into");
                int intoCount = 0;
                if (intoNode != null && intoNode.isArray()) {
                    intoCount = intoNode.size();
                }


                Item i = Item.builder()
                        .id(itemId)
                        .name(item.get("name").asText())
                        .imageUrl("items/" + itemId + ".png")
                        .cost(item.get("gold").get("total").asInt())
                        .intoCount(intoCount)
                        .build();
                repository.save(i);

                String imageUrl = "https://ddragon.leagueoflegends.com/cdn/" + latestVersion + "/img/item/" + itemId + ".png";
                File targetFile = new File(imageDir, itemId + ".png");

                if (!targetFile.exists()) {
                    try (InputStream in = new URL(imageUrl).openStream()) {
                        Files.copy(in, targetFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
                        LOGGER.info("Kép letöltve: {}", targetFile.getAbsolutePath());
                    } catch (Exception e) {
                        LOGGER.warn("Hiba a kép letöltésénél: {}", itemId, e);
                    }
                } else {
                    LOGGER.info("Kép már létezik: {}", targetFile.getAbsolutePath());
                }

            }

        }

    }


}
