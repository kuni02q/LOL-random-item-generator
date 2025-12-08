package application.runner;

import application.model.User;
import application.repository.UserRepository;
import com.github.javafaker.Faker;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UserRunner implements CommandLineRunner {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        Faker faker = new Faker();

        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = User.builder()
                    .username("admin")
                    .email("admin@example.com")
                    .password(passwordEncoder.encode("admin123")) // jelszó: admin123
                    .build();
            userRepository.save(admin);
            System.out.println("Admin user created: username=admin, password=admin123");
        }



        for (int i = 0; i < 100; i++) {
            User user = User.builder()
                    .username(faker.name().username())
                    .email(faker.internet().emailAddress())
                    .password(passwordEncoder.encode(faker.internet().password()))
                    .build();
            userRepository.save(user);
        }

        System.out.println("100 fake users created!");
    }
}
