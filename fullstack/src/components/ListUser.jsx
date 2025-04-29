import React, { useState, useEffect } from "react";
import axios from "axios";
import './ListUser.css';

export function ListUser() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editInputs, setEditInputs] = useState({
    name: '',
    email: '',
    mobile: ''
  });

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
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`http://localhost:8005/api/${id}`)
        .then(() => {
          setUsers(users.filter(user => user.id !== id));
          alert('User deleted successfully!');
        })
        .catch((error) => {
          console.error("There was an error deleting the user!", error);
        });
    }
  };

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setEditInputs({
      name: user.name,
      email: user.email,
      mobile: user.mobile
    });
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditInputs((values) => ({
      ...values,
      [name]: value
    }));
  };

  const handleEditSubmit = (id) => {
    axios.put(`http://localhost:8005/api/${id}`, editInputs)
      .then(() => {
        alert('User updated successfully!');
        setEditingUserId(null);
        getUsers();
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        alert('Failed to update user.');
      });
  };

  return (
    <div className="user-list-container">
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
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user) => (
                <React.Fragment key={user.id}>
                  <tr>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.mobile}</td>
                    <td>
                      <button className="edit" onClick={() => handleEditClick(user)}>Edit</button>
                      <button className="delete" onClick={() => handleDelete(user.id)}>Delete</button>
                    </td>
                  </tr>

                  {editingUserId === user.id && (
                    <tr>
                      <td colSpan="5">
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleEditSubmit(user.id);
                          }}
                          className="edit-form"
                        >
                          <input
                            type="text"
                            name="name"
                            value={editInputs.name}
                            onChange={handleEditChange}
                            required
                          />
                          <input
                            type="email"
                            name="email"
                            value={editInputs.email}
                            onChange={handleEditChange}
                            required
                          />
                          <input
                            type="tel"
                            name="mobile"
                            value={editInputs.mobile}
                            onChange={handleEditChange}
                            required
                          />
                          <button type="submit" className="save">Save</button>
                          <button type="button" className="cancel" onClick={() => setEditingUserId(null)}>
                            Cancel
                          </button>
                        </form>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="5">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListUser;
