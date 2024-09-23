package com.essia.desafio.controllers;

import com.essia.desafio.entities.SystemManager;
import com.essia.desafio.service.SystemManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/system")
@CrossOrigin(origins = "*")
public class SystemManagerController {


    @Autowired
    private SystemManagerService service;

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    public ResponseEntity<Object> deleteByID(@PathVariable long id) {
        service.remover(id);
        return ResponseEntity.ok().build();
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<SystemManager> persist(@RequestBody SystemManager systemManager) {
        SystemManager result = service.persist(systemManager);
        return ResponseEntity.ok().body(result);
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Object> listAll() {
        Object result = service.findAll();
        return ResponseEntity.ok().body(result);

    }
}
