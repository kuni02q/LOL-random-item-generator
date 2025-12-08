package application.web;

import application.model.User;
import application.repository.UserRepository;
import application.security.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody AuthRequest request) {
        User user = userRepository.findByUsername(request.username())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(user.getUsername());

        return Map.of("token", token);
    }

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody RegisterRequest request) {
        // Ellenőrizzük, hogy a felhasználónév vagy email már létezik-e
        if (userRepository.existsByUsername(request.username())) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByEmail(request.email())) {
            throw new RuntimeException("Email already exists");
        }

        // Új felhasználó létrehozása és jelszó kódolása
        User user = new User();
        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));

        userRepository.save(user);

        // JWT generálása
        String token = jwtUtil.generateToken(user.getUsername());

        return Map.of("token", token);
    }

    public static record AuthRequest(String username, String password) {}

    public static record RegisterRequest(String username, String email, String password) {}

}
