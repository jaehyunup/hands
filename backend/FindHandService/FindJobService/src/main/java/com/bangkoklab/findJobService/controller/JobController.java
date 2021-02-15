package com.bangkoklab.findJobService.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bangkoklab.findJobService.data.dto.Job;
import com.bangkoklab.findJobService.data.dto.Profile;
import com.bangkoklab.findJobService.data.dto.TotalSearch;
import com.bangkoklab.findJobService.service.JobService;

import io.swagger.models.auth.In;

@RestController
@RequestMapping("/Jobs")
public class JobController {

	@Autowired
	JobService service;

	@PostMapping("/totalSearch")
	public ResponseEntity<List<Job>> totalSearch(@RequestBody TotalSearch totalSearch) throws Exception{
		List<Job> JobList = new ArrayList<Job>();
		
		int minCredit = Integer.parseInt(totalSearch.getMinCredit());
		int maxCredit = Integer.parseInt(totalSearch.getMaxCredit());
	
		String[] dong = totalSearch.getDong().split(" ");
		List<Job> tmp = service.findByDong(dong[2]);
		System.out.println(tmp.size());
		for(int i = 0; i< tmp.size();i++) {
			Job job = tmp.get(i);
			int credit =Integer.parseInt(job.getJobCredit());
			if(minCredit<= credit && credit < maxCredit) {
				String workDay = job.getWorkingDate().replace("-", "");
				SimpleDateFormat today = new SimpleDateFormat("yyyyMMdd");
				Date time = new Date();
				String nowDay = today.format(time);

				Date firstTime = today.parse(nowDay);
				Date secondTime = today.parse(workDay);

				long calDate = secondTime.getTime() - firstTime.getTime();
				long calDays = calDate / (24 * 60 * 60 * 1000);
				if(calDays <= totalSearch.getDday()) {
					job.setDday(calDays);
					System.out.println(calDays+" 1 "+totalSearch.getDday());
					System.out.println(totalSearch.getCategory());
					System.out.println(job.getCategoryId());
					System.out.println(totalSearch.getCategory().equals(job.getCategoryId())); 
					if(totalSearch.getCategory().equals("전체")) {
						JobList.add(job);
					}else {
						if(totalSearch.getCategory().equals(job.getCategoryId())) {
							JobList.add(job);							
						}
					}
				}
			}
			
			
		}
		return new ResponseEntity<List<Job>>(JobList, HttpStatus.OK);
	}
//	입력후 리스트 출력
//	@PostMapping("/insertHand")
//	public ResponseEntity<List<Hand>> insertHand(@RequestBody Hand hand) throws Exception{
//		service.insertHand(hand);
//		return new ResponseEntity<List<Hand>>(service.findHands(),HttpStatus.OK);
//	}

	// 일거리 게시
	// 기본키 중복 예외
	@PostMapping("/insertJob")
	public ResponseEntity<Map<String, Object>> insertJob(@RequestBody Job job) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;

		try {
			job.setJobId(UUID.randomUUID().toString());
			Profile profile = service.findProfile(job.getJobUserUUid());
			job.setUserAddress(profile.getAddress());
			job.setUserEmail(profile.getEmail());
			job.setUserGender(profile.getGender());
			job.setUserName(profile.getName());
			job.setUserNickname(profile.getNickname());
			job.setUserPhone(profile.getPhone());
			Date time = new Date();
			
			job.setJobRegdate(time);
			service.insertJob(job);
			resultMap.put("message", "success");
			status = HttpStatus.OK;
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("message", "fail");
			status = HttpStatus.ACCEPTED;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	@GetMapping("/jobInfo")
	public ResponseEntity<Job> jobInfo(@RequestParam String jobId) throws Exception {
		System.out.println(jobId);
		Job temp_job = service.findJobsById(jobId);
		String workDay = temp_job.getWorkingDate().replace("-", "");
		SimpleDateFormat today = new SimpleDateFormat("yyyyMMdd");
		Date time = new Date();
		String nowDay = today.format(time);

		Date firstTime = today.parse(nowDay);
		Date secondTime = today.parse(workDay);

		long calDate = secondTime.getTime() - firstTime.getTime();
		long calDays = calDate / (24 * 60 * 60 * 1000);
		temp_job.setDday(calDays);
		
		return new ResponseEntity<Job>(temp_job, HttpStatus.OK);
	}

	// 일거리 조회
	@GetMapping("/findJobs")
	public ResponseEntity<List<Job>> findJobs() throws Exception {
		List<Job> temp = service.findJobs();
		for (int i = 0; i < temp.size(); i++) {
			String workDay = temp.get(i).getWorkingDate().replace("-", "");
			SimpleDateFormat today = new SimpleDateFormat("yyyyMMdd");
			Date time = new Date();
			String nowDay = today.format(time);

			Date firstTime = today.parse(nowDay);
			Date secondTime = today.parse(workDay);

			long calDate = secondTime.getTime() - firstTime.getTime();
			long calDays = calDate / (24 * 60 * 60 * 1000);
			temp.get(i).setDday(calDays);

		}

		return new ResponseEntity<List<Job>>(temp, HttpStatus.OK);
	}

	// 카테고리 별 일거리 조회
	@GetMapping("/findJobsByCategory")
	public ResponseEntity<List<Job>> findByCategory(@RequestParam String category) throws Exception {
		List<Job> temp = service.findByCategoryJobs(category);
		for (int i = 0; i < temp.size(); i++) {
			String workDay = temp.get(i).getWorkingDate().replace("-", "");
			SimpleDateFormat today = new SimpleDateFormat("yyyyMMdd");
			Date time = new Date();
			String nowDay = today.format(time);

			Date firstTime = today.parse(nowDay);
			Date secondTime = today.parse(workDay);

			long calDate = secondTime.getTime() - firstTime.getTime();
			long calDays = calDate / (24 * 60 * 60 * 1000);
			temp.get(i).setDday(calDays);

		}
		return new ResponseEntity<List<Job>>(temp, HttpStatus.OK);
	}

	// 동별 일거리 조회
	@GetMapping("/findJobsByDong")
	public ResponseEntity<List<Job>> findByDong(@RequestParam String dong) throws Exception {	
		List<Job> temp = service.findByDong(dong);
		for (int i = 0; i < temp.size(); i++) {
			String workDay = temp.get(i).getWorkingDate().replace("-", "");
			SimpleDateFormat today = new SimpleDateFormat("yyyyMMdd");
			Date time = new Date();
			String nowDay = today.format(time);

			Date firstTime = today.parse(nowDay);
			Date secondTime = today.parse(workDay);

			long calDate = secondTime.getTime() - firstTime.getTime();
			long calDays = calDate / (24 * 60 * 60 * 1000);
			temp.get(i).setDday(calDays);

		}
		return new ResponseEntity<List<Job>>(temp, HttpStatus.OK);
	}

	
	@GetMapping("/findJobsByUuid")
	public ResponseEntity<List<Job>> findByUuiod(@RequestParam String jobUserUUid) throws Exception {	
		List<Job> temp = service.findByUuid(jobUserUUid);
		for (int i = 0; i < temp.size(); i++) {
			String workDay = temp.get(i).getWorkingDate().replace("-", "");
			SimpleDateFormat today = new SimpleDateFormat("yyyyMMdd");
			Date time = new Date();
			String nowDay = today.format(time);

			Date firstTime = today.parse(nowDay);
			Date secondTime = today.parse(workDay);

			long calDate = secondTime.getTime() - firstTime.getTime();
			long calDays = calDate / (24 * 60 * 60 * 1000);
			temp.get(i).setDday(calDays);
		}
		return new ResponseEntity<List<Job>>(temp, HttpStatus.OK);
	}
	
	
	// 크레딧 기준 정렬
	@GetMapping("/SortByCredit")
	public ResponseEntity<List<Job>> downCredit(@RequestParam String order) throws Exception {
		List<Job> list = new ArrayList<Job>();
		if (order.equals("Down")) {
			list = service.downCredit();
		} else if (order.equals("Up")) {
			list = service.upCredit();
		}
		for (int i = 0; i < list.size(); i++) {
			String workDay = list.get(i).getWorkingDate().replace("-", "");
			SimpleDateFormat today = new SimpleDateFormat("yyyyMMdd");
			Date time = new Date();
			String nowDay = today.format(time);

			Date firstTime = today.parse(nowDay);
			Date secondTime = today.parse(workDay);

			long calDate = secondTime.getTime() - firstTime.getTime();
			long calDays = calDate / (24 * 60 * 60 * 1000);
			list.get(i).setDday(calDays);

		}
		return new ResponseEntity<List<Job>>(list, HttpStatus.OK);
	}

	// 크레딧 기준 정렬
	// 수정 필요
	@GetMapping("/findJobsByCredit")
	public ResponseEntity<List<Job>> findJobsByCredit(@RequestParam String minValue, @RequestParam String maxValue)
			throws Exception {

		List<Job> list = new ArrayList<Job>();
		List<Job> temp = service.findJobs();
		int min = Integer.parseInt(minValue);
		int max = Integer.parseInt(maxValue);
		for (Job s : temp) {
			int cur = Integer.parseInt(s.getJobCredit());
			if (cur >= min && cur < max) {
				list.add(s);
			}
		}

//		try {
//			List<Hand> h = service.findByCreditHands(credit);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
		for (int i = 0; i < list.size(); i++) {
			String workDay = list.get(i).getWorkingDate().replace("-", "");
			SimpleDateFormat today = new SimpleDateFormat("yyyyMMdd");
			Date time = new Date();
			String nowDay = today.format(time);

			Date firstTime = today.parse(nowDay);
			Date secondTime = today.parse(workDay);

			long calDate = secondTime.getTime() - firstTime.getTime();
			long calDays = calDate / (24 * 60 * 60 * 1000);
			list.get(i).setDday(calDays);

		}
		return new ResponseEntity<List<Job>>(list, HttpStatus.OK);
	}

	@GetMapping("/findByTimeJob")
	public ResponseEntity<List<Job>> findByTimeJob(int day) throws Exception {
		List<Job> temp = service.findByTimeJob(day);
		for (int i = 0; i < temp.size(); i++) {
			String workDay = temp.get(i).getWorkingDate().replace("-", "");
			SimpleDateFormat today = new SimpleDateFormat("yyyyMMdd");
			Date time = new Date();
			String nowDay = today.format(time);

			Date firstTime = today.parse(nowDay);
			Date secondTime = today.parse(workDay);

			long calDate = secondTime.getTime() - firstTime.getTime();
			long calDays = calDate / (24 * 60 * 60 * 1000);
			temp.get(i).setDday(calDays);

		}
		return new ResponseEntity<List<Job>>(temp, HttpStatus.OK);
	}

	// 일거리 삭제
	@DeleteMapping("/deleteJob")
	public ResponseEntity<Map<String, Object>> deleteJob(@RequestBody Job job) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;

		try {
			service.deleteJob(job);
			resultMap.put("message", "success");
			status = HttpStatus.OK;
		} catch (Exception e) {
			resultMap.put("message", "fail");
			status = HttpStatus.ACCEPTED;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	// 날짜 지난 일거리 삭제
	@DeleteMapping("/deletOverDayJob")
	public ResponseEntity<Map<String, Object>> deletOverDayeJob() throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;

		try {
			service.deletOverDayJob();
			resultMap.put("message", "success");
			status = HttpStatus.OK;
		} catch (Exception e) {
			resultMap.put("message", "fail");
			status = HttpStatus.ACCEPTED;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	// 일거리 수정
	@PutMapping("/updateJob")
	public ResponseEntity<Map<String, Object>> UpdateJob(@RequestBody Job job) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;
		System.out.println(job.getJobId());
		try {
			service.updateJob(job);
			resultMap.put("message", "success");
			status = HttpStatus.OK;
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("message", "fail");
			status = HttpStatus.ACCEPTED;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

}
