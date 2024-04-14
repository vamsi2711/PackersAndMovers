package com.movesmart.movesmartapi.controller;

import com.movesmart.movesmartapi.model.Quotation;
import com.movesmart.movesmartapi.repository.QuotationRepository;
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
@RequestMapping("/quotation")
public class QuotationController {

  @Autowired
  private QuotationRepository quotationRepository;

  @GetMapping("/getAllQuotations")
  public List<Quotation> getPackers() {
    log.info("Read request received to get all Quotations ");
    return quotationRepository.findAll();
  }

  @GetMapping("/getByPackerId/{id}")
  public List<Quotation> getOrdersByPacker(@PathVariable String id) {
    return quotationRepository.findByPackerId(id);

  }

  @GetMapping("/getByUserId/{id}")
  public List<Quotation> getOrdersByUser(@PathVariable String id) {
    return quotationRepository.findByQuotedById(id);
  }

  @GetMapping("/{id}")
  public Quotation getQuotation(@PathVariable String id) {
    return quotationRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Quotation not found with id: " + id));
  }


  @PostMapping("")
  public Quotation createQuotation(@RequestBody Quotation quotation) {
    return quotationRepository.save(quotation);
  }

  @PutMapping("/{id}")
  public Quotation updateQuotation(@PathVariable String id, @RequestBody Quotation quotation) {
    return quotationRepository.findById(id)
        .map(u -> {
          u.setQuotedBy(quotation.getQuotedBy());
          u.setPacker(quotation.getPacker());
          u.setServiceType(quotation.getServiceType());
          u.setDate(quotation.getDate());
          u.setDescription(quotation.getDescription());
          u.setComments(quotation.getComments());
          u.setAmount(quotation.getAmount());
          u.setStatus(quotation.getStatus());
          return quotationRepository.save(u);
        })
        .orElseThrow(() -> new EntityNotFoundException("Quotation not found with id: " + id));
  }

  @DeleteMapping("/{id}")
  public void deleteQuotation(@PathVariable String id) {
    quotationRepository.deleteById(id);
  }

}
