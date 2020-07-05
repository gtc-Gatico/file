package com.gatico.file.interceptor;

import com.gatico.file.entity.UserEntity;
import com.gatico.file.vo.BaseVo;
import com.google.gson.Gson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.LinkedHashMap;
import java.util.Map;

@Component("userInterceptor")
public class UserInterceptor implements HandlerInterceptor {

    private ThreadLocal<UserEntity> localUser = new ThreadLocal<>();

    private ThreadLocal<HttpServletRequest> localRequest = new ThreadLocal<>();

    Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private RedisTemplate redisTemplate;

    @Autowired
    private Gson gson;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        localRequest.set(request);
        //解决跨域问题
        response.setContentType("application/json;charset=utf-8");
        Cookie[] cookies = request.getCookies();
        Map<String, Cookie> cookieMap = new LinkedHashMap();
        if (cookies != null) {
            for (int i = 0; i < cookies.length; i++) {
                log.info(cookies[i].getName() + "\t" + cookies[i].getValue());
                cookieMap.put(cookies[i].getName(), cookies[i]);
            }
            UserEntity userEntity = (UserEntity) redisTemplate.opsForValue().get(cookieMap.get("uuid").getValue());
            if (userEntity != null && userEntity.getRole().equals(cookieMap.get("role").getValue())) {
                localUser.set(userEntity);
                return true;
            }else{
                BaseVo errorVo = BaseVo.getErrorVo(401, "请先登录");
                response.getWriter().write(gson.toJson(errorVo));
            }
        }else{
            BaseVo errorVo = BaseVo.getErrorVo(401, "请先登录");
            response.getWriter().write(gson.toJson(errorVo));
        }
        return false;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }

    public UserEntity getCurrentUser() {
        return localUser.get();
    }

    public HttpServletRequest getCurrentRequest() {
        return localRequest.get();
    }

}
