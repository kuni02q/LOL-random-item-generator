package application.web;

import application.model.BuildFavorite;
import lombok.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/favorites")
public interface BuildFavoriteController {

    @PostMapping("/{buildId}")
    BuildFavorite addFavorite(@NonNull @PathVariable String buildId);

    @DeleteMapping("/{favoriteId}")
    void removeFavorite(@NonNull @PathVariable String favoriteId);

    @GetMapping
    List<BuildFavorite> getAllFavorites();
}
