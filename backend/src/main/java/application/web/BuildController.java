package application.web;

import application.model.Build;
import lombok.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/build")
public interface BuildController {

    @GetMapping()
    List<Build> getAll();

    @GetMapping("/{id}")
    Build getOne(@NonNull @PathVariable String id);

    @PostMapping
    Build createOne(@NonNull @RequestBody Build build);

    @PutMapping
    Build updateOne(@NonNull @RequestBody Build build);

    @DeleteMapping("/{id}")
    void deleteById(@NonNull @PathVariable String id);

    @PostMapping("/generate")
    Build generateRandomBuild();
}
