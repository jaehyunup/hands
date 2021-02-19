package com.bangkoklab.hands.authservice.data.spec;

import com.bangkoklab.hands.authservice.data.entity.UserProfile;
import org.springframework.data.jpa.domain.Specification;

public class ProfileSpecs {
    public static Specification<UserProfile> withType(int type) {
        return (Specification<UserProfile>) ((root, query, builder) ->
                builder.equal(root.get("type"), type)
        );
    }
}
