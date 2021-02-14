package com.bangkoklab.findJobService.data.mapper;

import com.bangkoklab.findJobService.data.dto.Job;
import com.bangkoklab.findJobService.data.dto.Profile;

public interface JobMapper {
	void insertJob(Job job) throws Exception;
	void deleteJob(Job job) throws Exception;
	void updateJob(Job job) throws Exception;
	void deletOverDayJob() throws Exception;
	Profile findProfile(String uuid) throws Exception;
}
