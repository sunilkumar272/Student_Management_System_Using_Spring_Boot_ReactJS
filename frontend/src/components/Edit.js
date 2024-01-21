import React from 'react';
import { useState,useEffect } from 'react';
import {useNavigate,useParams} from "react-router-dom";
import StudentService from "../Services/StudentService";

export default function Edit() {
    const {id}=useParams();
    const [data,setData]=useState([])
    const navigate=useNavigate()
    useEffect(()=>{
        StudentService.getStudentById(id)
        .then(res=> setData(res.data))
        .catch(err=>console.log(err))
    },[])
    function handleSubmit(event){
        event.preventDefault()
        StudentService.updateStudent(data,id)
        .then(res=>{
            alert("data updated successfully!");
            navigate('/')
        })
    }
  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-light p-5">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">ID:</label>
            <input type="text" disabled name="name" value={data.id} className="form-control"
            />
          </div>
          <div>
            <label htmlFor="First Name">First Name:</label>
            <input type="text" name="First Name" value={data.firstName} className="form-control"
            onChange={(e) => setData({ ...data, "firstName": e.target.value })}/>
          </div>
          <div>
            <label htmlFor="Last Name">Last Name:</label>
            <input type="text" name="Last Name" value={data.lastName} className="form-control"
            onChange={(e) => setData({ ...data, "lastName": e.target.value })}/>
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" value={data.emailId} className="form-control"
            onChange={(e) => setData({ ...data, emailId: e.target.value })}/>
          </div>
          <br />
          <button className="btn btn-info">Submit</button>
        </form>
      </div>
    </div>
  )
}
