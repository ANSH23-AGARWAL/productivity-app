import styled from "styled-components"; 

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: rgb(161, 146, 146);
    
    h2 {
        margin-bottom: 20px;
    }
    
    h3 {
        margin-bottom: 20px;
        color: #555;
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