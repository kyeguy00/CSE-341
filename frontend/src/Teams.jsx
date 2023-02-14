import React, { useEffect, useState} from 'react'
export function Teams() {
  const [backendData, setBackendData] = useState([{}])
  
  useEffect(() => {
    fetch("/teams").then(res => {
      if(res.ok){
        return res.json()
      }
    }).then(jsonResponse => setBackendData(jsonResponse))
  },  [])
  return (
    <div>
    <div className="tableWrapper">
      <h2>Teams</h2>
      <table>
        <tr>
          <th>Team Name</th>
          <th>Team City</th>
          <th>State Name</th>
        </tr>
        {backendData.length > 0 &&
          backendData.map((e, i) => (
            <tr>
              <td>{e.teamName}</td>
              <td>{e.cityName}</td>
              <td>{e.stateName}</td>
            </tr>
          ))}
      </table>
    </div>
    </div>
  );
}
