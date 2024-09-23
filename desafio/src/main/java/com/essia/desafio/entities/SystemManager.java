package com.essia.desafio.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tb_system_manager")
public class SystemManager {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private Boolean isFolder;

    private String name;

    @JsonManagedReference
    @OneToMany(mappedBy = "nodeParent",cascade = CascadeType.ALL)
    private List<SystemManager> nodeChild = new ArrayList<>();

    @JsonBackReference
    @ManyToOne
    private SystemManager nodeParent;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Boolean getFolder() {
        return isFolder;
    }

    public void setFolder(Boolean folder) {
        isFolder = folder;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<SystemManager> getNodeChild() {
        return nodeChild;
    }

    public void setNodeChild(List<SystemManager> nodeChild) {
        this.nodeChild = nodeChild;
    }

    public SystemManager getNodeParent() {
        return nodeParent;
    }

    public void setNodeParent(SystemManager nodeParent) {
        this.nodeParent = nodeParent;
    }
}
