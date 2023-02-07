import React, { useEffect, useState} from 'react'
export function Table() {
  const [backendData, setBackendData] = useState([{}])
  
  useEffect(() => {
    fetch("/players").then(res => {
      if(res.ok){
        return res.json()
      }
    }).then(jsonResponse => setBackendData(jsonResponse))
  },  [])
  return (
    <div className="tableWrapper">
      <table>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>PPG</th>
          <th>APG</th>
          <th>RPG</th>
        </tr>
        {backendData.length > 0 &&
          backendData.map((e, i) => (
            <tr>
              <td>{e.firstName}</td>
              <td>{e.lastName}</td>
              <td>{e.ppg}</td>
              <td>{e.apg}</td>
              <td>{e.rpg}</td>
            </tr>
          ))}
      </table>
    </div>
  );
}
