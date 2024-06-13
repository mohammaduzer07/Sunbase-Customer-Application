package com.sunbase.Sunbase_Customer_App.Controllers;

import com.sunbase.Sunbase_Customer_App.Entities.Customer;
import com.sunbase.Sunbase_Customer_App.Services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    @Autowired
    private CustomerService customerService;
        //Save customer in the Database
    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer) {
        return customerService.saveCustomer(customer);
    }
    //update the customer details
    @PutMapping("/{id}")
    public Customer updateCustomer(@PathVariable Long id, @RequestBody
    Customer customer) {
        return customerService.updateCustomer(id, customer);
    }

    // get all the list of customers
    @GetMapping
    public Page<Customer> getAllCustomers(@RequestParam
                                          Optional<String> search,
                                          @RequestParam
                                          Optional<Integer> page,
                                          @RequestParam
                                          Optional<Integer> size) {
        Pageable pageable = PageRequest.of(page.orElse(0),
                size.orElse(10));
        return customerService.getCustomers(pageable,
                search.orElse(""));
    }

    // get the customer by id from the database
    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable Long id) {
        return customerService.getCustomerById(id).orElseThrow(() ->
                new RuntimeException("Customer not found"));
    }
    // delete the customer from the database
    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
    }
}

