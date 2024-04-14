package com.movesmart.movesmartapi.controller;

import com.movesmart.movesmartapi.model.Order;
import com.movesmart.movesmartapi.repository.OrderRepository;
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
@RequestMapping("/order")
public class OrderController {

  @Autowired
  private OrderRepository orderRepository;

  @GetMapping("/getAllOrders")
  public List<Order> getAllOrders() {
    log.info("Read request received to get all Orders ");
    return orderRepository.findAll();
  }


  @GetMapping("/{id}")
  public Order getOrder(@PathVariable String id) {
    return orderRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Order not found with id: " + id));
  }

  @GetMapping("/getByPackerId/{id}")
  public List<Order> getOrdersByPacker(@PathVariable String id) {
    return orderRepository.findByPackerId(id);

  }

  @GetMapping("/getByUserId/{id}")
  public List<Order> getOrdersByUser(@PathVariable String id) {
    return orderRepository.findByOrderedById(id);

  }

  @PostMapping("")
  public Order createOrder(@RequestBody Order order) {
    return orderRepository.save(order);
  }

  @PutMapping("/{id}")
  public Order updateOrder(@PathVariable String id, @RequestBody Order order) {
    return orderRepository.findById(id)
        .map(u -> {
          u.setOrderedBy(order.getOrderedBy());
          u.setPacker(order.getPacker());
          u.setDate(order.getDate());
          u.setStatus(order.getStatus());
          u.setPaymentStatus(order.getPaymentStatus());
          u.setQuotation(order.getQuotation());
          return orderRepository.save(u);
        })
        .orElseThrow(() -> new EntityNotFoundException("Order not found with id: " + id));
  }

  @DeleteMapping("/{id}")
  public void deleteOrder(@PathVariable String id) {
    orderRepository.deleteById(id);
  }


}
