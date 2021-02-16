package com.bangkoklab.findJobService.service;

import java.util.List;
import com.bangkoklab.findJobService.data.dto.Profile;
import com.bangkoklab.findJobService.data.dto.Job;

public interface JobService {
	void insertJob(Job job) throws Exception;
	void deleteJob(Job job) throws Exception;
	void updateJob(Job job) throws Exception;
	void updateJobStatus(Job job) throws Exception;
	void deletOverDayJob() throws Exception;
	List<Job> findJobs() throws Exception;
	List<Job> findByCategoryJobs(String category) throws Exception;
	List<Job> findByUuid(String jobUserUUid) throws Exception;
	List<Job> findByDong(String dong) throws Exception;
	List<Job> downCredit() throws Exception;
	List<Job> upCredit() throws Exception;
	Profile findProfile(String uuid) throws Exception;
	List<Job> findByTimeJob(int day) throws Exception;
	Job findJobsById(String jobId) throws Exception;
}
