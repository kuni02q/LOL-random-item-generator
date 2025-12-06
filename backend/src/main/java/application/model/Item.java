package application.model;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.time.OffsetDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Builder
@Entity(name = "ITEMS")
public class Item {

    @Id
    @EqualsAndHashCode.Include
    private String id;
    private String name;
    private String imageUrl;
    private int cost;
    @ElementCollection
    private List<String> into;
}
