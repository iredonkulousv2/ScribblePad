import { Form, Button, FloatingLabel } from "react-bootstrap"
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
        <Form.Group className="mb-3" controlId="formBasicUser">
        <FloatingLabel controlId="floatingInput" label="Username"className="mb-3">
        <Form.Control type="text" placeholder="Enter Username" value={username} onChange={e => setUser(e.target.value)} />
        </FloatingLabel>
      </Form.Group>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
      <FloatingLabel controlId="floatingInput" label="Password"className="mb-3">
        <Form.Control type="text" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} />
        </FloatingLabel>
      </Form.Group>

    
      <Button variant="primary" type="submit">
        Signup
      </Button>
     
    </Form>
    )
}