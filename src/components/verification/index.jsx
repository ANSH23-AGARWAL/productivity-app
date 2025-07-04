import React, {useState} from "react";
import Wrapper from "./style";

const Verification = ({setVerificationUser}) => {
  const [verificationCode, setVerificationCode] = useState(new Array(4).fill(""));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (verificationCode) {
      localStorage.setItem("verificationCode", verificationCode);
      alert("Verification Successful");
    } else {
      alert("Please enter the verification code");
    }
  };

  return (
    <Wrapper>
      <h2>Verification</h2>
      <h3>Enter the verification code sent to your email</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Verification Code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
        <button type="submit">Verify</button>
      </form>
    </Wrapper>
  );
}
export default Verification;