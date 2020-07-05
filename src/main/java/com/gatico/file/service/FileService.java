package com.gatico.file.service;

import com.gatico.file.bean.FileBean;
import com.gatico.file.dao.FileDao;
import com.gatico.file.dao.FileOperationDao;
import com.gatico.file.entity.FileEntity;
import com.gatico.file.entity.FileOperationEntity;
import com.gatico.file.entity.UserEntity;
import com.gatico.file.enums.FileOperationType;
import com.gatico.file.interceptor.UserInterceptor;
import com.gatico.file.vo.BaseVo;
import com.gatico.file.vo.DownLoadFileVo;
import com.gatico.file.vo.FileVo;
import com.gatico.file.vo.PageVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.io.*;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
public class FileService {

    @Autowired
    private RedisTemplate redisTemplate;

    @Value("${file.path}")
    private String localPath;

    @Autowired
    private FileDao fileDao;

    @Autowired
    private FileOperationDao fileOperationDao;

    @Autowired
    private UserService userService;

    @Autowired
    private UserInterceptor userInterceptor;

    public PageVo getUserFile(FileBean fileBean) {
        UserEntity userEntity = userInterceptor.getCurrentUser();
        PageVo successVo = new PageVo();
        Specification<FileEntity> spec = new Specification<FileEntity>() {
            @Override
            public Predicate toPredicate(Root<FileEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                List<Predicate> predicates = new ArrayList<>(); //所有的断言
                //添加断言
                Predicate userId = criteriaBuilder.equal(root.get("userId").as(Long.class), userEntity.getId());
                predicates.add(userId);

                if (fileBean.getType() != null && !fileBean.getType().equals("")) { //添加断言
                    Predicate type = criteriaBuilder.equal(root.get("type").as(String.class), fileBean.getType());
                    predicates.add(type);
                }

                if (fileBean.getName() != null && !fileBean.getName().equals("")) { //添加断言
                    Predicate name = criteriaBuilder.like(root.get("name").as(String.class), "%" + fileBean.getName() + "%");
                    predicates.add(name);
                }

                if (fileBean.getTime() != null) { //添加断言
                    Predicate time = criteriaBuilder.greaterThanOrEqualTo(root.get("time").as(Timestamp.class), fileBean.getTime());
                    predicates.add(time);
                }

                return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
            }
        };
        Sort sort = new Sort(fileBean.getSortValue(), fileBean.getSortField());
        Pageable pageable = PageRequest.of(fileBean.getPageIndex() - 1, fileBean.getPageSize(), sort);
        Page<FileEntity> fileEntityList = fileDao.findAll(spec, pageable);
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

        successVo.setData(fileVos);
        successVo.setTotal(fileDao.count(spec));
        return successVo;
    }

    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public DownLoadFileVo downLoadFile(Long fileId) {
        UserEntity userEntity = userInterceptor.getCurrentUser();
        DownLoadFileVo downLoadFileVo = new DownLoadFileVo();
        Optional<FileEntity> fileList = fileDao.findById(fileId);
        FileEntity fileEntity = fileList.get();
        downLoadFileVo.setFileName(fileEntity.getName());
        downLoadFileVo.setContext(getFile(fileEntity.getPath()));
        FileOperationEntity fileOperationEntity = new FileOperationEntity();
        fileOperationEntity.setFileId(fileList.get().getId());
        fileOperationEntity.setUserId(userEntity.getId());
        fileOperationEntity.setTime(new Timestamp(System.currentTimeMillis()));
        fileOperationEntity.setType(FileOperationType.DOWNLOAD.getCode());
        fileOperationDao.saveAndFlush(fileOperationEntity);
        return downLoadFileVo;
    }

    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public DownLoadFileVo downLoadFiles(Long[] fileIds) {
        UserEntity userEntity = userInterceptor.getCurrentUser();
        DownLoadFileVo downLoadFileVo = new DownLoadFileVo();
        ZipOutputStream zipOutputStream = null;
        try {
            String folder = localPath + "/" + userEntity.getUid() + "/";
            String fileName = new SimpleDateFormat("yyyy-MM-dd_hh_mm:ss").format(new Date()) + ".zip";
            String path = folder + fileName;
            File tmpZip = new File(path);
            zipOutputStream = new ZipOutputStream(new FileOutputStream(tmpZip));
            for (int i = 0; i < fileIds.length; i++) {
                Optional<FileEntity> fileList = fileDao.findById(fileIds[i]);
                FileEntity fileEntity = fileList.get();
                zipOutputStream.putNextEntry(new ZipEntry(fileEntity.getName()));
                zipOutputStream.write(getFile(fileEntity.getPath()));
                FileOperationEntity fileOperationEntity = new FileOperationEntity();
                fileOperationEntity.setFileId(fileList.get().getId());
                fileOperationEntity.setUserId(userEntity.getId());
                fileOperationEntity.setTime(new Timestamp(System.currentTimeMillis()));
                fileOperationEntity.setType(FileOperationType.DOWNLOAD.getCode());
                fileOperationDao.saveAndFlush(fileOperationEntity);
            }
            zipOutputStream.finish();
            zipOutputStream.close();
            downLoadFileVo.setFileName(fileName);
            downLoadFileVo.setContext(getFile(path));
            tmpZip.delete();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            downLoadFileVo = (DownLoadFileVo) BaseVo.getErrorVo(e.getMessage());
        } catch (IOException e) {
            e.printStackTrace();
            downLoadFileVo = (DownLoadFileVo) BaseVo.getErrorVo(e.getMessage());
        }

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
    public BaseVo saveFile(byte arr[], String fileName) {
        UserEntity userEntity = userInterceptor.getCurrentUser();
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
        /*}else if (
                type.toLowerCase().contains("zip")
                        || type.toLowerCase().contains("tar.gz")
                        || type.toLowerCase().contains("7z")
                        || type.toLowerCase().contains("tar")
                        || type.toLowerCase().contains("win")
                        || type.toLowerCase().contains("gzip")
        ) {
            type = "zip";*/
        } else {
            type = "file";
        }
        fileEntity.setType(type);
        fileEntity.setPath(path);
        fileEntity.setRemoved(false);
        fileEntity.setTime(new Timestamp(System.currentTimeMillis()));
        fileDao.saveAndFlush(fileEntity);
        FileOperationEntity fileOperationEntity = new FileOperationEntity();
        fileOperationEntity.setFileId(fileEntity.getId());
        fileOperationEntity.setUserId(userEntity.getId());
        fileOperationEntity.setTime(new Timestamp(System.currentTimeMillis()));
        fileOperationEntity.setType(FileOperationType.UPLOAD.getCode());
        fileOperationDao.saveAndFlush(fileOperationEntity);
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
    public BaseVo saveFiles(List<MultipartFile> files) {
        MultipartFile file = null;
        for (int i = 0; i < files.size(); ++i) {
            file = files.get(i);
            if (!file.isEmpty()) {
                try {
                    byte arr[] = file.getBytes();
                    saveFile(arr, file.getOriginalFilename());
                } catch (IOException e) {
                    return BaseVo.getErrorVo(e.getMessage());
                }
            }
        }
        return BaseVo.getSuccessVo();
    }

    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public BaseVo remove(Long[] ids, String uuid) {
        Boolean checkUser = userService.checkUser(uuid);
        if (!checkUser) {
            return BaseVo.getErrorVo(500, "请先登录");
        }
        UserEntity userEntity = (UserEntity) redisTemplate.opsForValue().get(uuid);
        for (int i = 0; i < ids.length; i++) {
            Optional<FileEntity> fileList = fileDao.findById(ids[i]);
            FileEntity fileEntity = fileList.get();
            fileEntity.setRemoved(true);
            fileDao.saveAndFlush(fileEntity);
            FileOperationEntity fileOperationEntity = new FileOperationEntity();
            fileOperationEntity.setFileId(fileEntity.getId());
            fileOperationEntity.setUserId(userEntity.getId());
            fileOperationEntity.setTime(new Timestamp(System.currentTimeMillis()));
            fileOperationEntity.setType(FileOperationType.REMOVE.getCode());
            fileOperationDao.saveAndFlush(fileOperationEntity);
        }
        return BaseVo.getSuccessVo();
    }
}
