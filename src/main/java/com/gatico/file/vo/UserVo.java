package com.gatico.file.vo;

public class UserVo{
    private String uuid;
    private String userName;
    private String nickName;

    public UserVo(String userName, String nickName, String uuid) {
        this.userName = userName;
        this.nickName = nickName;
        this.uuid = uuid;
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
}
