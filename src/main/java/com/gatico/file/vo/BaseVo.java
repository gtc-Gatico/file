package com.gatico.file.vo;

import com.alibaba.fastjson.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class BaseVo {
    public static final Integer SUCCESS_CODE = 0;
    private Integer code = 0;
    private String msg ="";
    private Object data = new Object();
    private Integer total=0;
    protected BaseVo() {

    }

    protected BaseVo(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    protected BaseVo(Integer code) {
        this.code = code;
    }

    protected BaseVo(String msg) {
        this.msg = msg;
    }


    public static BaseVo getSuccessVo() {
        return new BaseVo(0);
    }

    public static BaseVo getSuccessVo(String msg) {
        return new BaseVo(0, msg);
    }

    public static BaseVo getVo() {
        return new BaseVo();
    }

    public static BaseVo getErrorVo() {
        BaseVo baseVo = new BaseVo();
        baseVo.setCode(500);
        return baseVo;
    }

    public static BaseVo getErrorVo(String msg) {
        BaseVo baseVo = getErrorVo();
        baseVo.setMsg(msg);
        return baseVo;
    }

    public static BaseVo getErrorVo(Integer code, String msg) {
        BaseVo baseVo = getErrorVo();
        baseVo.setMsg(msg);
        return baseVo;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    @Override
    public String toString() {
        return JSONObject.toJSONString(this);
    }


}
