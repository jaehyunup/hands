package com.bangkoklab.data.vo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * @packageName com.bangkoklab.data.vo
 * @author shimjaehyuk
 * @description uuid, keywords를 가진 VO
 */
public class UserKeywordsVO implements Serializable {

	private String userUuid;
	private List<String> keywords;

	@Override
	public String toString() {
		return "UserKeywordsVO [userUuid=" + userUuid + ", keywords=" + keywords + "]";
	}

	public UserKeywordsVO() {
	}

	public UserKeywordsVO(String userUuid, List<String> keywords) {
		super();
		this.userUuid = userUuid;
		this.keywords = keywords;
	}

	public String getUserUuid() {
		return userUuid;
	}

	public void setUserUuid(String userUuid) {
		this.userUuid = userUuid;
	}

	public List<String> getKeywords() {
		return keywords;
	}

	public void setKeywords(List<String> keywords) {
		this.keywords = keywords;
	}

}
