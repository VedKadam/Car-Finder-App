import React, { useState, useEffect } from "react";
import { getAuth, deleteUser, listUsers } from "firebase/auth";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch the list of users on component mount
    const auth = getAuth();
    listUsers(auth)
      .then((userRecords) => {
        setUsers(userRecords.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleDelete = (uid) => {
    const auth = getAuth();
    deleteUser(auth, uid)
      .then(() => {
        // Update the state to remove the deleted user from the list
        setUsers(users.filter((user) => user.uid !== uid));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <div>
      <h1>Registered Users</h1>
      <table>
        <thead>
          <tr>
            <th>UID</th>
            <th>Email</th>
            <th>Display Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uid}>
              <td>{user.uid}</td>
              <td>{user.email}</td>
              <td>{user.displayName}</td>
              <td>
                <button onClick={() => handleDelete(user.uid)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
