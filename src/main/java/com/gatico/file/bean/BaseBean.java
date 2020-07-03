package com.gatico.file.bean;

import org.springframework.data.domain.Sort;

public class BaseBean {
    private String sortField = "id";
    private Sort.Direction sortValue = Sort.Direction.ASC;
    private Integer pageIndex = 1;
    private Integer pageSize = 10;

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

    public Integer getPageIndex() {
        return pageIndex;
    }

    public void setPageIndex(Integer pageIndex) {
        this.pageIndex = pageIndex;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }
}
