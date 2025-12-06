package application.web;

import lombok.NonNull;
import application.model.Champion;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/champion")
public interface ChampionController {
    @GetMapping()
    List<Champion> getAll();

    @GetMapping("/{id}")
    Champion getOne(@NonNull @PathVariable String id);

}
