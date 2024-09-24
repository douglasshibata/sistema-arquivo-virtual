package com.essia.desafio.service;

import com.essia.desafio.dto.SystemManagerDTO;
import com.essia.desafio.entities.SystemManager;
import com.essia.desafio.reflections.Transformator;
import com.essia.desafio.repositories.SystemManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

@Service
public class SystemManagerService {

    @Autowired
    private SystemManagerRepository systemManagerRepository;

    public SystemManager persist(SystemManager systemManager) {
        return systemManagerRepository.save(systemManager);
    }

    public void remove(Long id) {
        systemManagerRepository.deleteById(id);
    }

    public List<SystemManagerDTO> findAll() {
        return convertListToLIstDTO(systemManagerRepository.findAllByNodeParentIsNull());
    }

    public List<SystemManagerDTO> convertListToLIstDTO(List<SystemManager> managers) {
        return managers.stream().map(this::convertSystemToGetParentNode).toList();
    }

    private SystemManagerDTO convertSystemToGetParentNode(SystemManager systemManager) {
        try {
            return new Transformator().transformToDto(systemManager);
        } catch (ClassNotFoundException | NoSuchMethodException | InvocationTargetException | InstantiationException |
                 IllegalAccessException e) {
            throw new RuntimeException(e);
        }
    }
}
