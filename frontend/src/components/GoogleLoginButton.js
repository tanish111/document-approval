// GoogleLoginButton.js
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = ({ onError }) => {
  const clientId = 'YOUR_CLIENT_ID.apps.googleusercontent.com'; // Replace with your actual client ID

  const handleSuccess = async (response) => {
    try {
      // Make an async query to get the user's email
      const emailResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${response.accessToken}`,
        },
      });

      // Parse the response
      const emailData = await emailResponse.json();

      // Check if email exists in the response
      if (emailData && emailData.email) {
        console.log('User Email:', emailData.email);
      } else {
        console.error('Error: Unable to retrieve user email');
        onError('Error: Unable to retrieve user email');
      }
    } catch (error) {
      console.error('Error: Unable to fetch user email:', error);
      onError('Error: Unable to fetch user email');
    }
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login with Google"
      onSuccess={handleSuccess}
      onError={onError}
    />
  );
};

export default GoogleLoginButton;
