import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Program } from './modules/program';
import { ResidentProvider } from './modules/resident/provider';
import { usePrograms } from './functions/usePrograms';

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenResponse = await axios.post('https://welbi.org/api/start', {
          email: 'shawnkwilder@gmail.com'
        });

        setToken(() => tokenResponse.data.data.token);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const { programs, refreshData, isLoading } = usePrograms(token);

  refreshData();

  if (isLoading) {
    return null;
  }

  return (
    <ResidentProvider token={token}>
      <div className="rotating-banner">
        <div className="rotating-banner-wrapper">
            <h1>Welcome to the react app</h1>
            <p className='main'>There are a few interactions in which a user can take to filter the list of programs, or subscribe a users.  Clicking a button on the hobby section will filter by that hobby.  Clicking the Program Name will open up the program manager window where a search box appears to register a resident to that program</p>
            <p className='main'>The user interface has gotten the least amount of love, but wanted to complete the react side first and get this into your hands.</p>
        </div>
      </div>
    
      <div className="App">
        <Program programs={programs}></Program>
      </div>
    </ResidentProvider>
  );
}

export default App;
