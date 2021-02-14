package com.bangkoklab.chatServer.controller;


import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.bangkoklab.chatServer.data.ChatMessage;
import com.bangkoklab.chatServer.data.ChatRoom;
import com.bangkoklab.chatServer.data.repository.ChatRoomRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Controller
@RequestMapping("/chat")
public class ChatRoomController {

	@Autowired
	ChatRoomRepository chatRoomRepository;

    @GetMapping("/room")
    public String rooms(Model model) {
    	return "/chat/room";
    }

    @GetMapping("/rooms")
    @ResponseBody
    public List<ChatRoom> room() {
        return chatRoomRepository.findAllRoom();
    }

    @PostMapping("/room")
    @ResponseBody
    public ChatRoom createRoom(@RequestParam String roomName) {
        return chatRoomRepository.createChatRoom(roomName);
    }

    @GetMapping("/room/enter/{roomId}")
    public String roomDetail(Model model, @PathVariable String roomId) {
        model.addAttribute("roomId", roomId);
        return "/chat/roomdetail";
    }
    
    @DeleteMapping("/room/delete")
    @ResponseBody
    ResponseEntity<Map<String, Object>> deleteRoom(@RequestParam String roomId){
    	Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;
		System.out.println(roomId);
		try {
			chatRoomRepository.deleteRoom(roomId);
			resultMap.put("message", "success");
			status = HttpStatus.OK;
		} catch (Exception e) {
			resultMap.put("message", "fail");
			status = HttpStatus.ACCEPTED;
		}
    	return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @GetMapping("/room/{roomId}")
    @ResponseBody
    public ChatRoom roomInfo(@PathVariable String roomId) {
        return chatRoomRepository.findRoomById(roomId);
    }
    
    @GetMapping("/room/message/{roomId}")
    @ResponseBody
    public List<ChatMessage> roomMessage(@PathVariable String roomId) {
    	System.out.println("test : "+roomId);
    	List<ChatMessage> ch = chatRoomRepository.roomMessage(roomId);
    	for(ChatMessage c : ch) {
    		System.out.println("-----------------------");
            System.out.println(c.getType());
            System.out.println(c.getRoomId());
            System.out.println(c.getSender()+" 123");
            System.out.println(c.getMessage());
            System.out.println("-----------------------");
    	}
        return chatRoomRepository.roomMessage(roomId);
    }
}
