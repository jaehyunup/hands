package com.bangkoklab.chatServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import com.bangkoklab.chatServer.Pubsub.RedisPublisher;
import com.bangkoklab.chatServer.data.ChatMessage;
import com.bangkoklab.chatServer.data.repository.ChatRoomRepository;

@RequiredArgsConstructor
@Controller
public class ChatController {
	
	@Autowired
	RedisPublisher redisPublisher;
	@Autowired
	ChatRoomRepository chatRoomRepository;

	@MessageMapping("/chat/message")
    public void message(ChatMessage message) {
        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
            chatRoomRepository.enterChatRoom(message.getRoomId());
            message.setMessage(message.getSender() + "님이 입장하셨습니다.");
        }
        // Websocket에 발행된 메시지를 redis로 발행한다(publish)
        redisPublisher.publish(chatRoomRepository.getTopic(message.getRoomId()), message);
    }
}
