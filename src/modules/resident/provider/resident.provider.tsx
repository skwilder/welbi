import { createContext, useContext, useState, useEffect } from "react"
import axios from 'axios';
import { ResidentModel } from "../model";

interface IThemeContext {
    residents?: ResidentModel[];
}

const ResidentContext = createContext<IThemeContext>({})

export const ResidentProvider = ({ token, children }: any) => {
    const [residents, setResidents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {    
          try {
            const residentsResponse = await axios.get('https://welbi.org/api/residents', {
              headers: {
                Authorization: `Bearer ${token}`,
              }
            });
    
            setResidents(residentsResponse.data);

          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();    
      }, []);
        
    return <ResidentContext.Provider value={{
            residents
        }}>
        {children}
    </ResidentContext.Provider>
}

export const useResidents = () => useContext(ResidentContext);
