// GoogleLoginButton.js
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = ({ onError }) => {
  const clientId = '1075659198687-7mq3rev4ttnnpuqvgp9s5rh6scv3oqd8.apps.googleusercontent.com'; // Replace with your actual client ID

  const handleSuccess = async (response) => {
    try {
      // Make an async query to get the user's email
      const emailResponse = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
        method: 'GET',
        headers: {
          accessToken: `Bearer ${response.accessToken}`,
          Accept: 'application/json'
        },
      });
      // Parse the response
      const emailData = await emailResponse.json();
      console.log(emailData)
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
