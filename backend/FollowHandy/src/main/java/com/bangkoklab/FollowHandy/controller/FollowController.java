package com.bangkoklab.FollowHandy.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bangkoklab.FollowHandy.dto.Handy;
import com.bangkoklab.FollowHandy.dto.HandyInfo;
import com.bangkoklab.FollowHandy.dto.Profile;
import com.bangkoklab.FollowHandy.service.FollowService;

@RestController
public class FollowController {

	@Autowired
	FollowService service;
	
	@PostMapping("/follow")
	public ResponseEntity<Map<String, Object>> FollowHandy(@RequestBody Handy handy) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;

		try {
			service.FollowHandy(handy);
			resultMap.put("message", "success");
			status = HttpStatus.OK;
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("message", "fail");
			status = HttpStatus.ACCEPTED;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	@PostMapping("/findFollow")
	public ResponseEntity<List<HandyInfo>> FindFollow(@RequestBody Handy handy) throws Exception{
		List<Handy> TempHandy = service.FindFollowHandy(handy);
		List<HandyInfo> ListHandy = new ArrayList<HandyInfo>();
		for(int i =0;i<TempHandy.size();i++) {
			Handy temp = TempHandy.get(i);
			Profile p = service.findProfile(temp.getFollowId());
			HandyInfo handyinfo = new HandyInfo();
			handyinfo.setMyId(temp.getMyId());
			handyinfo.setFollowId(temp.getFollowId());
			handyinfo.setAddress(p.getAddress());
			handyinfo.setEmail(p.getEmail());
			handyinfo.setGender(p.getGender());
			handyinfo.setName(p.getName());
			handyinfo.setNickname(p.getNickname());
			ListHandy.add(handyinfo);
		}
		return new ResponseEntity<List<HandyInfo>>(ListHandy, HttpStatus.OK);
	}
	
	@DeleteMapping("/deleteFollowById")
	public ResponseEntity<Map<String, Object>> deleteFollowById(@RequestBody Handy handy) throws Exception{
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;

		try {
			service.deleteFollowById(handy);
			resultMap.put("message", "success");
			status = HttpStatus.OK;
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("message", "fail");
			status = HttpStatus.ACCEPTED;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	
	@PostMapping("/FindFollowById")
	public ResponseEntity<Map<String, Object>> FindFollowById(@RequestBody Handy handy) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;

		try {
			if(service.FindFollowById(handy)) {
				resultMap.put("message", "YES");				
			}else {
				resultMap.put("message", "NO");				
			}
			status = HttpStatus.OK;
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("message", "fail");
			status = HttpStatus.ACCEPTED;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
}
