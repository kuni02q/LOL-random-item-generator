package application.web;

import application.model.User;
import lombok.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/users")
public interface UserController {

    @GetMapping
    List<User> getAllUsers();

    @GetMapping("/{id}")
    User getUser(@NonNull @PathVariable String id);

    @PostMapping
    User createUser(@RequestBody @NonNull User user);

    @PostMapping("/{userId}/favorite/{buildId}")
    User addFavoriteToUser(@NonNull @PathVariable String userId,
                           @NonNull @PathVariable String buildId);

    @DeleteMapping("/{userId}/favorite/{buildId}")
    User removeFavoriteFromUser(@NonNull @PathVariable String userId,
                                @NonNull @PathVariable String buildId);
}
