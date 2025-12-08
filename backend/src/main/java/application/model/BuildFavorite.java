package application.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "FAVORITE_BUILDS")
public class BuildFavorite {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "build_id")
    private Build build;

    private OffsetDateTime created;

    @ManyToMany(mappedBy = "favoriteBuilds")
    private Set<User> users = new HashSet<>();
}
