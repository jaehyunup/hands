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

import com.bangkoklab.data.vo.JobKeywordsVO;
import com.bangkoklab.service.JobService;
import com.bangkoklab.service.Keywords;

/**
 * @packageName com.bangkoklab.controller
 * @author shimjaehyuk
 * @description 거래 키워드 컨트롤러
 */
@RestController
@RequestMapping("/job")
public class JobController {

	@Autowired
	JobService jobService;

	/**
	 * @param JobKeywordsVO
	 * @return org.springFramework.http.ResponseEntity<?>
	 * @author shimjaehyuk
	 * @description 중복되지 않는 키워드들 저장
	 */
	@PostMapping("/keywords")
	public ResponseEntity<?> insertKeywordsController(@RequestBody JobKeywordsVO jobKeywordsVO) {

		MultiValueMap<String, Object> header = new LinkedMultiValueMap<>();
		try {
			switch (jobService.insertKeywords(jobKeywordsVO)) {
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
	 * @param String jobId
	 * @return org.springFramework.http.ResponseEntity<?>
	 * @author shimjaehyuk
	 * @description 키워드들 조회
	 */
	@GetMapping("/keywords")
	public ResponseEntity<?> getKeywordsController(String jobId) {

		MultiValueMap<String, Object> header = new LinkedMultiValueMap<>();

		try {
			List<String> keywords = jobService.getKeywordsByJobId(jobId);
			if (keywords == null || keywords.size() == 0) {
				header.add("message", "no keywords");
				return new ResponseEntity<>(header, HttpStatus.NO_CONTENT);
			}
			
			JobKeywordsVO vo = new JobKeywordsVO();
			vo.setKeywords(keywords);
			vo.setJobId(jobId);
			
			header.add("message", "get keywords");
			return new ResponseEntity(vo, header, HttpStatus.OK);
		} catch (Exception e) {
			header.add("message", "failed to get keywords");
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * @param JobKeywordsVO jobKeywordsVO
	 * @return org.springFramework.http.ResponseEntity<?>
	 * @author shimjaehyuk
	 * @description 키워드들 수정
	 */
	@PutMapping("/keywords")
	public ResponseEntity<?> updateKeywordsController(@RequestBody JobKeywordsVO jobKeywordsVO) {
		MultiValueMap<String, Object> header = new LinkedMultiValueMap<>();
		try {
			switch (jobService.insertKeywords(jobKeywordsVO)) {
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
	 * @description 키워드를 활용한 거래들 조회
	 */
	@PostMapping("/jobs")
	public ResponseEntity<?> getUsersController(@RequestBody Keywords keywordsObj) {

		MultiValueMap<String, Object> header = new LinkedMultiValueMap<>();

		List<String> keywords = keywordsObj.getKeywords();
		try {
			if (keywords == null || keywords.size() == 0) {
				header.add("message", "no keywords");
				return new ResponseEntity<>(header, HttpStatus.NO_CONTENT);
			}

			List<String> jobs = jobService.getJobIdByKeywords(keywords);
			if (jobs == null || jobs.size() == 0) {
				header.add("message", "no users");
				return new ResponseEntity<>(header, HttpStatus.NO_CONTENT);
			}

			header.add("message", "get keywords");
			return new ResponseEntity(jobs, header, HttpStatus.OK);
		} catch (Exception e) {
			header.add("message", "failed to insert keywords");
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * @params String jobId, List<String> keywords
	 * @return org.springFramework.http.ResponseEntity<?>
	 * @author shimjaehyuk
	 * @description 입력받은 키워드들 삭제
	 */
	@DeleteMapping("/keywords")
	public ResponseEntity<?> deleteKeywordsController(@RequestBody JobKeywordsVO vo) {

		String jobId = vo.getJobId();
		List<String> keywords = vo.getKeywords();
		MultiValueMap<String, Object> header = new LinkedMultiValueMap<>();

		try {
			jobService.deleteKeywords(jobId, keywords);
			header.add("message", "delete ok");
			return new ResponseEntity<>(header, HttpStatus.OK);
		} catch (Exception e) {
			header.add("message", "failed to delete");
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * @param String jobId
	 * @return org.springFramework.http.ResponseEntity<?>
	 * @author shimjaehyuk
	 * @description 거래에 대한 모든 키워드 삭제
	 */
	@DeleteMapping("/keywords/all")
	public ResponseEntity<?> deleteKeywordsAllController(String jobId) {

		MultiValueMap<String, Object> header = new LinkedMultiValueMap<>();

		try {
			jobService.deleteKeywordsAll(jobId);
			header.add("message", "delete ok");
			return new ResponseEntity<>(header, HttpStatus.OK);
		} catch (Exception e) {
			header.add("message", "failed to delete");
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}
	}
}