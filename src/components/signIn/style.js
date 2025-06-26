import styled from 'styled-components';
 const Wrapper = styled.div`

 
   display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;

  h2 {
    margin-bottom: 20px;
  }
  h3 {
    margin-bottom: 20px;
    color: #555;
  }
  .social-login {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;

    input {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      width: 100px;
      text-align: center;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    width: 300px;

    input {
      margin-bottom: 10px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    button {
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
`;
export default Wrapper;