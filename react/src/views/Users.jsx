import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";

export default function Users() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);


    const getUsers = () => {
        console.log("GET USERS RUN")
        setLoading(true);
        axiosClient.get('/users')
            .then(({ data }) => {
                setLoading(false);
                console.log(data.data);
                setUsers(data.data)
            })
            .catch(() => {
                setLoading(false)
            })
    }

    const onDelete = (user) => {
        if (!window.confirm("Delete?")) {
            return
        }

        axiosClient.delete(`/users/${user.id}`)
            .then(() => {
                // TODO show notification
                getUsers();
            })
    }


    return <div>
        <div><h1>User list</h1></div>
        <Link to='/users/new' className="btn-add">Add New User</Link>

        <div className="card animated fadeInDown">
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>email</th>
                        <th>create date</th>
                        <th>action</th>
                    </tr>
                </thead>
                {
                    loading && <tbody>
                        <tr>
                            <td colSpan={5} className='text-center'>Loading...</td>
                        </tr>
                    </tbody>
                }

                {!loading && <tbody>
                    {users.map((user) => {
                        return (<tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.created_at}</td>
                            <td>
                                <Link to={'/users/' + user.id} className="btn-edit">Edit</Link>
                                &nbsp;
                                <Link to='' onClick={ev => onDelete(user)} className="btn-delete">Delate</Link>
                            </td>
                        </tr>)
                    })}

                </tbody>
                }
            </table>
        </div>
    </div>;
}
