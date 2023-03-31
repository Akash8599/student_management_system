import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/employees";
class EmployeeService{
  
    getEmployee(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    saveEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    getEmployeeById(id){
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + id);
    }

    updateEmployee(employee, employeeId){
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_API_BASE_URL+ "/" + employeeId);
    }
}


export default new EmployeeService()