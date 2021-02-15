package com.bangkoklab.chatServer.data;

import java.io.Serializable;

public class chatRoomInfo implements Serializable{
	private String roomName;
	private String roomId;
	private String myUuid;
	private String youUuid;
	private String jobUuid;
	
	public String getRoomName() {
		return roomName;
	}
	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}
	public String getRoomId() {
		return roomId;
	}
	public void setRoomId(String roomId) {
		this.roomId = roomId;
	}
	public String getMyUuid() {
		return myUuid;
	}
	public void setMyUuid(String myUuid) {
		this.myUuid = myUuid;
	}
	public String getYouUuid() {
		return youUuid;
	}
	public void setYouUuid(String youUuid) {
		this.youUuid = youUuid;
	}
	public String getJobUuid() {
		return jobUuid;
	}
	public void setJobUuid(String jobUuid) {
		this.jobUuid = jobUuid;
	}
	
	
	
}
