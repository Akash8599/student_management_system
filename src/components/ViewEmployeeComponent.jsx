import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService';

export default function ViewEmployeeComponent() {
    const { id } = useParams();
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        EmployeeService.getEmployeeById(id).then((res) => {
            setEmployees(res.data);
        });
    }, []);


    const cancel = () => {
        return navigate('/employees')
    }

    return (
        <div>
            <br />
            <div className='card col-md-6 offset-md-3'>
                <h3 className='text-center text-info'>View Employee Details</h3>
                <div className='card-body'>
                    <div className='row'>
                        <label> Employee First Name: {employees.firstName}</label>
                    </div>
                    <br />
                    <div className='row'>
                        <label> Employee Last Name: {employees.lastName}</label>
                    </div>
                    <br />
                    <div className='row'>
                        <label> Employee Enmail id: {employees.emailId}</label>
                    </div>
                </div>
            </div>
            <button className='btn btn-danger ml-2' onClick={cancel} style={{ marginLeft: "35%", marginTop: "20px", width:"30%"}}>Cancel</button>
        </div>
    )
}
