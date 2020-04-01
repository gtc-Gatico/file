package com.gatico.file.entity;

import javax.persistence.*;

@Entity
@Table(name = "user")
public class UserEntity {
    private Long id;
    private String uid;
    private String account;
    private String userName;
    private String userPwd;
    private String nickName;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    @Basic
    @Column(name = "uid")
    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    @Basic
    @Column(name = "account")
    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    @Basic
    @Column(name = "user_name")
    public String getUserName() {
        return userName;
    }

    public void setUserName(String username) {
        this.userName = username;
    }

    @Basic
    @Column(name = "user_pwd")
    public String getUserPwd() {
        return userPwd;
    }

    public void setUserPwd(String userpwd) {
        this.userPwd = userpwd;
    }

    @Basic
    @Column(name = "nick_name")
    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickname) {
        this.nickName = nickname;
    }
}
