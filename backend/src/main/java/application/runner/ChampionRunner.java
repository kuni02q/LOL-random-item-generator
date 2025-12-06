package application.runner;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import application.model.Champion;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import application.repository.ChampionRepository;

import java.io.File;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.time.OffsetDateTime;
import java.util.Iterator;
import java.util.List;

@Component
@AllArgsConstructor
@Order(1)
public class ChampionRunner implements CommandLineRunner {

    private static final Logger LOGGER = LoggerFactory.getLogger(ChampionRunner.class);

    private final ChampionRepository repository;

    @Override
    public void run(String... args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();

        String version = "https://ddragon.leagueoflegends.com/api/versions.json";
        JsonNode versions;
        try (InputStream inputStream = new URL(version).openStream()) {
            versions = mapper.readTree(inputStream);
        }
        String latestVersion = versions.get(0).asText();

        String url = "https://ddragon.leagueoflegends.com/cdn/" + latestVersion + "/data/en_US/champion.json";

        try (InputStream inputStream = new URL(url).openStream()) {
            JsonNode root = mapper.readTree(inputStream);
            JsonNode data = root.get("data");

            //File imageDir = new File("src/main/resources/static/champions/");
            File imageDir = new File("images/champions/");
            if (!imageDir.exists()) imageDir.mkdirs();

            Iterator<String> championNames = data.fieldNames();
            while (championNames.hasNext()) {
                String champKey = championNames.next();
                JsonNode champ = data.get(champKey);

                if (repository.existsById(champ.get("id").asText())) {
                    continue;
                }

                Champion c = Champion.builder()
                        .id(champ.get("id").asText())
                        .name(champ.get("name").asText())
                        .title(champ.get("title").asText())
                        .imageUrl("champions/" + champKey + ".png")
                        .build();

                repository.save(c);
                LOGGER.info(champ.toString());

                String imageUrl = "https://ddragon.leagueoflegends.com/cdn/" + latestVersion + "/img/champion/" + champKey + ".png";

                    File targetFile = new File(imageDir, champKey + ".png");
                if (!targetFile.exists()) {
                    try (InputStream in = new URL(imageUrl).openStream()) {
                        Files.copy(in, targetFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
                        LOGGER.info("Kép letöltve: {}", targetFile.getAbsolutePath());
                    } catch (Exception e) {
                        LOGGER.warn("Hiba a kép letöltésénél: {}", champKey, e);
                    }
                } else {
                    LOGGER.info("Kép már létezik: {}", targetFile.getAbsolutePath());
                }

            }

        }
    }
}
