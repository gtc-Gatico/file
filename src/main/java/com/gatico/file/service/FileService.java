package com.gatico.file.service;

import com.gatico.file.dao.FileDao;
import com.gatico.file.dao.FileOperationDao;
import com.gatico.file.entity.FileEntity;
import com.gatico.file.entity.FileOperationEntity;
import com.gatico.file.entity.UserEntity;
import com.gatico.file.enums.FileOperationType;
import com.gatico.file.vo.BaseVo;
import com.gatico.file.vo.DownLoadFileVo;
import com.gatico.file.vo.FileVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.sql.Timestamp;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
public class FileService {

    @Value("${file.path}")
    private String localPath;

    @Autowired
    private FileDao fileDao;

    @Autowired
    private FileOperationDao fileOperationDao;

    @Autowired
    private UserService userService;

    public BaseVo getUserFile(String uuid, String type) {
        UserEntity userEntity = userService.getUserByUuid(uuid);
        BaseVo successVo = BaseVo.getSuccessVo();
        List<FileEntity> fileEntityList = fileDao.findAllByUserIdAndType(userEntity.getId(), type);
        List<FileVo> fileVos = new LinkedList<>();
        fileEntityList.forEach(fileEntity -> {
            fileVos.add(new FileVo(
                    fileEntity.getId(),
                    fileEntity.getName(),
                    fileEntity.getLength(),
                    fileEntity.getPath(),
                    fileEntity.getTime(),
                    fileEntity.getType()
            ));
        });
        successVo.setData("files", fileVos);
        return successVo;
    }

    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public DownLoadFileVo downLoadFile(Long fileId, String uuid) {
        DownLoadFileVo downLoadFileVo = new DownLoadFileVo();
        Optional<FileEntity> fileList = fileDao.findById(fileId);
        FileEntity fileEntity = fileList.get();
        downLoadFileVo.setFileName(fileEntity.getName());
        downLoadFileVo.setContext(getFile(fileEntity.getPath()));
        FileOperationEntity fileOperationEntity = new FileOperationEntity();
        fileOperationEntity.setFileId(fileList.get().getId());
        fileOperationEntity.setUserId(userService.getUserByUuid(uuid).getId());
        fileOperationEntity.setTime(new Timestamp(System.currentTimeMillis()));
        fileOperationEntity.setType(FileOperationType.DOWNLOAD.getCode());
        fileOperationDao.saveAndFlush(fileOperationEntity);
        return downLoadFileVo;
    }

    public FileEntity getFileById(Long fileId) {
        Optional<FileEntity> fileList = fileDao.findById(fileId);
        return fileList.get();
    }

    public byte[] getFile(String path) {
        try {
            File file = new File(path);
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            FileInputStream fileInputStream = new FileInputStream(file);
            int temp = -1;
            while ((temp = fileInputStream.read()) != -1) {
                byteArrayOutputStream.write(temp);
            }
            fileInputStream.close();
            byteArrayOutputStream.close();
            return byteArrayOutputStream.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public BaseVo saveFile(String uuid, byte arr[], String fileName) {
        UserEntity userEntity = userService.getUserByUuid(uuid);
        String folder = localPath + "/" + userEntity.getUid() + "/";
        String path = folder + fileName;
        File foldFile = new File(folder);
        if (!foldFile.exists()) {
            foldFile.mkdirs();
        }
        FileEntity fileEntity = new FileEntity();
        fileEntity.setName(fileName);
        fileEntity.setLength(Double.valueOf(arr.length));
        fileEntity.setUserId(userEntity.getId());
        String type = path.substring(path.lastIndexOf(".") + 1);
        if (type.toLowerCase().contains("jpg")
                || type.toLowerCase().contains("jpeg")
                || type.toLowerCase().contains("png")
                || type.toLowerCase().contains("gif")
                || type.toLowerCase().contains("bmp")
                || type.toLowerCase().contains("tiff")
                || type.toLowerCase().contains("webp")
        ) {
            type = "image";
        } else if (
                type.toLowerCase().contains("mp4")
                        || type.toLowerCase().contains("avi")
                        || type.toLowerCase().contains("mov")
                        || type.toLowerCase().contains("asf")
                        || type.toLowerCase().contains("wmv")
        ) {
            type = "video";
        } else if (
                type.toLowerCase().contains("mp3")
                        || type.toLowerCase().contains("cda")
                        || type.toLowerCase().contains("wav")
                        || type.toLowerCase().contains("wma")
        ) {
            type = "sound";
        } else {
            type = "file";
        }
        fileEntity.setType(type);
        fileEntity.setPath(path);
        fileEntity.setTime(new Timestamp(System.currentTimeMillis()));
        fileDao.saveAndFlush(fileEntity);
        try {
            FileOutputStream fileOutputStream = new FileOutputStream(path);
            fileOutputStream.write(arr);
            fileOutputStream.flush();
            fileOutputStream.close();
            return BaseVo.getSuccessVo();
        } catch (Exception ex) {
            ex.printStackTrace();
            return BaseVo.getErrorVo(ex.getMessage());
        }
    }

    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public BaseVo saveFiles(String uuid, List<MultipartFile> files) {
        MultipartFile file = null;
        for (int i = 0; i < files.size(); ++i) {
            file = files.get(i);
            if (!file.isEmpty()) {
                try {
                    byte arr[] = file.getBytes();
                    saveFile(uuid, arr, file.getOriginalFilename());
                } catch (IOException e) {
                    return BaseVo.getErrorVo(e.getMessage());
                }
            }
        }
        return BaseVo.getSuccessVo();
    }
}
