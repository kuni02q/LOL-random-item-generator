package application.web;

import application.model.Build;
import application.model.BuildFavorite;
import application.repository.BuildFavoriteRepository;
import application.repository.BuildRepository;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.time.OffsetDateTime;
import java.util.List;

@RestController
@AllArgsConstructor
@Slf4j
public class BuildFavoriteControllerImpl implements BuildFavoriteController {
    private final BuildFavoriteRepository favoriteRepository;
    private final BuildRepository buildRepository;

    @Override
    public BuildFavorite addFavorite(@NonNull String buildId) {

        Build build = buildRepository.findById(buildId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Build not found with id: " + buildId
                ));

        BuildFavorite favorite = BuildFavorite.builder()
                .build(build)
                .created(OffsetDateTime.now())
                .build();

        return favoriteRepository.save(favorite);
    }

    @Override
    public void removeFavorite(@NonNull String favoriteId) {
        favoriteRepository.deleteById(favoriteId);
    }

    @Override
    public List<BuildFavorite> getAllFavorites() {
        return favoriteRepository.findAll();
    }
}
