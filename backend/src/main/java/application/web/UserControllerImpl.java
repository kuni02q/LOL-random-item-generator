package application.web;

import application.model.Build;
import application.model.BuildFavorite;
import application.model.User;
import application.repository.BuildFavoriteRepository;
import application.repository.BuildRepository;
import application.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.List;

@RestController
@AllArgsConstructor
@Slf4j
public class UserControllerImpl implements UserController {

    private final UserRepository userRepository;
    private final BuildFavoriteRepository favoriteRepository;
    private final BuildRepository buildRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUser(@NonNull String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    @Override
    public User createUser(@NonNull User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public User addFavoriteToUser(@NonNull String userId, @NonNull String buildId) {
        User user = getUser(userId);

        Build build = buildRepository.findById(buildId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Build not found"));

        BuildFavorite favorite = favoriteRepository.findAll().stream()
                .filter(f -> f.getBuild().getId().equals(buildId))
                .findFirst()
                .orElseGet(() -> favoriteRepository.save(BuildFavorite.builder()
                        .build(build)
                        .created(OffsetDateTime.now())
                        .build()));

        if (user.getFavoriteBuilds() == null) user.setFavoriteBuilds(new HashSet<>());
        user.getFavoriteBuilds().add(favorite);

        return userRepository.save(user);
    }

    @Override
    public User removeFavoriteFromUser(@NonNull String userId, @NonNull String buildId) {
        User user = getUser(userId);

        user.getFavoriteBuilds().removeIf(fav -> fav.getBuild().getId().equals(buildId));

        return userRepository.save(user);
    }
}
