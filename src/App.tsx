import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { Resident } from './modules/resident/resident.component';
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

  const sampleResident = {
    "id": "1",
    "name": "Jeff Winger"
  }

  console.log(programs);


  const sampleProgram = {
    "id": "214",
    "name": "Dungeons & Dragons",
    "location": "Group Study Room F",
    "allDay": false,
    "start": "2011-02-03T19:00:00.000Z",
    "end": "2011-02-03T20:00:00.000Z",
    "tags": [
        "special"
    ],
    "attendance": [
        {
            "status": "Passive",
            "residentId": "1",
            "author": "06989129-130e-44ac-8bb1-27ec0f809098"
        },
        {
            "status": "Declined",
            "residentId": "2",
            "author": "06989129-130e-44ac-8bb1-27ec0f809098"
        },
        {
            "status": "Passive",
            "residentId": "3",
            "author": "06989129-130e-44ac-8bb1-27ec0f809098"
        },
        {
            "status": "Active",
            "residentId": "4",
            "author": "06989129-130e-44ac-8bb1-27ec0f809098"
        },
        {
            "residentId": "5",
            "status": "Active"
        },
        {
            "residentId": "6",
            "status": "Active"
        },
        {
            "residentId": "7",
            "status": "Active"
        },
        {
            "residentId": "8",
            "status": "Passive"
        },
        {
            "status": "Declined",
            "residentId": "14",
            "author": "06989129-130e-44ac-8bb1-27ec0f809098"
        }
    ],
    "dimension": "Social",
    "facilitators": [
        "Resident"
    ],
    "levelOfCare": [
        "INDEPENDENT",
        "ASSISTED"
    ],
    "hobbies": [
        "Role Playing",
        "Board Games",
        "Storytelling"
    ],
    "isRepeated": false
}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Program data={sampleProgram}></Program>
      <Resident data={sampleResident}></Resident>
    </div>
  );
}

export default App;
