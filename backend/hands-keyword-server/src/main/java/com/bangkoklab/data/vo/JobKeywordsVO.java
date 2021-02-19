package com.bangkoklab.data.vo;

import java.io.Serializable;
import java.util.List;

/**
 * @packageName com.bangkoklab.data.vo
 * @author shimjaehyuk
 * @description uuid, keywords를 가진 VO
 */
public class JobKeywordsVO implements Serializable {
	private String jobId;
	private List<String> keywords;

	public String getJobId() {
		return jobId;
	}

	public void setJobId(String jobId) {
		this.jobId = jobId;
	}

	public List<String> getKeywords() {
		return keywords;
	}

	public void setKeywords(List<String> keywords) {
		this.keywords = keywords;
	}

	public JobKeywordsVO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public JobKeywordsVO(String jobId, List<String> keywords) {
		super();
		this.jobId = jobId;
		this.keywords = keywords;
	}

	@Override
	public String toString() {
		return "JobKeywordsVO [jobId=" + jobId + ", keywords=" + keywords + "]";
	}

}
