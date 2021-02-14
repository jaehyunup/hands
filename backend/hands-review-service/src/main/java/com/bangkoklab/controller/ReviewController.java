package com.bangkoklab.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bangkoklab.data.vo.Input;
import com.bangkoklab.data.vo.ReviewMass;
import com.bangkoklab.data.vo.ReviewVO;
import com.bangkoklab.service.ContractService;
import com.bangkoklab.service.ImgService;
import com.bangkoklab.service.ReviewService;
import com.bangkoklab.service.UrlService;

/**
 * @packageName com.bangkoklab.controller
 * @author shimjaehyuk
 * @description 리뷰 서비스 제공 컨트롤러
 */
@RestController
public class ReviewController {

	@Autowired
	ReviewService reviewService;
	@Autowired
	ImgService imgService;
	@Autowired
	UrlService urlService;
	@Autowired
	ContractService contractService;

	/**
	 * @methodName getReview
	 * @author shimjaehyuk
	 * @param String userUuid
	 * @return org.springframework.http.ResponseEntity<?>
	 * @description review, urls, imgs, thumbs 제공
	 **/
	@GetMapping("/review/userUuid")
	public ResponseEntity<?> getReview(String userUuid) {

		MultiValueMap<String, String> header = new LinkedMultiValueMap<>();
		List<ReviewMass> reviewList = new ArrayList<>();

		List<ReviewVO> list = reviewService.getReview(userUuid);
		if (list == null || list.size() == 0) {
			header.add("message", "no-review");
			return new ResponseEntity<>(header, HttpStatus.NO_CONTENT);
		}

		for (ReviewVO review : list) {
			ReviewMass reviewMass = new ReviewMass();
			reviewMass.setReviewVO(review);
			reviewMass.setImgs(imgService.getImgByReviewId(review.getReviewId()));
			reviewMass.setUrls(urlService.getUrlsByReviewId(review.getReviewId()));
			reviewMass.setThumbs(imgService.getThumbByReviewId(review.getReviewId()));
			reviewList.add(reviewMass);
		}

		header.add("message", "get review successed");
		return new ResponseEntity<>(reviewList, header, HttpStatus.OK);
	}

	/**
	 * @methodName insertReview
	 * @author shimjaehyuk
	 * @param String userUuid
	 * @return org.springframework.http.ResponseEntity<?>
	 * @description review, urls, imgs 저장
	 **/
	@PostMapping("/review")
	public ResponseEntity<?> insertReview(Input input, @RequestParam List<String> urls) {

		MultiValueMap<String, String> header = new LinkedMultiValueMap<>();

		if (reviewService.isReviewDuplicated(input) != 0) {
			header.add("message", "review already existed");
			return new ResponseEntity<>(header, HttpStatus.CONFLICT);
		}

		String targetUuid = contractService.getTargetUuid(input.getContractId());
		if(targetUuid == null) {
			header.add("message", "contract is not existed");
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}
		String reviewId = UUID.randomUUID().toString();
		try {
			reviewService.insertReview(input, targetUuid, reviewId);
		} catch (Exception e) {
			e.printStackTrace();
			header.add("message", "failed to save review");
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}

		if (imgService.saveToServer(input.getImgs(), reviewId) == 0) {
			header.add("img message", "failed to save img");
		}
		if(urlService.inserUrls(reviewId, input.getUrls()) == 0) {
			header.add("url message", "failed to save url");
		}
		header.add("message", "review save successed");
		return new ResponseEntity<>(header, HttpStatus.OK);
	}

	/**
	 * @methodName getReviewListByTarget
	 * @author shimjaehyuk
	 * @param String targetUuid
	 * @return org.springframework.http.ResponseEntity<?>
	 * @description review, urls, imgs thumbs제공
	 **/
	@GetMapping("/review/targetUuid")
	public ResponseEntity<?> getReviewListByTarget(String targetUuid) {

		MultiValueMap<String, String> header = new LinkedMultiValueMap<>();
		List<ReviewMass> reviewList = new ArrayList<>();

		List<ReviewVO> list = reviewService.getReviewByTargetUuid(targetUuid);
		if (list == null || list.size() == 0) {
			header.add("message", "no-review");
			return new ResponseEntity<>(header, HttpStatus.NO_CONTENT);
		}

		for (ReviewVO review : list) {
			ReviewMass reviewMass = new ReviewMass();
			reviewMass.setReviewVO(review);
			reviewMass.setImgs(imgService.getImgByReviewId(review.getReviewId()));
			reviewMass.setUrls(urlService.getUrlsByReviewId(review.getReviewId()));
			reviewMass.setThumbs(imgService.getThumbByReviewId(review.getReviewId()));
			reviewList.add(reviewMass);
		}

		header.add("message", "get review successed");
		return new ResponseEntity<>(reviewList, header, HttpStatus.OK);
	}

	/**
	 * @methodName getReviewListByReviewId
	 * @author shimjaehyuk
	 * @param String reviewId
	 * @return org.springframework.http.ResponseEntity<?>
	 * @description review, urls, imgs, thumbs 제공
	 **/
	@GetMapping("/review/reviewId")
	public ResponseEntity<?> getReviewListByReviewId(String reviewId) {

		MultiValueMap<String, String> header = new LinkedMultiValueMap<>();
		List<ReviewMass> reviewList = new ArrayList<>();

		ReviewVO vo = reviewService.getReviewByReviewId(reviewId);
		if (vo == null) {
			header.add("message", "no-review");
			return new ResponseEntity<>(header, HttpStatus.NO_CONTENT);
		}

		ReviewMass reviewMass = new ReviewMass();
		reviewMass.setReviewVO(vo);
		reviewMass.setImgs(imgService.getImgByReviewId(vo.getReviewId()));
		reviewMass.setUrls(urlService.getUrlsByReviewId(vo.getReviewId()));
		reviewMass.setThumbs(imgService.getThumbByReviewId(vo.getReviewId()));
		reviewList.add(reviewMass);

		header.add("message", "get review successed");
		return new ResponseEntity<>(reviewList, header, HttpStatus.OK);
	}

	/**
	 * @methodName getAllReview
	 * @author shimjaehyuk
	 * @param String targetUuid
	 * @return org.springframework.http.ResponseEntity<?>
	 * @description review, urls, imgs, thumbs 제공
	 **/
	@GetMapping("/review/all")
	public ResponseEntity<?> getAllReview() {

		MultiValueMap<String, String> header = new LinkedMultiValueMap<>();
		List<ReviewMass> reviewList = new ArrayList<>();

		List<ReviewVO> list = reviewService.getAllReview();

		if (list == null || list.size() == 0) {
			header.add("message", "no-review");
			return new ResponseEntity<>(header, HttpStatus.NO_CONTENT);
		}

		for (ReviewVO review : list) {
			ReviewMass reviewMass = new ReviewMass();
			reviewMass.setReviewVO(review);
			reviewMass.setImgs(imgService.getImgByReviewId(review.getReviewId()));
			reviewMass.setUrls(urlService.getUrlsByReviewId(review.getReviewId()));
			reviewMass.setThumbs(imgService.getThumbByReviewId(review.getReviewId()));
			reviewList.add(reviewMass);
		}

		header.add("message", "get review successed");
		return new ResponseEntity<>(reviewList, header, HttpStatus.OK);
	}

	/**
	 * @methodName deleteReviewByUserUuid
	 * @author shimjaehyuk
	 * @param String userUuid
	 * @return org.springframework.http.ResponseEntity<?>
	 * @description 해당 유저 uuid를 가진 모든 review, urls, img 삭제
	 **/
	@DeleteMapping("/review/userUuid")
	public ResponseEntity<?> deleteReviewByUserUuid(String userUuid) {

		MultiValueMap<String, String> header = new LinkedMultiValueMap<>();

		try {
			List<ReviewVO> reviews = reviewService.getReview(userUuid);

			if (reviews == null || reviews.size() == 0) {
				header.add("message", "review not existed");
				return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
			}

			for (ReviewVO review : reviews) {
				imgService.deleteImg(review.getReviewId());
				urlService.deleteUrlByReviewId(review.getReviewId());
			}
			for (ReviewVO review : reviews) {
				reviewService.deleteReviewByUserUuid(userUuid);
			}
		} catch (Exception e) {
			e.printStackTrace();
			header.add("message", "review NOT deleted");
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}

		header.add("message", "review deleted");
		return new ResponseEntity<>(header, HttpStatus.OK);
	}

	/**
	 * @methodName deleteReviewByUserUuid
	 * @author shimjaehyuk
	 * @param String userUuid
	 * @return org.springframework.http.ResponseEntity<?>
	 * @description 해당 리뷰에 대한 모든 review, urls, img 삭제
	 **/
	@DeleteMapping("/review/reviewId")
	public ResponseEntity<?> deleteReviewByReviewId(String reviewId) {

		MultiValueMap<String, String> header = new LinkedMultiValueMap<>();

		try {
			ReviewVO vo = reviewService.getReviewByReviewId(reviewId);

			if (vo == null) {
				header.add("message", "review not existed");
				return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
			}

			imgService.deleteImg(vo.getReviewId());
			urlService.deleteUrlByReviewId(vo.getReviewId());
			reviewService.deleteReviewByReviewId(reviewId);
		} catch (Exception e) {
			e.printStackTrace();
			header.add("message", "review NOT deleted");
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}

		header.add("message", "review deleted");
		return new ResponseEntity<>(header, HttpStatus.OK);
	}

	/**
	 * @methodName deleteReviewByContractId
	 * @author shimjaehyuk
	 * @param String userUuid
	 * @return org.springframework.http.ResponseEntity<?>
	 * @description 해당 거래에 대한 리뷰, urls, imgs 삭제
	 **/
	@DeleteMapping("/review/contractId")
	public ResponseEntity<?> deleteReviewByContractId(String contractId) {

		MultiValueMap<String, String> header = new LinkedMultiValueMap<>();

		try {
			String reviewId = reviewService.getReviewIdByContractId(contractId);
			ReviewVO vo = reviewService.getReviewByReviewId(reviewId);

			if (vo == null) {
				header.add("message", "review not existed");
				return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
			}

			imgService.deleteImg(vo.getReviewId());
			urlService.deleteUrlByReviewId(vo.getReviewId());
			reviewService.deleteReviewByReviewId(reviewId);
		} catch (Exception e) {
			e.printStackTrace();
			header.add("message", "review NOT deleted");
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}

		header.add("message", "review deleted");
		return new ResponseEntity<>(header, HttpStatus.OK);
	}

	/**
	 * @methodName deleteReviewByContractId
	 * @author shimjaehyuk
	 * @param String userUuid
	 * @return org.springframework.http.ResponseEntity<?>
	 * @description 해당 거래에 대한 리뷰, urls, imgs 삭제
	 **/
	@DeleteMapping("/review/all")
	public ResponseEntity<?> deleteReviewAll() {

		MultiValueMap<String, String> header = new LinkedMultiValueMap<>();

		try {
			List<ReviewVO> reviews = reviewService.getAllReview();

			if (reviews == null || reviews.size() == 0) {
				header.add("message", "review not existed");
				return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
			}

			for (ReviewVO review : reviews) {
				imgService.deleteImg(review.getReviewId());
				urlService.deleteUrlByReviewId(review.getReviewId());
			}
			reviewService.deleteReviewAll();
		} catch (Exception e) {
			e.printStackTrace();
			header.add("message", "review NOT deleted");
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}

		header.add("message", "review deleted");
		return new ResponseEntity<>(header, HttpStatus.OK);
	}
	
	/**
	 * @methodName updateReviewByReviewId
	 * @author shimjaehyuk
	 * @param Input input, String reviewId
	 * @return org.springframework.http.ResponseEntity<?>
	 * @description 해당 거래에 대한 리뷰, urls, imgs 수정
	 **/
	@PutMapping("/review")
	public ResponseEntity<?> updateReviewByReviewId(Input input, String reviewId) {

		MultiValueMap<String, String> header = new LinkedMultiValueMap<>();

		try {
			ReviewVO vo = reviewService.getReviewByReviewId(reviewId);

			if (vo == null) {
				header.add("message", "review not existed");
				return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
			}

			imgService.deleteImg(vo.getReviewId());
			urlService.deleteUrlByReviewId(vo.getReviewId());
			reviewService.deleteReviewByReviewId(reviewId);
		} catch (Exception e) {
			e.printStackTrace();
			header.add("message", "review NOT deleted");
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}

		if (reviewService.isReviewDuplicated(input) != 0) {
			header.add("message", "review already existed");
			return new ResponseEntity<>(header, HttpStatus.CONFLICT);
		}

		String targetUuid = contractService.getTargetUuid(input.getContractId());
		if(targetUuid == null) {
			header.add("message", "contract is not existed");
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}
		reviewId = UUID.randomUUID().toString();
		try {
			reviewService.insertReview(input, targetUuid, reviewId);
		} catch (Exception e) {
			e.printStackTrace();
			header.add("message", "failed to save review");
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}

		if (imgService.saveToServer(input.getImgs(), reviewId) == 0) {
			header.add("message", "failed to save img");
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}
		urlService.inserUrls(reviewId, input.getUrls());
		header.add("message", "review save successed");

		return new ResponseEntity<>(header, HttpStatus.OK);
		
	}

}
