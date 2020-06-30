package com.gatico.file.dao;

import com.gatico.file.entity.FileEntity;
import com.sun.xml.internal.bind.v2.model.core.ID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

@Repository
public interface FileDao extends JpaRepository<FileEntity, Long>, PagingAndSortingRepository<FileEntity, Long>{

    List<FileEntity> findAllByUserIdAndTypeAndRemoved(Long userId, String type, boolean removeFlag);

    Optional<FileEntity> findById(Long fileId);

    Integer countAllByUserIdAndRemovedFalse(Long userId);

    Page<FileEntity> findAll(Specification<FileEntity> spec, Pageable pageable);

}
