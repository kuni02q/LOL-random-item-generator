package application.repository;

import application.model.Champion;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ChampionRepository extends CrudRepository<Champion, String> {
    List<Champion> findAll();
}
