import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

export default function UpdateEmployee() {
    const navigate = useNavigate();
    const { id } = useParams();


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');


    useEffect (() =>{
        EmployeeService.getEmployeeById(id).then((res)=>{

            let employee = res.data;
            setFirstName(employee.firstName);
            setLastName(employee.lastName);
            setEmailId(employee.emailId);
        })
    }, [id])



    

    const UpdateEmployee = (event) => {
        event.preventDefault();
        let employee = { firstName, lastName, emailId }
        console.log('employee => ' + JSON.stringify(employee));
        console.log('id => ' + JSON.stringify(id));
        EmployeeService.updateEmployee( employee, id).then(res=>{
            navigate("/employees");
        })

    }

    const cancel = () => {
        return navigate('/employees')
    }

    return (
        <div className='container'>
            <br />
            <div className="row">
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h1 className="text-center">Update Employee</h1>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label>First Name:</label>
                                <input placeholder='First Name' name='FirstName' className='form-control'
                                    value={firstName} onChange={(event)=> setFirstName(event.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Last Name:</label>
                                <input placeholder='Last Name' name='LastName' className='form-control'
                                    value={lastName} onChange={(event) => setLastName(event.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Email Id</label>
                                <input placeholder='EmailId' name='EmailId' className='form-control'
                                    value={emailId} onChange={(event) => setEmailId(event.target.value)} />
                            </div>

                            <button className='btn btn-success' onClick={UpdateEmployee} style={{ marginTop: "5px" }}>Update</button>
                            <button className='btn btn-danger ml-2' onClick={cancel} style={{ marginLeft: "10px", marginTop: "5px" }}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
