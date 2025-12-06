package application.repository;

import application.model.BuildFavorite;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BuildFavoriteRepository extends CrudRepository<BuildFavorite, String> {
    List<BuildFavorite> findAll();
}
