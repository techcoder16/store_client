import { useEffect, useState } from 'react';
import countriesData from './countries.json';

const useCountries = () => {
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        setCountries(countriesData);
    
      } catch (error) {
        console.error('Error setting data:', error);
      }
    };

    fetchData();
  }, []);
  
  return countries;
};

export default useCountries;
