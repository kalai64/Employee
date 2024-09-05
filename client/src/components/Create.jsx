import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Create() {

    const [name,setName] = useState('')
    const [address,setAddress] = useState('')
    const [age,setAge] = useState('')
    const [department,setDepartment] = useState('')
    const [status,setStatus] = useState('')
    const navigate = useNavigate()

    const Submit = async(e)=>{
        e.preventDefault()
        try {
            await axios.post('http://localhost:8000/create',{name,address,age,department,status})
            .then(result => navigate('/'))
            
        } catch (error) {
            console.log(error)
            
        }
    }

  return <>
  <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
    <div className='w-50 bg-white rounded p-3'>
    <h2>Enter Employee Details</h2>

        <form onSubmit={Submit}> 
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" onChange={(e)=> setName(e.target.value)}/>
                
            </div>
            <div className="mb-3">
                <label className="form-label">Address</label>
                <input type="text" className="form-control" onChange={(e)=> setAddress(e.target.value)}/>
                
            </div>
            <div className="mb-3">
                <label className="form-label">Age</label>
                <input type="number" className="form-control" onChange={(e)=> setAge(e.target.value)}/>
                
            </div>
            <div className="mb-3">
                <label className="form-label">Department</label>
                <input type="text" className="form-control" onChange={(e)=> setDepartment(e.target.value)}/>
                
            </div>
            <label className="form-label">Employee Status</label>
            <select className="form-select" onChange={(e)=> setStatus(e.target.value)}>
                <option>Select Status</option>
                <option value="Remote Location">Remote Location</option>
                <option value="Contract Employee">Contract Employee</option>
                <option value="Full-Time">Full-Time</option>
            </select>
            <br />
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  </div>
  </>
}

export default Create