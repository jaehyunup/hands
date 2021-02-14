package com.bangkoklab.controller.test;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

import java.nio.charset.StandardCharsets;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.filter.CharacterEncodingFilter;

/**
 * @packageName com.bangkoklab.controller.test
 * @author shimjaehyuk
 * @description abstract 테스트 컨트롤러
 */
@SpringBootTest
@AutoConfigureMockMvc
public abstract class AbstractControllerTest {
	
	protected MockMvc mockMvc;
	
	abstract protected Object controller();
	
	@BeforeEach
	private void setup() {
		mockMvc = MockMvcBuilders.standaloneSetup(controller())
				.addFilter(new CharacterEncodingFilter(StandardCharsets.UTF_8.name(), true))
				.alwaysDo(print())
				.build();
	}
}
