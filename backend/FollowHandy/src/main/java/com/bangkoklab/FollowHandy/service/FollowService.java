package com.bangkoklab.FollowHandy.service;

import java.util.List;

import com.bangkoklab.FollowHandy.dto.Handy;
import com.bangkoklab.FollowHandy.dto.Profile;

public interface FollowService {
	public void FollowHandy(Handy handy) throws Exception;
	List<Handy> FindFollowHandy(Handy handy) throws Exception;
	void deleteFollowById(Handy handy) throws Exception;
	boolean FindFollowById(Handy handy) throws Exception;
	Profile findProfile(String followId) throws Exception;
}
