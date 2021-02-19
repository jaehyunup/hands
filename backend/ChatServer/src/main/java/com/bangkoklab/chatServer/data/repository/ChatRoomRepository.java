package com.bangkoklab.chatServer.data.repository;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Repository;

import com.bangkoklab.chatServer.Pubsub.RedisSubscriber;
import com.bangkoklab.chatServer.data.ChatMessage;
import com.bangkoklab.chatServer.data.ChatRoom;
import com.bangkoklab.chatServer.data.chatData;
import com.bangkoklab.chatServer.data.chatRoomInfo;

import javax.annotation.PostConstruct;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Repository
public class ChatRoomRepository {
	// 채팅방(topic)에 발행되는 메시지를 처리할 Listner
	@Autowired
	RedisMessageListenerContainer redisMessageListener;
	// 구독 처리 서비스
	@Autowired
	RedisSubscriber redisSubscriber;
	// Redis
	private static final String CHAT_ROOMS = "CHAT_ROOM";
	private static final String CHAT_CONTENT = "CHAT_CONTENT";
	private static final String CHAT_ROOMS_ID = "CHAT_ROOMS_ID";
	
	@Autowired
	RedisTemplate<String, Object> redisTemplate;
	private HashOperations<String, String, ChatRoom> opsHashChatRoom;
	
	
	private HashOperations<String, String, List<ChatMessage>> opsHashChatMessage;
	private HashOperations<String, String, List<chatRoomInfo>> opsHashChatById;
	
	// 채팅방의 대화 메시지를 발행하기 위한 redis topic 정보. 서버별로 채팅방에 매치되는 topic정보를 Map에 넣어 roomId로
	// 찾을수 있도록 한다.
	private Map<String, ChannelTopic> topics;

	@PostConstruct
	private void init() {
		opsHashChatRoom = redisTemplate.opsForHash();
		opsHashChatMessage = redisTemplate.opsForHash();
		opsHashChatById =  redisTemplate.opsForHash();
		topics = new HashMap<>();
	}

	public List<ChatRoom> findAllRoom() {
		return opsHashChatRoom.values(CHAT_ROOMS);
	}

	public ChatRoom findRoomById(String id) {
		return opsHashChatRoom.get(CHAT_ROOMS, id);
	}

	public void deleteRoom(chatRoomInfo chatInfo) {
		opsHashChatRoom.delete(CHAT_ROOMS, chatInfo.getRoomId());
		
		List<chatRoomInfo> youroom = new ArrayList<chatRoomInfo>();
		youroom = opsHashChatById.get(CHAT_ROOMS_ID, chatInfo.getYouUuid());
		for(int i =0; i<youroom.size();i++) {
			if(youroom.get(i).getRoomId().equals(chatInfo.getRoomId())) {
				youroom.remove(i);
				break;
			}
		}
		opsHashChatById.put(CHAT_ROOMS_ID, chatInfo.getYouUuid(),youroom);
		
		List<chatRoomInfo> myroom = new ArrayList<chatRoomInfo>();
		myroom = opsHashChatById.get(CHAT_ROOMS_ID, chatInfo.getMyUuid());
		for(int i =0; i<myroom.size();i++) {
			if(myroom.get(i).getRoomId().equals(chatInfo.getRoomId())) {
				myroom.remove(i);
				break;
			}
		}
		opsHashChatById.put(CHAT_ROOMS_ID, chatInfo.getMyUuid(),myroom);
	}

	/**
	 * 채팅방 생성 : 서버간 채팅방 공유를 위해 redis hash에 저장한다.
	 */
	
	public ChatRoom createChatRoom(chatData chatdata) {
		ChatRoom chatRoom = ChatRoom.create(chatdata.getRoomName());
		opsHashChatRoom.put(CHAT_ROOMS, chatRoom.getRoomId(), chatRoom);
		List<ChatMessage> chatMessage = new ArrayList<ChatMessage>();
		opsHashChatMessage.put(CHAT_CONTENT, chatRoom.getRoomId(), chatMessage);
		
		System.out.println(chatdata.getMyUuid());
		if(opsHashChatById.get(CHAT_ROOMS_ID, chatdata.getMyUuid()) == null) {
			List<chatRoomInfo> myroom = new ArrayList<chatRoomInfo>();
			chatRoomInfo info = new chatRoomInfo();
			info.setJobUuid(chatdata.getJobUuid());
			info.setMyUuid(chatdata.getMyUuid());
			info.setYouUuid(chatdata.getYouUuid());
			info.setRoomId(chatRoom.getRoomId());
			info.setRoomName(chatRoom.getRoomName());
			myroom.add(info);
			opsHashChatById.put(CHAT_ROOMS_ID, chatdata.getMyUuid(), myroom);
		}else {
			List<chatRoomInfo> myroom = new ArrayList<chatRoomInfo>();
			myroom = opsHashChatById.get(CHAT_ROOMS_ID, chatdata.getMyUuid());
			chatRoomInfo info = new chatRoomInfo();
			info.setJobUuid(chatdata.getJobUuid());
			info.setMyUuid(chatdata.getMyUuid());
			info.setYouUuid(chatdata.getYouUuid());
			info.setRoomId(chatRoom.getRoomId());
			info.setRoomName(chatRoom.getRoomName());
			System.out.println(info.getJobUuid()+"   456");
			myroom.add(info);
			opsHashChatById.put(CHAT_ROOMS_ID, chatdata.getMyUuid(), myroom);
		}
		
		if(opsHashChatById.get(CHAT_ROOMS_ID, chatdata.getMyUuid()) == null) {
			List<chatRoomInfo> youroom = new ArrayList<chatRoomInfo>();
			chatRoomInfo info = new chatRoomInfo();	
			info.setJobUuid(chatdata.getJobUuid());
			info.setMyUuid(chatdata.getYouUuid());
			info.setYouUuid(chatdata.getMyUuid());
			info.setRoomId(chatRoom.getRoomId());
			info.setRoomName(chatRoom.getRoomName());
			youroom.add(info);
			opsHashChatById.put(CHAT_ROOMS_ID, chatdata.getYouUuid(), youroom);
		}else {
			List<chatRoomInfo> youroom = new ArrayList<chatRoomInfo>();
			youroom = opsHashChatById.get(CHAT_ROOMS_ID, chatdata.getMyUuid());
			chatRoomInfo info = new chatRoomInfo();
			
			info.setJobUuid(chatdata.getJobUuid());
			info.setMyUuid(chatdata.getYouUuid());
			info.setYouUuid(chatdata.getMyUuid());
			info.setRoomId(chatRoom.getRoomId());
			info.setRoomName(chatRoom.getRoomName());
			youroom.add(info);
			opsHashChatById.put(CHAT_ROOMS_ID, chatdata.getYouUuid(), youroom);
		}
		
		List<chatRoomInfo> myroom = new ArrayList<chatRoomInfo>();
		myroom = opsHashChatById.get(CHAT_ROOMS_ID, chatdata.getMyUuid());
		System.out.println(myroom.get(0).getMyUuid());
		return chatRoom;
		

		
	}

	/**
	 * 채팅방 입장 : redis에 topic을 만들고 pub/sub 통신을 하기 위해 리스너를 설정한다.
	 */
	public void enterChatRoom(String roomId) {
		ChannelTopic topic = topics.get(roomId);
		if (topic == null)
			topic = new ChannelTopic(roomId);
		redisMessageListener.addMessageListener(redisSubscriber, topic);
		topics.put(roomId, topic);
	}
	
	public List<ChatMessage> roomMessage(String roomId){
		return opsHashChatMessage.get(CHAT_CONTENT, roomId);
	}

	public ChannelTopic getTopic(String roomId) {
		return topics.get(roomId);
	}
	
	
	public List<chatRoomInfo> myRoom(String myUuid){
		System.out.println(myUuid+" dddd");
		List<chatRoomInfo> youroom = new ArrayList<chatRoomInfo>();
		youroom = opsHashChatById.get(CHAT_ROOMS_ID, myUuid);
		System.out.println(youroom.size()+" 213");
		return opsHashChatById.get(CHAT_ROOMS_ID, myUuid);
	}
}