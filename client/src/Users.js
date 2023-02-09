import React, { useState } from "react";

const Users = ({ users, handleDelete }) => {
  const [sortBy, setSortBy] = useState("asc");

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // sort based on field
  const sortedUsers = users.sort((a, b) => {
    if (sortBy === "userName") {
      return a.userName.localeCompare(b.userName);
    } else if (sortBy === "firstName") {
      return a.firstName.localeCompare(b.firstName);
    } else if (sortBy === "lastName") {
      return a.lastName.localeCompare(b.lastName);
    } else {
      return a.age - b.age;
    }
  });
  //console.log(users);
  return (
    <div>
      <h1>Users</h1>
      <div>
        <label htmlFor="sort-by">Sort by:</label>
        <select id="sort-by" value={sortBy} onChange={handleSortChange}>
          <option value="userName">Username</option>
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
          <option value="age">Age</option>
        </select>
        <table>
          <tbody>
            <tr>
              <th>username</th>
              <th>first Name</th>
              <th>last Name</th>
              <th>email</th>
              <th>age</th>
              <th>delete</th>
            </tr>
          </tbody>
          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.userName}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
