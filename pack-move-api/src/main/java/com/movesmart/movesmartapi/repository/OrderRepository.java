package com.movesmart.movesmartapi.repository;

import com.movesmart.movesmartapi.model.Order;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {

  List<Order> findByPackerId(String packerId);

  List<Order> findByOrderedById(String userId);
}
