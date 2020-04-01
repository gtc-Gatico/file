package com.gatico.file.enums;

public enum FileOperationType {

    UPDATE("修改", "update"),
    REMOVE("删除", "REMOVE"),
    DOWNLOAD("下载", "DOWNLOAD"),

    ;
    private String name;
    private String code;

    FileOperationType(String name, String code) {
        this.code = code;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
