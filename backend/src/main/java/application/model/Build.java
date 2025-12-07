package application.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Builder
@Entity(name = "BUILDS")
public class Build {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "champion_id")
    private Champion champion;

    @ManyToMany
    @JoinTable(
            name = "BUILD_ITEMS",
            joinColumns = @JoinColumn(name = "build_id"),
            inverseJoinColumns = @JoinColumn(name = "item_id")
    )
    @Builder.Default
    private List<Item> items = new ArrayList<>();

    private OffsetDateTime created;
    private OffsetDateTime updated;
}
