import React, { useState } from 'react';
import Wrapper from './style';
import { Link } from 'react-router-dom';

const SignIn = ({setSignInUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
     localStorage.setItem("email", email);
     localStorage.setItem("password", password);
     alert("Sign In Successful");
    }else {
      alert("Please fill the required details");
    }
  };

  return (
    <Wrapper>
      <h2>Sign In</h2>
      <h3>signIn using your account with</h3>
      <div className='social-login'>
        <input type ="text" placeholder="Google" />
        <input type ="text" placeholder="Apple" />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
        <Link to="/sign-up" className='link'>
          Don't have an account? Sign Up
        </Link>
      </form>
    </Wrapper>
  );
};

export default SignIn;
