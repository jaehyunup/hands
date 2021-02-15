package com.bangkoklab.findJobService.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bangkoklab.findJobService.data.dto.Profile;
import com.bangkoklab.findJobService.data.dto.Job;
import com.bangkoklab.findJobService.data.mapper.FindJobMapper;
import com.bangkoklab.findJobService.data.mapper.JobMapper;
import com.bangkoklab.findJobService.service.JobService;

@Service
public class JobServiceImpl implements JobService{

	@Autowired
	JobMapper mapper;
	@Autowired
	FindJobMapper Findmapper;
	
	@Override
	public void insertJob(Job job) throws Exception {
		mapper.insertJob(job);
	}

	@Override
	public void deleteJob(Job job) throws Exception {
		mapper.deleteJob(job);
	}

	@Override
	public void updateJob(Job job) throws Exception {
		mapper.updateJob(job);
	}

	@Override
	public List<Job> findJobs() throws Exception {
		return Findmapper.findJobs();
	}
	
	@Override
	public List<Job> findByCategoryJobs(String category) throws Exception {
		return Findmapper.findByCategory(category);
	}

	@Override
	public List<Job> findByDong(String dong) throws Exception {
		return Findmapper.findByDong(dong);
	}

	@Override
	public List<Job> downCredit() throws Exception {
		return Findmapper.downCredit();
	}

	@Override
	public List<Job> upCredit() throws Exception {
		// TODO Auto-generated method stub
		return Findmapper.upCredit();
	}

	@Override
	public Profile findProfile(String uuid) throws Exception {
		return mapper.findProfile(uuid);
	}

	@Override
	public List<Job> findByTimeJob(int day) throws Exception {
		return Findmapper.findByTimeJob(day);
	}

	@Override
	public void deletOverDayJob() throws Exception {
		mapper.deletOverDayJob();
	}

	@Override
	public Job findJobsById(String jobId) throws Exception {
		System.out.println(jobId+" 123");
		return Findmapper.findJobsById(jobId);
	}

	@Override
	public List<Job> findByUuid(String jobUserUUid) throws Exception {
		// TODO Auto-generated method stub
		return Findmapper.findByUuid(jobUserUUid);
	}

	

}
