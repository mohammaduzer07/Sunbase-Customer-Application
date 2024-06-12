package com.sunbase.Sunbase_Customer_App.Repository;

import com.sunbase.Sunbase_Customer_App.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}

