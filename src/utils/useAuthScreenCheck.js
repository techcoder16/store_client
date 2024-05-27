import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import env from 'react-dotenv';

const useAuthScreenCheck = (user_id, screen_name) => {
  const [checkRights, setCheckRights] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = { user_id: user_id, screen_name: screen_name };

        const queryString = encodeURIComponent(JSON.stringify(payload));

        const response = await axios.get(`${env.API_URL}screen/auth_screen_check`, {
          params: payload,
        });

        setCheckRights(response.data);
        
        if (!response.data || response.data === false) {
          navigate('/screen_rights');
          
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user_id, screen_name, navigate]);

  return checkRights;
};

export default useAuthScreenCheck;
