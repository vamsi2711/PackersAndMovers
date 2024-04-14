package com.movesmart.movesmartapi.repository;

import com.movesmart.movesmartapi.model.ServiceTypes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceTypesRepository extends JpaRepository<ServiceTypes, String> {


}
