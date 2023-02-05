import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Program } from './modules/program';
import { ResidentProvider } from './modules/resident/provider';

function App() {
  const [programs, setPrograms] = useState([]);
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {    
      try {
        const tokenResponse = await axios.post('https://welbi.org/api/start', {
          email: 'shawnkwilder@gmail.com'
        });

        setToken(() => tokenResponse.data.data.token);
        
        const programsResponse = await axios.get('https://welbi.org/api/programs', {
          headers: {
            Authorization: `Bearer ${tokenResponse.data.data.token}`,
          }
        });

        setPrograms(() => programsResponse.data);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <ResidentProvider token={token}>
      <div className="App">
        <Program programs={programs}></Program>
      </div>
    </ResidentProvider>
  );
}

export default App;
