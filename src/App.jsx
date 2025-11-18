import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Login from './pages/Login/login';

function App() {
  const [token, setToken] = useState(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (!token) return;
    axios
      .get('http://localhost:3000/notes', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setNotes(res.data))
      .catch(console.error);
  }, [token]);

  if (!token) {
    return <Login onLogin={setToken} />;
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(n => (
          <li key={n.id}>{n.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
