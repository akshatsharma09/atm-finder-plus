import React, { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [atmList, setAtmList] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`http://localhost:5000/api/atms?query=${searchTerm}`);
    const data = await response.json();
    setAtmList(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>ATM Locator</h1>
      <input
        type="text"
        placeholder="Search by city or bank..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {atmList.length === 0 ? (
        <p>No ATMs found for "{searchTerm}"</p>
      ) : (
        <ul>
          {atmList.map((atm) => (
            <li key={atm.id}>
              <strong>{atm.name}</strong> - {atm.city} ({atm.bank})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
