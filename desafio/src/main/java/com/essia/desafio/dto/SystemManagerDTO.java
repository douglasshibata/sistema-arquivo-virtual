package com.essia.desafio.dto;

import com.essia.desafio.entities.SystemManager;

import java.util.ArrayList;
import java.util.List;

public class SystemManagerDTO {
    private long id;

    private Boolean isFolder;

    private String name;

    private List<SystemManager> nodeChild = new ArrayList<>();

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
