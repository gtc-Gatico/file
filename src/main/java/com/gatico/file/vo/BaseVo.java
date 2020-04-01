package com.gatico.file.vo;

import com.alibaba.fastjson.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class BaseVo {
    public static final Integer SUCCESS_CODE = 0;
    private Integer code;
    private String msg;
    private Map data = new HashMap();

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

    public Map getData() {
        return data;
    }

    public void setData(String key, Object value) {
        data.put(key, value);
    }

    @Override
    public String toString() {
        return JSONObject.toJSONString(this);
    }
}
