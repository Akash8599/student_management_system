import React, { useState, useEffect } from 'react';
import EmployeeService from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';


function ListEmployeeComponent() {
    const [employees, setEmployees] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        EmployeeService.getEmployee().then((res) => {
            setEmployees(res.data);
        });
    }, []);


    const addEmployee = () => {
        navigate("/add-employee/_add");
    };

    const editEmployee = (id) => {
        navigate(`/add-employee/${id}`);
    }

    const deleteEmployee = (id) => {
        EmployeeService.deleteEmployee(id).then((res=>{
            setEmployees(employees.filter((employee) => employee.id !== id));
        }))
    };

    const viewEmployee = (id)=>{

        navigate(`/view-employee/${id}`)
    }
    
    return (
        <div>
            <h2 className="text-center">Employee List</h2>

            <div className="row">
                <button className="btn btn-primary btn-block" style={{ width: "150px" }} onClick={addEmployee}> Add Employee</button>
            </div>
            <br></br>

            <div className='row'>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th> Employee First Name</th>
                            <th> Employee Last Name</th>
                            <th> Employee Email Id</th>
                            <th> Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            employees.map(
                                employee =>
                                    <tr key={employee.id}>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.emailId}</td>

                                        <td>
                                            <button onClick={() => editEmployee(employee.id)} className='btn btn-primary'>Update</button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => deleteEmployee(employee.id)} className="btn btn-danger" > Delete</button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => viewEmployee(employee.id)} className="btn btn-primary" > View</button>
                                        </td>
                                    </tr>

                            )
                        }
                    </tbody>
                </table>

            </div>
        </div>
    );
}


export default ListEmployeeComponent;