package com.bangkoklab.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bangkoklab.data.vo.UserKeywordsVO;
import com.bangkoklab.service.Keywords;
import com.bangkoklab.service.UserService;

/**
 * @packageName com.bangkoklab.controller
 * @author shimjaehyuk
 * @description 유저 키워드 컨트롤러
 */
@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	UserService userService;

	/**
	 * @param UserKeywordsVO
	 * @return org.springFramework.http.ResponseEntity<?>
	 * @author shimjaehyuk
	 * @description 중복되지 않는 키워드들 저장
	 */
	@PostMapping("/keywords")
	public ResponseEntity<?> insertKeywordsController(@RequestBody UserKeywordsVO userKeywordsVO) {

		MultiValueMap<String, Object> header = new LinkedMultiValueMap<>();
		try {
			switch (userService.insertKeywords(userKeywordsVO)) {
			case 200:
				header.add("message", "keywords successfully inserted");
				return new ResponseEntity<>(header, HttpStatus.OK);
			case 204:
				header.add("message", "no keywords");
				return new ResponseEntity<>(header, HttpStatus.NO_CONTENT);
			}
		} catch (Exception e) {
			header.add("message", "failed to insert keywords");
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
	}

	/**
	 * @param String userUuid
	 * @return org.springFramework.http.ResponseEntity<?>
	 * @author shimjaehyuk
	 * @description 키워드들 조회
	 */
	@GetMapping("/keywords")
	public ResponseEntity<?> getKeywordsController(String userUuid) {

		MultiValueMap<String, Object> header = new LinkedMultiValueMap<>();

		try {
			List<String> keywords = userService.getKeywordsByUserUuid(userUuid);
			
			if (keywords == null || keywords.size() == 0) {
				header.add("message", "no keywords");
				return new ResponseEntity<>(header, HttpStatus.NO_CONTENT);
			}
			
			UserKeywordsVO vo = new UserKeywordsVO();
			vo.setKeywords(keywords);
			vo.setUserUuid(userUuid);
			
			header.add("message", "get keywords");
			return new ResponseEntity(vo, header, HttpStatus.OK);
		} catch (Exception e) {
			header.add("message", "failed to get keywords");
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * @param UserKeywordsVO userKeywordsVO
	 * @return org.springFramework.http.ResponseEntity<?>
	 * @author shimjaehyuk
	 * @description 키워드들 수정
	 */
	@PutMapping("/keywords")
	public ResponseEntity<?> updateKeywordsController(@RequestBody UserKeywordsVO userKeywordsVO) {
		MultiValueMap<String, Object> header = new LinkedMultiValueMap<>();
		try {
			switch (userService.insertKeywords(userKeywordsVO)) {
			case 200:
				header.add("message", "keywords successfully inserted");
				return new ResponseEntity<>(header, HttpStatus.OK);
			case 204:
				header.add("message", "no keywords");
				return new ResponseEntity<>(header, HttpStatus.NO_CONTENT);
			}
		} catch (Exception e) {
			header.add("message", "failed to put keywords");
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
	}

	/**
	 * @param Keywords keywordsObj
	 * @return org.springFramework.http.ResponseEntity<?>
	 * @author shimjaehyuk
	 * @description 키워드를 활용한 유저들 조회
	 */
	@PostMapping("/users")
	public ResponseEntity<?> getUsersController(@RequestBody Keywords keywordsObj) {
		MultiValueMap<String, Object> header = new LinkedMultiValueMap<>();
		
		List<String> keywords = keywordsObj.getKeywords();
		try {
			if (keywords == null || keywords.size() == 0) {
				header.add("message", "no keywords");
				return new ResponseEntity<>(header, HttpStatus.NO_CONTENT);
			}

			List<String> users = userService.getUserUuidByKeywords(keywords);
			if (users == null || users.size() == 0) {
				header.add("message", "no users");
				return new ResponseEntity<>(header, HttpStatus.NO_CONTENT);
			}

			header.add("message", "get keywords");
			return new ResponseEntity(users, header, HttpStatus.OK);
		} catch (Exception e) {
			header.add("message", "failed to insert keywords");
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * @params String userUuid, List<String> keywords
	 * @return org.springFramework.http.ResponseEntity<?>
	 * @author shimjaehyuk
	 * @description 입력받은 키워드들 삭제
	 */
	@DeleteMapping("/keywords")
	public ResponseEntity<?> deleteKeywordsController(@RequestBody UserKeywordsVO vo) {

		MultiValueMap<String, Object> header = new LinkedMultiValueMap<>();
		String userUuid = vo.getUserUuid();
		List<String> keywords = vo.getKeywords();
		
		try {
			userService.deleteKeywords(userUuid, keywords);
			header.add("message", "delete ok");
			return new ResponseEntity<>(header, HttpStatus.OK);
		} catch (Exception e) {
			header.add("message", "failed to delete");
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * @param  String userUuid
	 * @return org.springFramework.http.ResponseEntity<?>
	 * @author shimjaehyuk
	 * @description 유저에 대한 모든 키워드 삭제
	 */
	@DeleteMapping("/keywords/all")
	public ResponseEntity<?> deleteKeywordsAllController(String userUuid) {

		MultiValueMap<String, Object> header = new LinkedMultiValueMap<>();

		try {
			userService.deleteKeywordsAll(userUuid);
			header.add("message", "delete ok");
			return new ResponseEntity<>(header, HttpStatus.OK);
		} catch (Exception e) {
			header.add("message", "failed to delete");
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}
	}
}
