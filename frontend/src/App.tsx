import React, { useState, useEffect } from 'react';
import './App.css';

const API_BASE_URL = import.meta.env.VITE_API_TARGET || '';

function App() {
  const [token, setToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  const handleConnect = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/items/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setItems(data);
        setIsAuthenticated(true);
        setError('');
      } else {
        setError(`HTTP ${response.status}`);
      }
    } catch (err) {
      setError('Connection failed');
    }
  };

  const handleDisconnect = () => {
    setIsAuthenticated(false);
    setToken('');
    setItems([]);
  };

  if (!isAuthenticated) {
    return (
      <div className="app">
        <h1>API Token</h1>
        <div className="token-input">
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter your API token"
          />
          <button onClick={handleConnect}>Connect</button>
        </div>
        {error && <div className="error">{error}</div>}
      </div>
    );
  }

  return (
    <div className="app">
      <div className="header">
        <h1>Items 📚</h1>
        <button onClick={handleDisconnect}>Disconnect</button>
      </div>
      {error && <div className="error">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item: any) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;