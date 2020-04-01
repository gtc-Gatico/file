package com.gatico.file.controller;

import com.gatico.file.service.FileService;
import com.gatico.file.service.UserService;
import com.gatico.file.vo.BaseVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private FileService fileService;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<Object> register(String name, String password) {
        return ResponseEntity.ok(userService.register(name, password));
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<Object> login(String name, String password) {
        return ResponseEntity.ok(userService.login(name, password));
    }

    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    public ResponseEntity<Object> logout(String uuid) {
        return ResponseEntity.ok(userService.logout(uuid));
    }

    @RequestMapping(value = "/userFiles/{uuid}", method = RequestMethod.GET)
    public ResponseEntity<Object> getUserFiles(@PathVariable String uuid, String type) {
        Boolean checkUser = userService.checkUser(uuid);
        if (!checkUser) {
            return ResponseEntity.ok(BaseVo.getErrorVo(500, "请先登录"));
        }
        return ResponseEntity.ok(fileService.getUserFile(uuid, type));
    }

}
