import React, { useEffect, useState } from "react";
import {Link,useNavigate} from "react-router-dom";
import './App.css';
import StudentService from "./Services/StudentService";

export default function App() {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const navigate=useNavigate()
  useEffect(() => {
    StudentService.getStudents().then((res) => {
      setColumns(Object.keys(res.data[0]));
      setRecords(res.data);
    })
  },[])
  return (
    <div className="container mt-5">
      <div className="text-start text-margin"><Link to="/create" className="btn btn-primary">Add Student</Link></div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              {columns.map((c, i) => (
                <th key={i}>{c}</th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((d, i) => (
              <tr key={i}>
                <td>{d.id}</td>
                <td>{d.firstName}</td>
                <td>{d.lastName}</td>
                <td>{d.emailId}</td>
                <td>
                  <Link to={`/update/${d.id}`} className="btn btn-sm ms-1 btn-success">Update</Link>
                  <button onClick={e=> handleSubmit(d.id)} className="btn btn-sm ms-1 btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
  function handleSubmit(id){
    const conf=window.confirm("Do you want to delete");
    if(conf){
      
      StudentService.deleteStudent(id).then(res=>{
        alert('record has been deleted')
        navigate('/')
      }).catch(err=>console.log(err))
    }
  }
}
