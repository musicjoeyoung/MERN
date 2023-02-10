import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Users from "./Users";

const App = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    password: "",
  });
  const [passwordShown, setPasswordShown] = useState(false);

  useEffect(() => {
    async function fetchData() {
      /* const res = await axios.get("http://localhost:5001/user"); */
      const res = await axios.get("https://mern.adaptable.app/user");
      setUsers(res.data);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userName, firstName, lastName, email, password } = newUser;

    /*******/
    //This block prevents the DB from being disrupted by not allowing an empty entry to be submitted.
    if (!userName || !firstName || !lastName || !email || !password) {
      alert("Entry cannot be empty. Please enter all the details.");
      return;
    }
    /*******/

    /*******/
    //This block prevents the DB from being disrupted by not allowing a duplicate email to be submitted.
    const existingUser = users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
    if (existingUser) {
      alert("That email is already in use. Please try again.");
      return;
    }
    /*******/

    try {
      await axios.post("https://mern.adaptable.app/user", newUser);
      setUsers([...users, newUser]);
      console.log("Successfully added a new user!");
      alert("Thanks for the entry!");
      setNewUser({
        userName: "",
        firstName: "",
        lastName: "",
        age: "",
        email: "",
        password: "",
      });
    } catch (err) {
      console.error(err);
      if (err.response.data.code === 11000) {
        //11000 is MongoDB error code that indicates a duplicate key error in the database
        alert("This information is already in use."); //These errors/alerts are not currently working. Why?
      } else {
        alert("That username is already in use. Please try again."); //This DOES work when a duplicate unique entry (specifically username) is entered.
      }
    }
  };

  const handleDelete = async (id) => {
    console.log("delete: ", id);
    console.log("delete URL: ", `https://mern.adaptable.app/user/${id}`);
    await axios.delete(`https://mern.adaptable.app/user/${id}`);
    setUsers(users.filter((user) => user._id !== id));
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>User Management App</h1>
        <p>
          This app is built using React on the front end, and powered by NodeJS,
          Express, and MongoDB on the back end. With this app, you can easily
          add and delete users, and order them according to different criteria,
          including username, first name, last name, and age. The user-friendly
          interface makes it easy to manage your users, and the back end ensures
          the data is securely stored and can be retrieved quickly.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="labels">
          <label>
            <input
              placeholder="user name"
              type="text"
              value={newUser.userName}
              onChange={(e) =>
                setNewUser({ ...newUser, userName: e.target.value })
              }
            />
          </label>
          <label>
            <input
              placeholder="First name"
              type="text"
              value={newUser.firstName}
              onChange={(e) =>
                setNewUser({ ...newUser, firstName: e.target.value })
              }
            />
          </label>
          <label>
            <input
              placeholder="Last name"
              type="text"
              value={newUser.lastName}
              onChange={(e) =>
                setNewUser({ ...newUser, lastName: e.target.value })
              }
            />
          </label>

          <label>
            <input
              placeholder="age (optional)"
              type="text"
              value={newUser.age}
              onChange={
                (e) =>
                  setNewUser({
                    ...newUser,
                    age: parseInt(e.target.value) || "",
                  }) //This ensures something other than a number CANNOT be entered
              }
            />
          </label>
          <label>
            <input
              placeholder="email"
              type="text"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
          </label>
          <label>
            <input
              placeholder="password"
              type={passwordShown ? "text" : "password"}
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
            <i
              className={`fas ${passwordShown ? "fa-eye-slash" : "fa-eye"}`}
              onClick={togglePassword}
            ></i>
          </label>
        </div>
        <button type="submit" className="addUserBtn">
          Add User
        </button>
      </form>
      <Users users={users} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
