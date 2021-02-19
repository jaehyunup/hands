package com.bangkoklab.chatServer.Pubsub;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;
import com.bangkoklab.chatServer.data.ChatMessage;

@RequiredArgsConstructor
@Service
public class RedisPublisher {
	
	@Autowired
	RedisTemplate<String, Object> redisTemplate;

    public void publish(ChannelTopic topic, ChatMessage message) {
        redisTemplate.convertAndSend(topic.getTopic(), message);
    }
}
