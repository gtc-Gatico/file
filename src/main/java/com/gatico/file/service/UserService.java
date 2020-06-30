package com.gatico.file.service;

import com.gatico.file.dao.UserDao;
import com.gatico.file.entity.UserEntity;
import com.gatico.file.utils.MD5Utils;
import com.gatico.file.vo.BaseVo;
import com.gatico.file.vo.UserVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
public class UserService {

    @Autowired
    private RedisTemplate redisTemplate;

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
                UserVo userVo = new UserVo(userEntity.getUserName(), userEntity.getNickName(), uuid, userEntity.getRole());
                logout(userEntity.getUid());

                redisTemplate.opsForValue().set(uuid, userEntity, 30, TimeUnit.MINUTES);
                baseVo = BaseVo.getSuccessVo("登录成功");
                baseVo.setData(userVo);
            } else {
                baseVo.setCode(1);
                baseVo.setMsg("密码错误");
            }
        }
        return baseVo;
    }

    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public BaseVo register(String name, String password, String nickName) {
        BaseVo vo = BaseVo.getVo();
        UserEntity userEntity = getUser(name);
        if (null == userEntity) {
            userEntity = new UserEntity();
            userEntity.setUid(UUID.randomUUID().toString());
            userEntity.setUserPwd(MD5Utils.SHA1(password));
            userEntity.setAccount(name);
            userEntity.setUserName(name);
            userEntity.setNickName(nickName);
            userEntity.setRole("user");
            userDao.saveAndFlush(userEntity);
            vo.setCode(0);
            vo.setMsg("注册成功");
            String uuid = UUID.randomUUID().toString();
            redisTemplate.opsForValue().set(uuid, userEntity, 30, TimeUnit.MINUTES);
            vo.setData(new UserVo(userEntity.getUserName(), userEntity.getNickName(), uuid, userEntity.getRole()));
        } else {
            vo.setCode(BaseVo.SUCCESS_CODE);
            vo.setMsg("注册失败，用户已存在");
        }
        return vo;
    }

    public Boolean checkUser(String uuid) {
        UserEntity userEntity = (UserEntity) redisTemplate.opsForValue().get(uuid);
        if (userEntity != null && userEntity.getRole() != null) {
            return true;
        }
        return false;
    }


    public BaseVo logout(String uuid) {
        UserEntity userEntity = (UserEntity) redisTemplate.opsForValue().get(uuid);
        if (userEntity != null) {
            redisTemplate.opsForValue().set(uuid, userEntity, 1, TimeUnit.SECONDS);
        }
        return BaseVo.getSuccessVo();
    }
}
