package com.gatico.file.service;

import com.gatico.file.dao.UserDao;
import com.gatico.file.entity.UserEntity;
import com.gatico.file.utils.MD5Utils;
import com.gatico.file.vo.BaseVo;
import com.gatico.file.vo.UserVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
public class UserService {

    private static Map<String, UserEntity> uuidEntityMap = new HashMap<>();//随机uuid 和用户uid对应关系
    private static Map<String, String> uidUuidMap = new HashMap<>();//用户uid 和 随机uuid对应关系
    @Autowired
    private UserDao userDao;

    public UserEntity getUser(String username) {
        UserEntity userEntity = userDao.findByUserName(username);
        return userEntity;
    }

    public BaseVo login(String name, String password) {
        UserEntity userEntity = getUser(name);
        BaseVo baseVo = BaseVo.getVo();
        if (null == userEntity) {
            baseVo = BaseVo.getErrorVo(1, "没有此用户");
        } else {
            if (userEntity.getUserPwd().equals(MD5Utils.SHA1(password))) {
                String uuid = UUID.randomUUID().toString();
                UserVo userVo = new UserVo(userEntity.getUserName(), userEntity.getNickName(), uuid);
                logout(userEntity.getUid());
                uuidEntityMap.put(uuid, userEntity);
                uidUuidMap.put(userEntity.getUid(), uuid);
                baseVo = BaseVo.getSuccessVo("登录成功");
                baseVo.setData("user", userVo);
            } else {
                baseVo.setCode(1);
                baseVo.setMsg("密码错误");
            }
        }
        return baseVo;
    }

    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public BaseVo register(String name, String password) {
        BaseVo vo = BaseVo.getVo();
        UserEntity userEntity = getUser(name);
        if (null == userEntity) {
            userEntity = new UserEntity();
            userEntity.setUid(UUID.randomUUID().toString());
            userEntity.setUserPwd(MD5Utils.SHA1(password));
            userEntity.setAccount(name);
            userEntity.setUserName(name);
            userDao.saveAndFlush(userEntity);
            vo.setCode(0);
            vo.setMsg("注册成功");
            String uuid = UUID.randomUUID().toString();
            uuidEntityMap.put(uuid, userEntity);
            vo.setData("user", new UserVo(userEntity.getUserName(), userEntity.getNickName(), uuid));
        } else {
            vo.setCode(BaseVo.SUCCESS_CODE);
            vo.setMsg("注册失败，用户已存在");
        }
        return vo;
    }

    public Boolean checkUser(String uuid) {
        UserEntity userEntity = uuidEntityMap.get(uuid);
        if (userEntity != null) {
            return true;
        }
        return false;
    }

    public UserEntity getUserByUuid(String uuid) {
        UserEntity userEntity = uuidEntityMap.get(uuid);
        if (userEntity != null) {
            return userEntity;
        }
        return null;
    }

    public BaseVo logout(String uuid) {
        if (uuidEntityMap.get(uuid) != null) {
            UserEntity userEntity =uuidEntityMap.remove(uuid);
            uidUuidMap.remove(userEntity.getUid());
            return BaseVo.getSuccessVo();
        }
        return BaseVo.getErrorVo();
    }
}
