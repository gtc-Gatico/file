package com.gatico.file.vo;

import java.sql.Timestamp;

public class FileVo {

    private Long id;
    private String name;
    private Double length;
    private String path;
    private Timestamp time;
    private String type;

    public FileVo() {
    }


    public FileVo(Long id, String name, Double length, String path, Timestamp time, String type) {
        this.id = id;
        this.name = name;
        this.length = length;
        this.path = path;
        this.time = time;
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getLength() {
        return length;
    }

    public void setLength(Double length) {
        this.length = length;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

}
