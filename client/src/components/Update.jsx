import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Update() {

    const { id } = useParams()
    const [name,setName] = useState('')
    const [address,setAddress] = useState('')
    const [age,setAge] = useState('')
    const [department,setDepartment] = useState('')
    const [status,setStatus] = useState('')
    const navigate = useNavigate()

    const getData = async () => {
        try {
            const result = await axios.get('https://employee-jnhl.onrender.com/getuser/' + id)
            setName(result.data.name)
            setAddress(result.data.address)
            setAge(result.data.age)
            setDepartment(result.data.department)
            setStatus(result.data.status)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const Updates = async (e) => {
        e.preventDefault()
        try {
            await axios.put('https://employee-jnhl.onrender.com/updateuser/' + id, {name,address,age,department,status })
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <h2>Update User</h2>
                <form onSubmit={Updates}>
                            <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" value={name} onChange={(e)=> setName(e.target.value)}/>
                            
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Address</label>
                            <input type="text" className="form-control" value={address} onChange={(e)=> setAddress(e.target.value)}/>
                            
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Age</label>
                            <input type="number" className="form-control" value={age} onChange={(e)=> setAge(e.target.value)}/>
                            
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Department</label>
                            <input type="text" className="form-control" value={department} onChange={(e)=> setDepartment(e.target.value)}/>
                            
                        </div>
                        <label className="form-label">Employee Status</label>
                        <select className="form-select" value={status} onChange={(e)=> setStatus(e.target.value)}>
                            <option selected>Select Status</option>
                            <option value="Remote Location">Remote Location</option>
                            <option value="Contract Employee">Contract Employee</option>
                            <option value="Full-Time">Full-Time</option>
                        </select>
                        <br />
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>
        </div>
    )
}

export default Update
