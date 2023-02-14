import React, { useEffect, useState} from 'react'
export function Positions() {
  const [backendData, setBackendData] = useState([{}])
  
  useEffect(() => {
    fetch("/positions").then(res => {
      if(res.ok){
        return res.json()
      }
    }).then(jsonResponse => setBackendData(jsonResponse))
  },  [])
  return (
    <div>
    <div className="tableWrapper">
      <h2>Positions</h2>
      <table>
        <tr>
          <th>Position Name</th>
        </tr>
        {backendData.length > 0 &&
          backendData.map((e, i) => (
            <tr>
              <td>{e.positionName}</td>
            </tr>
          ))}
      </table>
    </div>
    </div>
  );
}
