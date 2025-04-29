import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './ListUser.css';

export function ListUser() {
  const [users, setUsers] = useState([]);

  // Fetch users from the backend API
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios.get('http://localhost:8005/api/')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching users!", error);
      });
  };

  const handleDelete = (id) => {
    // Confirm before deleting
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`http://localhost:8005/api/${id}`)
        .then(() => {
          // Remove deleted user from the UI
          setUsers(users.filter(user => user.id !== id));
          alert('User deleted successfully!');
        })
        .catch((error) => {
          console.error("There was an error deleting the user!", error);
        });
    }
  };

  return (
    <div>
      <h2 className="list">User List</h2>
      <div className="user-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>
                  <button className="edit">Edit</button>
                  <button className="delete" onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListUser;
