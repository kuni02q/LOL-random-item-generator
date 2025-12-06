package application.web;

import application.model.Build;
import application.model.Champion;
import application.model.Item;
import application.repository.BuildRepository;
import application.repository.ChampionRepository;
import application.repository.ItemRepository;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;
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
        return buildRepository.findById(id).orElseThrow(IllegalArgumentException::new);
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
        List<Champion> champions = championRepository.findAll();
        List<Item> legendaryItems = itemRepository.findAll().stream()
                .filter(i -> i.getInto() == null || i.getInto().isEmpty())
                .toList();

        if (champions.isEmpty()) {
            throw new IllegalStateException("Nincsenek championok!");
        }

        Champion champ = champions.get(new Random().nextInt(champions.size()));

        int itemCount = 6;

        Collections.shuffle(legendaryItems);
        List<Item> selectedItems = legendaryItems.subList(0, itemCount);

        Build build = Build.builder()
                .champion(champ)
                .items(selectedItems)
                .created(OffsetDateTime.now())
                .updated(OffsetDateTime.now())
                .build();

        return buildRepository.save(build);
    }

}
