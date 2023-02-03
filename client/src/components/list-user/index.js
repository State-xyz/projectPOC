import listUser from "../../data/list-user.json";
import React, { useState } from "react";

function ListUserComponent() {
  const [users] = useState(listUser);

  const listItems = users.map((user, index) => (
    <tr key={index}>
      <td>{user.name}</td>
      <td>{user.age}</td>
      <td>{user.address}</td>
      <td>{user.phone}</td>
    </tr>
  ));

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
