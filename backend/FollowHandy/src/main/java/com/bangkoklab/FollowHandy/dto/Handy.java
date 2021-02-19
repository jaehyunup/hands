package com.bangkoklab.FollowHandy.dto;

import java.io.Serializable;

public class Handy implements Serializable {
	private String myId;
	private String followId;
	public String getMyId() {
		return myId;
	}
	public void setMyId(String myId) {
		this.myId = myId;
	}
	public String getFollowId() {
		return followId;
	}
	public void setFollowId(String followId) {
		this.followId = followId;
	}

		
}
