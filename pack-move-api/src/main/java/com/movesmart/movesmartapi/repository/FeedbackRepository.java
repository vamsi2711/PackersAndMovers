package com.movesmart.movesmartapi.repository;

import com.movesmart.movesmartapi.model.Feedback;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, String> {
  List<Feedback> findByPackerId(String packerId);
  List<Feedback> findByUserId(String userId);
}