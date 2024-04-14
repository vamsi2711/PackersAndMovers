package com.movesmart.movesmartapi.repository;


import com.movesmart.movesmartapi.model.Quotation;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuotationRepository extends JpaRepository<Quotation, String> {
 List<Quotation> findByPackerId(String packerId);
 List<Quotation> findByQuotedById(String userId);
}
