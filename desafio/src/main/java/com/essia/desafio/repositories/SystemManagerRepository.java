package com.essia.desafio.repositories;

import com.essia.desafio.entities.SystemManager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SystemManagerRepository extends JpaRepository<SystemManager, Long> {
    List<SystemManager> findAllByNodeParentIsNull();
}
