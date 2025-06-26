import React,{useState} from "react"; 
import Wrapper from "./style";  

const SignUp = ({setSignUpUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password && confirmPassword) {
      if (password === confirmPassword) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        alert("Sign Up Successful");
      } else {
        alert("Passwords do not match");
      }
    } else {
      alert("Please fill all the required details");
    }
  };

  return (
    <Wrapper>
      <h2>Sign Up</h2>
      <h3>Sign up with an already existing account</h3>
      <div className="social-login">
        <input type="text" placeholder="Google" />
        <input type="text" placeholder="Apple" />
      </div>
      <h5>Or use your email account</h5>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </Wrapper>
  );
};

export default SignUp;