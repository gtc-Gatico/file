package com.gatico.file.dao;

import com.gatico.file.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends JpaRepository<UserEntity, Long> {

    UserEntity findByUserName(String username);
}
