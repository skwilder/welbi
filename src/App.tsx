import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Program } from './modules/program';

function App() {
  const [residents, setResidents] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchData = async () => {    
      try {
        const tokenResponse = await axios.post('https://welbi.org/api/start', {
          email: 'shawnkwilder@gmail.com'
        });

        // TODO: Figure out why this data.data
        setToken(tokenResponse.data.data.token);
        
        // TODO : Figure out why I cannot use ${token} here
        const residentsResponse = await axios.get('https://welbi.org/api/residents', {
          headers: {
            Authorization: `Bearer ${tokenResponse.data.data.token}`,
          }
        });

        setResidents(residentsResponse.data);
        
        const programsResponse = await axios.get('https://welbi.org/api/programs', {
          headers: {
            Authorization: `Bearer ${tokenResponse.data.data.token}`,
          }
        });

        setPrograms(programsResponse.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log(residents);
  console.log(programs);

  const newPrograms = programs.filter((tes: any) => tes.hobbies.length > 0)

  return (
    <div className="App">
      <Program programs={newPrograms}></Program>
    </div>
  );
}

export default App;
