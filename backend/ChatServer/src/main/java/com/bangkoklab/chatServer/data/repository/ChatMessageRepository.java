package com.bangkoklab.chatServer.data.repository;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import com.bangkoklab.chatServer.data.ChatMessage;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class ChatMessageRepository {
	private static final String CHAT_CONTENT = "CHAT_CONTENT";
	
	@Autowired
	RedisTemplate<String, Object> redisTemplate;
	private HashOperations<String, String, List<ChatMessage>> opsHashChatMessage;
	
	@PostConstruct
	private void init() {
		opsHashChatMessage = redisTemplate.opsForHash();
	}
	
	
	public void StoreMessage(ChatMessage roomMessage) {
		System.out.println("-----------------------");
        System.out.println(roomMessage.getType());
        System.out.println(roomMessage.getRoomId());
        System.out.println(roomMessage.getSender()+" 123");
        System.out.println(roomMessage.getMessage());
        System.out.println("-----------------------");
        System.out.println("ADD");
        List<ChatMessage> chatMessage = new ArrayList<ChatMessage>();
        chatMessage = opsHashChatMessage.get(CHAT_CONTENT, roomMessage.getRoomId());
        for(ChatMessage CH : chatMessage) {
        	System.out.println("-----------------------");
            System.out.println(CH.getType());
            System.out.println(CH.getRoomId());
            System.out.println(CH.getSender()+" 123");
            System.out.println(CH.getMessage());
            System.out.println("-----------------------");
        }
        chatMessage.add(roomMessage);
        opsHashChatMessage.put(CHAT_CONTENT, roomMessage.getRoomId(), chatMessage);
	}
	
	public void creatChat(String roomId) {
		
	}
}
