package com.bangkoklab.FollowHandy.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.bangkoklab.FollowHandy.dto.Handy;
import com.bangkoklab.FollowHandy.dto.Profile;
import com.bangkoklab.FollowHandy.mapper.FindProfileMapper;
import com.bangkoklab.FollowHandy.service.FollowService;

@Service
public class FollowServiceImpl implements FollowService {
	
	private static final String FOLLOW_HANDY = "FOLLOW_HANDY";
	@Autowired
	FindProfileMapper mapper;
	@Autowired
	RedisTemplate<String, Object> redisTemplate;
	private HashOperations<String, String, List<Handy>> opsHashHandy;
	
	@PostConstruct
	private void init() {
		opsHashHandy = redisTemplate.opsForHash();
	}
	
	@Override
	public void FollowHandy(Handy handy) throws Exception {
		System.out.println(handy.getFollowId()+" *******");
		
		if(opsHashHandy.get(FOLLOW_HANDY, handy.getMyId())==null) {
			System.out.println("EMPTY!!!!!!!!!!!!!!!!!!!!!!!!");
			List<Handy> handies = new ArrayList<Handy>();
			handies.add(handy);
			opsHashHandy.put(FOLLOW_HANDY, handy.getMyId(), handies);
			
		}else {			
			List<Handy> handies = new ArrayList<Handy>();
			handies = opsHashHandy.get(FOLLOW_HANDY, handy.getMyId());			
			handies.add(handy);
			opsHashHandy.put(FOLLOW_HANDY, handy.getMyId(), handies);
		}
	}

	@Override
	public List<Handy> FindFollowHandy(Handy handy) throws Exception {
		if(opsHashHandy.get(FOLLOW_HANDY, handy.getMyId())==null) {
			List<Handy> handies = new ArrayList<Handy>();
			return handies;
		}
		return opsHashHandy.get(FOLLOW_HANDY, handy.getMyId());
	}

	@Override
	public void deleteFollowById(Handy handy) throws Exception {
		List<Handy> handies = new ArrayList<Handy>();
		handies = opsHashHandy.get(FOLLOW_HANDY, handy.getMyId());
		
		String delFollowId = handy.getFollowId();
		for(int i = 0 ; i <handies.size();i++) {
			if(handies.get(i).getFollowId().equals(delFollowId)) {
				handies.remove(i);
				opsHashHandy.put(FOLLOW_HANDY, handy.getMyId(), handies);
				break;
			}
		}
	}

	@Override
	public boolean FindFollowById(Handy handy) throws Exception {
		List<Handy> handies = new ArrayList<Handy>();
		handies = opsHashHandy.get(FOLLOW_HANDY, handy.getMyId());
		String FollowId = handy.getFollowId();
		for(Handy temp : handies) {
			if(temp.getFollowId().equals(FollowId)) {
				return true;
			}
		}
		return false;
		
	}

	@Override
	public Profile findProfile(String followId) throws Exception {
		System.out.println(followId+" test");
		return mapper.findProfile(followId);
	}

}
