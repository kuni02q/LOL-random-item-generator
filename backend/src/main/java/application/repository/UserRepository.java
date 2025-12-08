package application.repository;

import application.model.User;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface UserRepository extends CrudRepository<User, String> {
    List<User> findAll();
}
