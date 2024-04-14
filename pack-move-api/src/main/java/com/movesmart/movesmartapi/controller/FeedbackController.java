package com.movesmart.movesmartapi.controller;

import com.movesmart.movesmartapi.model.Feedback;
import com.movesmart.movesmartapi.repository.FeedbackRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/feedback")
public class FeedbackController {

  @Autowired
  private FeedbackRepository feedbackRepository;

  @GetMapping("/getAllFeedbacks")
  public List<Feedback> getAllFeedbacks() {
    log.info("Read request received to get all Feedbacks ");
    return feedbackRepository.findAll();
  }


  @GetMapping("/{id}")
  public Feedback getFeedback(@PathVariable String id) {
    return feedbackRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Feedback not found with id: " + id));
  }

  @GetMapping("/getByPackerId/{id}")
  public List<Feedback> getFeedbacksByPacker(@PathVariable String id) {
    List<Feedback> feedbacks = feedbackRepository.findAll();
//    return feedbacks.stream().filter(f -> f.getPacker().getId().equals(id)).toList();
    return feedbackRepository.findByPackerId(id);

  }

  @GetMapping("/getByUserId/{id}")
  public List<Feedback> getFeedbacksByUser(@PathVariable String id) {
    return feedbackRepository.findByUserId(id);

  }

  @PostMapping("")
  public Feedback createFeedback(@RequestBody Feedback feedback) {
    return feedbackRepository.save(feedback);
  }

  @PutMapping("/{id}")
  public Feedback updateFeedback(@PathVariable String id, @RequestBody Feedback feedback) {
    return feedbackRepository.findById(id)
        .map(u -> {
          u.setUser(feedback.getUser());
          u.setPacker(feedback.getPacker());
          u.setDate(feedback.getDate());
          u.setDescription(feedback.getDescription());
          u.setRating(feedback.getRating());
          return feedbackRepository.save(u);
        })
        .orElseThrow(() -> new EntityNotFoundException("Feedback not found with id: " + id));
  }

  @DeleteMapping("/{id}")
  public void deleteFeedback(@PathVariable String id) {
    feedbackRepository.deleteById(id);
  }


}
