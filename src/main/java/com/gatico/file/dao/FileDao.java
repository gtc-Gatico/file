package com.gatico.file.dao;

import com.gatico.file.entity.FileEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FileDao extends JpaRepository<FileEntity, Long>, PagingAndSortingRepository<FileEntity, Long> {

    Optional<FileEntity> findById(Long fileId);

    Long count(Specification<FileEntity> spec);

    Page<FileEntity> findAll(Specification<FileEntity> spec, Pageable pageable);

}
