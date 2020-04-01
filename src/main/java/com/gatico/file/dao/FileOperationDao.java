package com.gatico.file.dao;

import com.gatico.file.entity.FileEntity;
import com.gatico.file.entity.FileOperationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileOperationDao extends JpaRepository<FileOperationEntity, Long> {
}
