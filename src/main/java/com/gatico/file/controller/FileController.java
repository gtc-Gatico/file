package com.gatico.file.controller;

import com.gatico.file.bean.FileBean;
import com.gatico.file.service.FileService;
import com.gatico.file.vo.DownLoadFileVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/file")
public class FileController extends BaseController {

    @Autowired
    private FileService fileService;

    @RequestMapping(value = "/files", method = RequestMethod.GET)
    public ResponseEntity<Object> getUserFiles(FileBean fileBean, Integer pageIndex, Integer pageSize) {
        return ResponseEntity.ok(fileService.getUserFile(fileBean, pageIndex, pageSize));
    }

    @RequestMapping(value = "/download/{fileId}", method = RequestMethod.GET)
    public ResponseEntity<Object> download(@PathVariable long fileId) {
        HttpHeaders headers = new HttpHeaders();
        DownLoadFileVo downLoadFileVo = fileService.downLoadFile(fileId);
        try {
            headers.setContentDispositionFormData("attachment", new String(downLoadFileVo.getFileName().getBytes("UTF-8"), "ISO8859-1"));
        } catch (Exception e) {
            e.printStackTrace();
        }
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        return new ResponseEntity<>(downLoadFileVo.getContext(), headers, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/download/batch", method = RequestMethod.GET)
    public ResponseEntity<Object> downloadList(Long[] ids) {
        HttpHeaders headers = new HttpHeaders();
        DownLoadFileVo downLoadFileVo = fileService.downLoadFiles(ids);
        try {
            headers.setContentDispositionFormData("attachment", new String(downLoadFileVo.getFileName().getBytes("UTF-8"), "ISO8859-1"));
        } catch (Exception e) {
            e.printStackTrace();
        }
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        return new ResponseEntity<>(downLoadFileVo.getContext(), headers, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public ResponseEntity<Object> upload(@RequestParam("file") MultipartFile mfile) {
        byte arr[] = null;
        if (mfile != null) {
            try {
                arr = mfile.getBytes();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return ResponseEntity.ok(fileService.saveFile(arr, mfile.getOriginalFilename()));
    }

    @RequestMapping(value = "/remove/batch", method = RequestMethod.DELETE)
    public ResponseEntity<Object> remove(Long[] ids, String uuid) {
        return ResponseEntity.ok(fileService.remove(ids, uuid));
    }

    /**
     * 多文件上传 主要是使用了MultipartHttpServletRequest和MultipartFile
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/upload/batch", method = RequestMethod.POST)
    public ResponseEntity<Object> batchUpload(HttpServletRequest request) {
        List<MultipartFile> files = ((MultipartHttpServletRequest) request).getFiles("file");
        return ResponseEntity.ok(fileService.saveFiles(files));
    }

}
