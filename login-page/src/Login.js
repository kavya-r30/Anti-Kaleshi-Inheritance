import React from 'react';
import { useState } from 'react';

function Login(props){
    const [logindetail, setLogindetail] = useState({
        email:"", 
        password:""
    });

    function handleDefault(event){
        event.preventDefault();
    }

    function handleInput(event){
        const {name, value} = event.target;
        setLogindetail(prevState=>{
            return{
                ...prevState,
                [name]:value
            }
        })
    }

    return(
        <div className='loginContainer'>
            <h1>Login</h1>
            <form className="inputform" onSubmit={handleDefault} >
                <label htmlFor='email'>Email</label>
                <input type='email' placeholder='email@gmail.com' id='email' name='email' onChange={handleInput} value={logindetail.email} />
                <label htmlFor='password'>Password</label>
                <input type='password' placeholder='********' id='password' name='password' onChange={handleInput} value={logindetail.password} />
                <button type='submit'>Login</button>
            </form>
            <button onClick={props.displayRegister}>Dont have an account? Register</button>
        </div>
    );
}

export default Login;
