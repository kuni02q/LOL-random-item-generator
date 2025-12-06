package application.web;

import lombok.NonNull;
import application.model.Item;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/item")
public interface ItemController {
    @GetMapping()
    List<Item> getAll();

    @GetMapping("/{id}")
    Item getOne(@NonNull @PathVariable String id);
}