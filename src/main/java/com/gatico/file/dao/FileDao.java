package com.gatico.file.dao;

import com.gatico.file.entity.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FileDao extends JpaRepository<FileEntity, Long> {

    List<FileEntity> findAllByUserIdAndType(Long userId, String type);

    Optional<FileEntity> findById(Long fileId);
}
