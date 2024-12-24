import React from 'react';
import { useState } from 'react';

function Register(props){

    const [registerdetail, setRegisterdetail] = useState({
        firstname:"",
        lastname:"",
        username:"",
        email:"", 
        password:""
    });

    function handleDefault(event){
        event.preventDefault();
    }

    function handleInput(event){
        const {name, value} = event.target;
        setRegisterdetail(prevState=>{
            return{
                ...prevState,
                [name]:value
            }
        })
    }

    return(
        <div className='registerContainer'>
            <h1>Sign Up</h1>
            <form className="registerform" onSubmit={handleDefault}>
                <label htmlFor='First name'>First Name</label>
                <input type='firstname' placeholder='enter First name here' id='firstname' name='firstname' onChange={handleInput} value={registerdetail.firstname} />
                <label htmlFor='Last name'>Last Name</label>
                <input type='lastname' placeholder='enter Last name here' id='lastname' name='lastname' onChange={handleInput} value={registerdetail.lastname} />
                <label htmlFor='username'>Username</label>
                <input type='username' placeholder='enter username here' id='username' name='username' onChange={handleInput} value={registerdetail.username} />
                <label htmlFor='email'>Email</label>
                <input type='email' placeholder='email@gmail.com' id='email' name='email' onChange={handleInput} value={registerdetail.email}/>
                <label htmlFor='password'>Password</label>
                <input type='password' placeholder='********' id='password' name='password' onChange={handleInput} value={registerdetail.password}/>
                <button type='submit'>Register</button>
            </form>
            <button onClick={props.displayLogin}>Already have an account? Login</button>
        </div>
    );
}

export default Register;