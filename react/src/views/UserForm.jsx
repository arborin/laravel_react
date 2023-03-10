import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axios-client'

export default function UserForm() {
    const { id } = useParams()
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: ''
    })


    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault();
        axiosClient.put(`/users/${user.id}`, user).then(() => {
            navigate('/users');
        });

    }

    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/api/users/${id}`)
                .then(({ data }) => {
                    console.log(data.id)
                    setLoading(false)
                    setUser(data)
                })
        }, []);
    }
    return (
        <div>
            {user.id && <h1>Update user: {user.name}</h1>}


            {!user.id && (<h1>New User:</h1>)}



            <div className='card animated fadeInDown'>
                {loading && (<div className='text-center'>Loading...</div>)}


                {!loading &&
                    <form onSubmit={onSubmit}>
                        <input placeholder='Name' value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} />
                        <input placeholder='Email' value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} />
                        <input placeholder='Password' />
                        <button type='submit' className='btn-save'>save</button>
                    </form>}
            </div>




        </div>
    )
}
