package com.gatico.file.controller;

import com.gatico.file.service.FileService;
import com.gatico.file.service.UserService;
import com.gatico.file.vo.BaseVo;
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
    private UserService userService;

    @Autowired
    private FileService fileService;

    @RequestMapping(value = "/download/{fileId}", method = RequestMethod.GET)
    public ResponseEntity<Object> download(@PathVariable long fileId, String uuid) {
        Boolean checkUser = userService.checkUser(uuid);
        if (!checkUser) {
            return ResponseEntity.ok(BaseVo.getErrorVo(500, "请先登录"));
        }
        HttpHeaders headers = new HttpHeaders();
        DownLoadFileVo downLoadFileVo = fileService.downLoadFile(fileId, uuid);
        try {
            headers.setContentDispositionFormData("attachment", new String(downLoadFileVo.getFileName().getBytes("UTF-8"), "ISO8859-1"));
        } catch (Exception e) {
            e.printStackTrace();
        }
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        return new ResponseEntity<>(downLoadFileVo.getContext(), headers, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public ResponseEntity<Object> upload(String uuid, @RequestParam("file") MultipartFile mfile) {
        Boolean checkUser = userService.checkUser(uuid);
        if (!checkUser) {
            return ResponseEntity.ok(BaseVo.getErrorVo(500, "请先登录"));
        }
        byte arr[] = null;
        if (mfile != null) {
            try {
                arr = mfile.getBytes();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return ResponseEntity.ok(fileService.saveFile(uuid, arr, mfile.getOriginalFilename()));
    }

    /**
     * 多文件上传 主要是使用了MultipartHttpServletRequest和MultipartFile
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/upload/batch", method = RequestMethod.POST)
    public ResponseEntity<Object> batchUpload(String uuid, HttpServletRequest request) {
        Boolean checkUser = userService.checkUser(uuid);
        if (!checkUser) {
            return ResponseEntity.ok(BaseVo.getErrorVo(500, "请先登录"));
        }
        List<MultipartFile> files = ((MultipartHttpServletRequest) request).getFiles("file");
        return ResponseEntity.ok(fileService.saveFiles(uuid, files));
    }

}
