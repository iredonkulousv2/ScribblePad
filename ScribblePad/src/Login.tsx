import { Form, Button } from "react-bootstrap"
import {FormEvent, useState} from 'react'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export function Login(){
  const [username, setUser] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

    const login = (e: FormEvent) => {
        e.preventDefault()

        axios.post('/api/login', {
          username,
          password
        })
        .then(response => {
          setUser('')
          setPassword('')
          
          const {id} = response.data
          if(response.data.login === true){
            navigate('/create', {state:{username,id}})
        }
        })
       
      }

    return (
    <Form onSubmit={login}>
      <Form.Group className="mb-3" controlId="formBasicUser">
        <Form.Label>UserName</Form.Label>
        <Form.Control type="text" placeholder="Enter Username" 
        value={username}
        onChange={e => 
            setUser(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" 
          value={password}
          onChange={e => setPassword(e.target.value)}/>
      </Form.Group>

    
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Link to='/signup'>
      <Button variant="outline-secondary" type="button" >
        Sign Up
      </Button>
      </Link>
    </Form>
    )
}