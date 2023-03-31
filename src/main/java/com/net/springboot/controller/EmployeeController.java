package com.net.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import com.net.springboot.exception.ResourceNotFoundException;
import com.net.springboot.model.Employee;
import org.apache.juli.logging.Log;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.net.springboot.repository.EmployeeRepository;
;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

    private static final Logger LOGGER = LoggerFactory.getLogger(EmployeeController.class);
    @Autowired
    private EmployeeRepository employeeRepository;

    // get all employees
    @GetMapping("/employees")
    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    @PostMapping("/employees")
    public Employee createEmployee(@RequestBody Employee employee){
        LOGGER.info("Storing resource with this details : fistName : {}, last_Name : {}, emailId : {}",
                employee.getFirstName(), employee.getLastName(), employee.getEmailId());
        return employeeRepository.save(employee);
    }


    @GetMapping("employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id){
        LOGGER.info("Fetching employee details with this id : {}", id);
       Employee employee =  employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource is not availbe for this id" + id));
        return ResponseEntity.ok(employee);
    }

    @PutMapping("employees/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails){
        Employee employee =  employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource is not available for this id" + id));

        LOGGER.info("Resource is found for this Id : {} and details are {}", id, employee);

        if (Objects.nonNull(employeeDetails.getFirstName())) {
            employee.setFirstName(employeeDetails.getFirstName());
        }
        if (Objects.nonNull(employeeDetails.getLastName())) {
            employee.setLastName(employeeDetails.getLastName());
        }
        if (Objects.nonNull(employeeDetails.getEmailId())) {
            employee.setEmailId(employeeDetails.getEmailId());
        }

        Employee updatedEmployee = employeeRepository.save(employee);

        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping("employees/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployeeById(@PathVariable Long id){

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));

        employeeRepository.delete((employee));
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);

    }
}
