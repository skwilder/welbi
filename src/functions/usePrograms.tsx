import { useState } from 'react';
import axios from 'axios';

export function usePrograms(token:any) {
    const [programs, setPrograms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [storeToken, setStoredToken] = useState(null)
  
    const refreshData = async () => {
      try {
        const programsResponse = await axios.get('https://welbi.org/api/programs', {
          headers: {
            Authorization: `Bearer ${storeToken || token}`,
          }
        });
  
        setPrograms(() => programsResponse.data);
        setIsLoading(false);
        storeToken || setStoredToken(token)

      } catch (error) {
        console.error(error);
      }
    };
  
    return { programs, refreshData, isLoading };
}