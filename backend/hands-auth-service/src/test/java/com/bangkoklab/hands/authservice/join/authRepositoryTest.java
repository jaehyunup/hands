package com.bangkoklab.hands.authservice.join;

import com.bangkoklab.hands.authservice.data.entity.Authentication;
import com.bangkoklab.hands.authservice.data.repository.AuthenticationRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

@DataJpaTest
@Transactional(propagation = Propagation.NOT_SUPPORTED)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class authRepositoryTest {
    @Mock
    AuthenticationRepository repo;

    @Test
    @DisplayName("일반 유저 회원가입이 잘 되는지")
    void userJoin() {
        // given
        Authentication mockAuthentication=new Authentication();
        mockAuthentication.setUserId("test");
        mockAuthentication.setPassword("test");
        mockAuthentication.setUserUuid(UUID.randomUUID().toString().replace("-",""));
        mockAuthentication.addAuthorities("ROLE_USER");
        mockAuthentication=repo.save(mockAuthentication);

        // when
        Authentication findAuthentication=repo.findByUserId("test");
        // then
        verify(repo, atLeastOnce()).findByUserId(anyString());
        assertThat(findAuthentication.getUserId(), is("test"));

    }

    @Test
    @DisplayName("기존 유저가 잘 찾아지는지")
    void findById() {

    }



}
