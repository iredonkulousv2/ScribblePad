import { Form, Button } from "react-bootstrap"
import {FormEvent, useState,} from 'react'
import {useNavigate } from "react-router-dom"
import axios from "axios";

export function Signup(){
    const [username, setUser] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const signupHandler = (e: FormEvent) => {
        e.preventDefault()
        axios.post('/api/signup', {
            username,
            password
          })
          .then(response => {
            setUser('')
            setPassword('')
            console.log(response.data);
            if(response.data === 'Created User'){
                navigate('/')
            }
          })
        
    }

  

    return (
    <Form onSubmit={signupHandler}>
      <Form.Group className="mb-3" controlId="formBasicUser">
        <h1>Create An User</h1>
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter Username" 
        value={username}
        onChange={e => 
            setUser(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" 
        value={password}
        onChange={e => setPassword(e.target.value)}/>
      </Form.Group>

    
      <Button variant="primary" type="submit">
        Signup
      </Button>
     
    </Form>
    )
}