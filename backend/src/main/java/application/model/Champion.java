package application.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.time.OffsetDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Builder
@Entity(name = "CHAMPIONS")
public class Champion {

    @Id
    @EqualsAndHashCode.Include
    private String id;

    private String name;
    private String title;
    private String imageUrl;
}
