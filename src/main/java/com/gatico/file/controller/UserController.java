package com.gatico.file.controller;

import com.gatico.file.bean.UserBean;
import com.gatico.file.service.FileService;
import com.gatico.file.service.UserService;
import com.gatico.file.vo.BaseVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private FileService fileService;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<Object> register(@RequestBody  UserBean userBean) {
        return ResponseEntity.ok(userService.register(userBean.getName(), userBean.getPassword(),userBean.getNickName()));
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<Object> login(@RequestBody  UserBean userBean) {
        return ResponseEntity.ok(userService.login(userBean.getName(), userBean.getPassword()));
    }

    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    public ResponseEntity<Object> logout(@RequestBody String uuid) {
        return ResponseEntity.ok(userService.logout(uuid));
    }

}
