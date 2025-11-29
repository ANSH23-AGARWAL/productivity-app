import React, { useState } from 'react';
import {
  Container,
  Title,
  SubTitle,
  AccountBox,
  EmailText,
  NameText,
  AddAccount,
  LogoutButton,
  Avatar,
  AccountList,
} from './style';
import { GoogleOAuthProvider, googleLogout, useGoogleLogin } from '@react-oauth/google';

// Replace this with your actual client ID
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID_HERE';

const SwitchAccount = () => {
  const [accounts, setAccounts] = useState([
    { name: 'rahul saini', email: 'r290602s@gmail.com' }
  ]);
  const [currentAccount, setCurrentAccount] = useState(accounts[0]);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        const data = await res.json();
        const { name, email } = data;

        const newAccount = { name, email };
        setAccounts((prev) => [...prev, newAccount]);
        setCurrentAccount(newAccount);
      } catch (err) {
        console.error('Failed to fetch user info:', err);
      }
    },
    onError: (errorResponse) => {
      console.error('Login Failed:', errorResponse);
    },
  });

  const handleLogout = () => {
    if (currentAccount) {
      googleLogout();
      alert(`${currentAccount.name} logged out`);
      setCurrentAccount(null);
    }
  };

  const handleSwitchAccount = (acc) => {
    setCurrentAccount(acc);
  };

  return (
    <Container>
      <Title>BoardWise</Title>
      <SubTitle>Choose or add another account</SubTitle>

      {currentAccount ? (
        <AccountBox>
          <Avatar>{currentAccount.name[0].toUpperCase()}</Avatar>
          <div>
            <NameText>{currentAccount.name}</NameText>
            <EmailText>{currentAccount.email}</EmailText>
          </div>
        </AccountBox>
      ) : (
        <SubTitle>No user logged in</SubTitle>
      )}

      <AccountList>
        {accounts.map((acc, idx) => (
          acc.email !== currentAccount?.email && (
            <AccountBox key={idx} onClick={() => handleSwitchAccount(acc)}>
              <Avatar>{acc.name[0].toUpperCase()}</Avatar>
              <div>
                <NameText>{acc.name}</NameText>
                <EmailText>{acc.email}</EmailText>
              </div>
            </AccountBox>
          )
        ))}
      </AccountList>

      <AddAccount onClick={handleGoogleLogin}>➕ Add another account </AddAccount>
      <LogoutButton onClick={handleLogout}>Log out</LogoutButton>
    </Container>
  );
};

export default function WrappedSwitchAccount() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <SwitchAccount />
    </GoogleOAuthProvider>
  );
}
