package com.gatico.file.vo;

public class UserVo {
    private String uuid;
    private String userName;
    private String nickName;
    private String role;

    public UserVo(String userName, String nickName, String uuid, String role) {
        this.userName = userName;
        this.nickName = nickName;
        this.uuid = uuid;
        this.role = role;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
