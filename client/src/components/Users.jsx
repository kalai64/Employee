import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Users() {

    const [users, setUsers] = useState([])

    const getData = async () => {
        try {
            const result = await axios.get('https://employee-jnhl.onrender.com/users')
            setUsers(result.data)
        } catch (error) {
            console.log(error)
        }
    }
        
        useEffect(() => {
            getData()
        }, [])
        
        const handleDelete = async (id) => {
            try {
                await axios.delete('https://employee-jnhl.onrender.com/deleteuser/' + id)
                window.location.reload()
            } catch (error) {
                console.log(error)
            }
        }
        
        return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <h2>Employee Details</h2>
                <br />
                <Link to={'/create'} className='btn btn-primary'>+Add Empolyee</Link>
                <table className="table">
                    <thead>
                        <tr>
                        
                        <th scope="col">Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Age</th>
                        <th scope="col">Department</th>
                        <th scope="col">Status</th>
                        <th scope="col">Date & Time</th>
                        <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((e, i) => (
                            <tr key={i}>
                                
                                <td>{e.name}</td>
                                <td>{e.address}</td>
                                <td>{e.age}</td>
                                <td>{e.department}</td>
                                <td>{e.status}</td>
                                <td>{e.date}</td>
                                <td>
                                    <Link to={`/update/${e._id}`} className='btn btn-primary'>Update</Link>
                                    <button className='btn btn-danger' onClick={() => handleDelete(e._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users
