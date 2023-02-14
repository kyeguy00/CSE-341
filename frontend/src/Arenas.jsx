import React, { useEffect, useState} from 'react'
export function Arenas() {
  const [backendData, setBackendData] = useState([{}])
  
  useEffect(() => {
    fetch("/arenas").then(res => {
      if(res.ok){
        return res.json()
      }
    }).then(jsonResponse => setBackendData(jsonResponse))
  },  [])
  return (
    <div>
    <div className="tableWrapper">
      <h2>Arenas</h2>
      <table>
        <tr>
          <th>Arena Name</th>
          <th>Arena City</th>
          <th>Arena Team</th>
        </tr>
        {backendData.length > 0 &&
          backendData.map((e, i) => (
            <tr>
              <td>{e.arenaName}</td>
              <td>{e.arenaCity}</td>
              <td>{e.arenaTeam}</td>
            </tr>
          ))}
      </table>
    </div>
    </div>
  );
}
