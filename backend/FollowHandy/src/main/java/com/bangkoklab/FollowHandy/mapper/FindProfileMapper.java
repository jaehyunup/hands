package com.bangkoklab.FollowHandy.mapper;

import com.bangkoklab.FollowHandy.dto.Profile;

public interface FindProfileMapper {
	Profile findProfile(String followId) throws Exception;
}
