package com.bangkoklab.chatServer.data;

import java.io.Serializable;
import java.util.UUID;

public class ChatRoom implements Serializable {
	
    private String roomId;
    private String roomName;

    public String getRoomId() {
		return roomId;
	}

	public void setRoomId(String roomId) {
		this.roomId = roomId;
	}

	public String getRoomName() {
		return roomName;
	}

	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}

	public static ChatRoom create(String roomName) {
		ChatRoom chatRoom = new ChatRoom();
		chatRoom.setRoomId(UUID.randomUUID().toString());
		chatRoom.setRoomName(roomName);
		return chatRoom;
	}
}