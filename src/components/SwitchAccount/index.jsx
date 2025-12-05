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
  ModalOverlay,
  ModalContent,
  ModalHeader,
  InputGroup,
  ModalButtons
} from './style';
import { GoogleOAuthProvider, googleLogout, useGoogleLogin } from '@react-oauth/google';
import { X } from 'lucide-react';

// Replace this with your actual client ID
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID_HERE';

const SwitchAccount = () => {
  const [accounts, setAccounts] = useState([
    { name: 'rahul saini', email: 'r290602s@gmail.com' }
  ]);
  const [currentAccount, setCurrentAccount] = useState(accounts[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');

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

  const handleManualAdd = () => {
    if (newName && newEmail) {
      const newAccount = { name: newName, email: newEmail };
      setAccounts((prev) => [...prev, newAccount]);
      setCurrentAccount(newAccount);
      setIsModalOpen(false);
      setNewName('');
      setNewEmail('');
    } else {
      alert("Please fill in all fields");
    }
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

      <AddAccount onClick={() => setIsModalOpen(true)}>➕ Add another account </AddAccount>
      <LogoutButton onClick={handleLogout}>Log out</LogoutButton>

      {isModalOpen && (
        <ModalOverlay onClick={(e) => {
          if (e.target === e.currentTarget) setIsModalOpen(false);
        }}>
          <ModalContent>
            <ModalHeader>
              <h3>Add New Account</h3>
              <X size={20} style={{ cursor: 'pointer', color: '#A0AEC0' }} onClick={() => setIsModalOpen(false)} />
            </ModalHeader>
            <InputGroup>
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter email address"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </InputGroup>
            <ModalButtons>
              <button className="cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="confirm" onClick={handleManualAdd}>Add Account</button>
            </ModalButtons>
            <div style={{ marginTop: '20px', borderTop: '1px solid #2D3748', paddingTop: '20px' }}>
              <p style={{ marginBottom: '10px', fontSize: '0.9rem', color: '#A0AEC0' }}>Or continue with</p>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  handleGoogleLogin();
                }}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: '#fff',
                  color: '#333',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Google Login
              </button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
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
