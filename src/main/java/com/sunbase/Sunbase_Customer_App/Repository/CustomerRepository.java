package com.sunbase.Sunbase_Customer_App.Repository;

import com.sunbase.Sunbase_Customer_App.Entities.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
public interface CustomerRepository extends JpaRepository<Customer,Long> {
    Page<Customer>findAllByFirstNameContainingOrLastNameContaining(String firstName, String lastName, Pageable pageable);
}
