package com.bangkoklab.chatServer.data;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

public class ChatMessage implements Serializable{
    // �޽��� Ÿ�� : ����, ä��
    public enum MessageType {
        ENTER, TALK
    }
    private MessageType type; // �޽��� Ÿ��
    private String roomId; // ���ȣ
    private String sender; // �޽��� �������
    private String message; // �޽���
	
    public MessageType getType() {
		return type;
	}
	public void setType(MessageType type) {
		this.type = type;
	}
	public String getRoomId() {
		return roomId;
	}
	public void setRoomId(String roomId) {
		this.roomId = roomId;
	}
	public String getSender() {
		return sender;
	}
	public void setSender(String sender) {
		this.sender = sender;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
    
    
}