package application.web;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import application.model.Item;
import application.repository.ItemRepository;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;
import java.util.List;

@RestController
@AllArgsConstructor
@Slf4j
public class ItemControllerImpl implements ItemController {

    private final ItemRepository repository;

    @Override
    public List<Item> getAll() {
        return repository.findAll();
    }

    @Override
    public Item getOne(@NonNull String id) {
        return repository.findById(id).orElseThrow(IllegalArgumentException::new);
    }

}
