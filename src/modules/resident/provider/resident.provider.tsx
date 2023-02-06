import { createContext, useContext, useState, useEffect } from "react"
import axios from 'axios';
import { ResidentModel } from "../model";

interface IThemeContext {
    residents?: ResidentModel[];
    subscribe?: Function
}

const ResidentContext = createContext<IThemeContext>({})

export const ResidentProvider = ({ token, children }: any) => {
    const [residents, setResidents] = useState([]);

    const subscribeResidentToProgram = async ({programId, residentId} : {programId: string, residentId: string}) => {
        try {
            const programsResponse = await axios.post(`https://welbi.org/api/programs/${programId}/attend`,{
                residentId,
                status: 'Active',
            },{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

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
        residents,
        subscribe: subscribeResidentToProgram,
    }}>
        {children}
    </ResidentContext.Provider>
}

export const useResidents = () => useContext(ResidentContext);
