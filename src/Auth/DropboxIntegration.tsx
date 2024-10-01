import React from 'react';
import axios from 'axios';

const DropboxIntegration: React.FC = () => {
  // Function to initiate the Dropbox OAuth flow
  const initiateDropboxAuth = async () => {
    console.log("HelloWorld");
    try {
      // Fetch the Dropbox authentication URL from the backend using Axios
      const response = await axios.get('http://localhost:3002/api/dropbox/auth-url');
      console.log("Response", response.data);

      // Redirect the user to the Dropbox authorization page
      window.location.href = response.data.url; // This triggers the OAuth flow
    } catch (error) {
      console.error('Error fetching Dropbox Auth URL:', error);
    }
  };

  return (
    <div>
      <button onClick={initiateDropboxAuth}>Authenticate with Dropbox</button>
    </div>
  );
};

export default DropboxIntegration;
