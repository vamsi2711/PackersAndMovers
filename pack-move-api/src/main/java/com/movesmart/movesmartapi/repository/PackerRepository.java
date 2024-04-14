package com.movesmart.movesmartapi.repository;

import com.movesmart.movesmartapi.model.Packer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public  interface PackerRepository extends JpaRepository<Packer, String> {
 Packer findByUserId(String id);
}
