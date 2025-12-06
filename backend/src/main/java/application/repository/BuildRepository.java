package application.repository;

import application.model.Build;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BuildRepository extends CrudRepository<Build, String> {
    List<Build> findAll();
}
