package application.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/dba/**").permitAll() // H2 konzol engedélyezése
                        .anyRequest().authenticated()
                )
                .csrf(csrf -> csrf.disable()) // H2 konzolhoz kell
                .headers(headers -> headers.frameOptions(frame -> frame.disable())); // H2 konzol iframe-hez

        return http.build();
    }
}

