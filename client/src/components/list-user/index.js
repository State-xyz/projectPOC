import React, { useState, useEffect } from "react";

function ListUserComponent() {
  const [users, setUsers] = useState([]);

  const listItems = users.map((user, index) => (
    <tr key={index}>
      <td>{user.name}</td>
      <td>{user.age}</td>
      <td>{user.address}</td>
      <td>{user.phone}</td>
    </tr>
  ));

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:5000/users", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        try {
          const dataJson = JSON.parse(result);
          setUsers(dataJson.list);
        } catch (error) {
          console.error(error);
        }
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>age</th>
            <th>address</th>
            <th>phone</th>
          </tr>
        </thead>
        <tbody>{listItems}</tbody>
      </table>
    </div>
  );
}

export default ListUserComponent;
