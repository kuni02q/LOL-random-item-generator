package application.web;

import application.model.Build;
import application.model.Champion;
import application.model.Item;
import application.repository.BuildRepository;
import application.repository.ChampionRepository;
import application.repository.ItemRepository;
import com.github.javafaker.Faker;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

@RestController
@AllArgsConstructor
@Slf4j
public class BuildControllerImpl implements BuildController {

    private final BuildRepository buildRepository;
    private final ChampionRepository championRepository;
    private final ItemRepository itemRepository;

    @Override
    public List<Build> getAll() {
        return buildRepository.findAll();
    }

    @Override
    public Build getOne(@NonNull String id) {
        return buildRepository.findById(id).
                orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Build not found with id: " + id
        ));
    }

    @Override
    public Build createOne(@NonNull Build build) {
        build.setCreated(OffsetDateTime.now());
        build.setUpdated(OffsetDateTime.now());
        return buildRepository.save(build);
    }

    @Override
    public Build updateOne(@NonNull Build build) {
        build.setUpdated(OffsetDateTime.now());
        return buildRepository.save(build);
    }

    @Override
    public void deleteById(@NonNull String id) {
        buildRepository.deleteById(id);
    }

    @Override
    public Build generateRandomBuild() {
        Faker faker = new Faker();
        String generatedName = faker.space().galaxy() + " " + faker.animal().name();


        List<Champion> champions = championRepository.findAll();
        List<Item> legendaryItems = itemRepository.findAll().stream()
                .filter(item -> item.getIntoCount() == 0)
                .toList();

        if (champions.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "No champions available");
        }
        if (legendaryItems.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Not enough items to generate build");
        }


        Champion champ = champions.get(new Random().nextInt(champions.size()));

        List<Item> items = new ArrayList<>(legendaryItems);
        Collections.shuffle(items);
        List<Item> selectedItems = items.subList(0, 6);

        Build build = Build.builder()
                .name(generatedName)
                .champion(champ)
                .items(selectedItems)
                .created(OffsetDateTime.now())
                .updated(OffsetDateTime.now())
                .build();

        return buildRepository.save(build);
    }

}
