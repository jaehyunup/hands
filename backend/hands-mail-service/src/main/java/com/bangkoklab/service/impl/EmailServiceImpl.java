package com.bangkoklab.service.impl;

import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.stereotype.Service;

import com.bangkoklab.service.EmailService;

/**
* @packageName com.bangkoklab.service.impl
* @fileName EmailServiceImpl
* @author shimjaehyuk
* @description smtp 이메일 인증 서비스
* @See EmailService
**/
@Service
public class EmailServiceImpl implements EmailService {
	
	/**
     * @methodName sendEmail
     * @author shimjaehyuk
     * @param String email, String encryptedEmail, String content, String subject
     * @return void
     * @description 인증 요청을 smtp로 전송
     **/
	public void sendEmail(String email, String encryptedEmail, String content, String subject) throws Exception {

		Properties properties = new Properties();

		properties.put("mail.smtp.auth", "true");
		properties.put("mail.smtp.starttls.enable", "true");
		properties.put("mail.smtp.host", "smtp.gmail.com");
		properties.put("mail.smtp.port", "587");

		String myAccountEmail = "everyhandsday@gmail.com";
		String password = "hands4179";

		Session session = Session.getInstance(properties, new Authenticator() {

			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(myAccountEmail, password);
			}
		});

		Message message = prepareMessage(email, session, myAccountEmail, encryptedEmail, content, subject);

		Transport.send(message);

	}

	/**
     * @methodName prepareMessage
     * @author shimjaehyuk
     * @param String email, javax.mail.Session session, String myAccountEmail, String encryptedEmail, String inputContent, String inputSubject
     * @return javax.mail.Message
     * @description 전송할 메시지 정보 설정
     **/
	private Message prepareMessage(String email, Session session, String myAccountEmail, String encryptedEmail, String inputContent, String inputSubject) {
		
		String content = inputContent;

		Message message = new MimeMessage(session);
		try {
			message.setFrom(new InternetAddress(myAccountEmail));
			message.setRecipient(Message.RecipientType.TO, new InternetAddress(email));
			message.setSubject(inputSubject);
			message.setContent(content, "text/html;charset=UTF8");

			return message;
		} catch (Exception e) {
			Logger.getLogger(EmailServiceImpl.class.getName()).log(Level.SEVERE, null, e);
		}
		return null;
	}

}
