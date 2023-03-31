import React, { Component, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';


const CreateEmployeeComponent = () => {


    const navigate = useNavigate();
    const { id } = useParams();


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');


    const changeFirstNameHandler = (event) => {
        setFirstName(event.target.value);
    }

    const changeLastNameHandler = (event) => {
        setLastName(event.target.value);
    }

    const changeEmailIdHandler = (event) => {
        setEmailId(event.target.value);
    }
    
    useEffect(() => {
        if (id !== '_add') {
            EmployeeService.getEmployeeById(id).then((res) => {
                const employee = res.data;
                setFirstName(employee.firstName);
                setLastName(employee.lastName);
                setEmailId(employee.emailId);
            });
        }
    }, [id]);

    const saveOrUpdateEmployee = (event) => {
        event.preventDefault();
        let employee = { firstName, lastName, emailId }
        console.log('employee => ' + JSON.stringify(employee));

        if (id === '_add') {
            EmployeeService.saveEmployee(employee).then((res =>
                navigate('/employees')));
        }
        else {
            EmployeeService.updateEmployee(employee, id).then(res => {
                navigate("/employees");
            })
        }

    }

    const cancel = () => {
        return navigate('/employees')
    }

    const addTitle = () => {
        if (id === "_add") {
            return <h1 className="text-center">Add Employee</h1>
        }
        else {
            return <h1 className="text-center">Update Employee</h1>
        }
    }

    return (
        <div className='container'>
            <br />
            <div className="row">
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {addTitle()}
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label className='text-primary'>First Name:</label>
                                <input placeholder='First Name' name='FirstName' className='form-control'
                                    value={firstName} onChange={changeFirstNameHandler} />
                            </div>
                            <div className="form-group">
                                <label className='text-primary'>Last Name:</label>
                                <input placeholder='Last Name' name='LastName' className='form-control'
                                    value={lastName} onChange={changeLastNameHandler} />
                            </div>
                            <div className="form-group">
                                <label className='text-primary'>Email Id:</label>
                                <input placeholder='EmailId' name='EmailId' className='form-control'
                                    value={emailId} onChange={changeEmailIdHandler} />
                            </div>

                            <button className='btn btn-success' onClick={saveOrUpdateEmployee} style={{ marginTop: "5px" }}>Save</button>
                            <button className='btn btn-danger ml-2' onClick={cancel} style={{ marginLeft: "10px", marginTop: "5px" }}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateEmployeeComponent
