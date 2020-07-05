package com.gatico.file.vo;

import com.alibaba.fastjson.JSONObject;
import org.springframework.data.domain.Sort;

public class PageVo extends BaseVo{
    private Long total = 0L;
    private String sortField = "id";
    private Sort.Direction sortValue = Sort.Direction.ASC;
    private Object data = new Object();

    public PageVo() {
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public String getSortField() {
        return sortField;
    }

    public void setSortField(String sortField) {
        this.sortField = sortField;
    }

    public Sort.Direction getSortValue() {
        return sortValue;
    }

    public void setSortValue(Sort.Direction sortValue) {
        this.sortValue = sortValue;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return JSONObject.toJSONString(this);
    }

}
