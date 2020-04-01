package com.gatico.file.dao;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gatico.file.entity.OAuthTokenEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.stereotype.Component;

@Component
public class OAuthTokenDaoImpl {

    @Autowired
    private RedisConnectionFactory connectionFactory;

    @Autowired
    private RedisTemplate<String, OAuthTokenEntity> oauthTokenRedisTemplate;

    @Bean
    public RedisTemplate<String, OAuthTokenEntity> oauthTokenRedisTemplate() {
        Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(OAuthTokenEntity.class);
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(om);

        RedisTemplate<String, OAuthTokenEntity> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(connectionFactory);
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(jackson2JsonRedisSerializer);
        redisTemplate.setHashValueSerializer(jackson2JsonRedisSerializer);
        redisTemplate.afterPropertiesSet();

        return redisTemplate;
    }

    public OAuthTokenEntity findByKey(String key) {
        return oauthTokenRedisTemplate.opsForValue().get(key);
    }

    public void set(String key, OAuthTokenEntity oauthTokenEntity) {
        oauthTokenEntity.formateExpiresTime();
        oauthTokenRedisTemplate.opsForValue().set(key, oauthTokenEntity);
    }

}
