package com.bangkoklab.findJobService.data.mapper;

import java.util.List;

import com.bangkoklab.findJobService.data.dto.Job;

public interface FindJobMapper {
	List<Job> findJobs() throws Exception;
	List<Job> findByCategory(String category) throws Exception;
	List<Job> findByDong(String dong) throws Exception;
	List<Job> downCredit() throws Exception;
	List<Job> upCredit() throws Exception;
	List<Job> findByTimeJob(int day) throws Exception;
	List<Job> findByUuid(String jobUserUUid) throws Exception;
	Job findJobsById(String jobId) throws Exception;
}
