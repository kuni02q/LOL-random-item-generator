package application.web;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import application.model.Champion;
import org.springframework.web.bind.annotation.RestController;
import application.repository.ChampionRepository;

import java.time.OffsetDateTime;
import java.util.List;

@RestController
@AllArgsConstructor
@Slf4j
public class ChampionControllerImpl implements ChampionController{

    private final ChampionRepository repository;

    @Override
    public List<Champion> getAll() {
        return repository.findAll();
    }

    @Override
    public Champion getOne(@NonNull String id) {
        return repository.findById(id).orElseThrow(IllegalArgumentException::new);
    }
}
