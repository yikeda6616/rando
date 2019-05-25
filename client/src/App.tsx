import React, { useState } from 'react';
import axios from 'axios';

import './App.css';

const App: React.FC = () => {
  // Declare a new state variable, which we'll call "password"
  const [passwords, setPasswords] = useState([]);

  async function getPasswords() {
    const res = await axios.get('/api/passwords');
    setPasswords(res.data);
  }

  return (
    <div className='App'>
      {/* Render the passwords if we have them */}
      {passwords.length ? (
        <div>
          <h1>5 Passwords.</h1>
          <ul className='passwords'>
            {passwords.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <button className='more' onClick={() => getPasswords()}>
            Get More
          </button>
        </div>
      ) : (
        <div>
          <h1>No passwords :(</h1>
          <button className='more' onClick={() => getPasswords()}>
            Generate Passwords
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
