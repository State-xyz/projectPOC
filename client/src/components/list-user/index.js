import React, { useState, useEffect } from "react";

function ListUserComponent() {
  const [users, setUsers] = useState([]);
  const [columns, setColumns] = useState([]);

  function buildDataTable(data) {
    const firstUser = data[0];
    let listColumns = [];
    Object.keys(firstUser).forEach((key) => {
      listColumns.push({
        title: key,
        dataIndex: key,
      });
    });
    return listColumns;
  }
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://isb79xn7e5.execute-api.us-west-2.amazonaws.com/prod/", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        try {
          const dataJson = JSON.parse(result);
          setUsers(dataJson.list);
          const c = buildDataTable(dataJson.list);
          setColumns(c);
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
            {columns.map((c, index) => {
              return <th key={index}>{c.title}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {users.map((user, indexUser) => {
            return (
              <tr key={indexUser}>
                {columns.map((c, indexC) => {
                  return <td key={indexC}>{user[`${c.dataIndex}`]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ListUserComponent;
