import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import StudentService from "../Services/StudentService";

export default function Add() {
  const [inputData, setInputData] = useState({ firstName: "",lastName: "" ,emailId: "" });

  const navigat=useNavigate();

  function handleSubmit(event){
    event.preventDefault()

    StudentService.createStudent(inputData)
    .then(res=>{
        alert("Student details Added Successfully!")
        navigat('/');
    }).catch(err=> console.log(err))
  }
  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-light p-5">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="First Name">First Name:</label>
            <input type="text" name="First Name" className="form-control"
              onChange={(e) => setInputData({ ...inputData, "firstName": e.target.value })}/>
          </div>
          <div>
            <label htmlFor="Last Name">Last Name:</label>
            <input type="text" name="Last Name" className="form-control"
              onChange={(e) => setInputData({ ...inputData, "lastName": e.target.value })}/>
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" className="form-control"
              onChange={(e) =>setInputData({ ...inputData, emailId: e.target.value })}/>
          </div>
          <br />
          <button className="btn btn-info">Submit</button>
        </form>
      </div>
    </div>
  );
}
