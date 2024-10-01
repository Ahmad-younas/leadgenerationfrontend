import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Extract the authorization code from the URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    console.log('Code:', code);

    // If the code is present, send it to the server to exchange for tokens
    if (code) {
      handleAuthorizationCode(code);
    } else {
      // Handle error or redirect to the appropriate page if no code is found
      console.error('No authorization code found.');
      navigate('/error'); // Redirect to an error page or handle accordingly
    }
  }, []);

  const handleAuthorizationCode = async (code: string) => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem('authToken'); // Replace 'yourTokenKey' with the actual key you used to store the token
      if (!token) {
        console.error('Token not found in local storage.');
        navigate('/login'); // Redirect to login or another appropriate page
        return;
      }

      // Send the authorization code to your server with the token in the headers
      const response = await axios.post(
        'http://localhost:3002/api/auth/callback',
        { code },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      // Handle the response, e.g., save tokens to local storage or show success message
      console.log('Authorization successful:', response.data);
      //navigate('/addjobs'); // Redirect to a success page or the next step in your app
    } catch (error) {
      console.error('Error handling authorization code:', error);
     // navigate('/error'); // Redirect to an error page or handle accordingly
    }
  };

  return (
    <div>
      <h1>Hello-World</h1>
    </div>
  );
};

export default Callback;
