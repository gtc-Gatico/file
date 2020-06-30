package com.gatico.file.vo;

public class DownLoadFileVo extends BaseVo{
    private  String fileName;
    private byte[]context;

    public DownLoadFileVo() {
    }

    public DownLoadFileVo(String fileName, byte[] context) {
        this.fileName = fileName;
        this.context = context;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public byte[] getContext() {
        return context;
    }

    public void setContext(byte[] context) {
        this.context = context;
    }
}
