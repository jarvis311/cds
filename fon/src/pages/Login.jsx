import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { Button, Container, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import validator from 'validator';
import { UserLogin } from '../Auth/Api';

const Login = () => {

    const Redirect = useNavigate()
    const [eye, seteye] = useState(true);
    const [password, setpassword] = useState("password");
    const [type, settype] = useState(false);
    const [Data, SetData] = useState({
        Email: Cookies.get('email-VoiceChanger') ? Cookies.get('email-VoiceChanger') : "",
        Password: Cookies.get('password-VoiceChanger') ? Cookies.get('password-VoiceChanger') : "",
        Remember: Cookies.get('email-VoiceChanger') && Cookies.get('password-VoiceChanger') ? true : false
    })
    const inputData = (e) => {
        SetData({ ...Data, [e.target.name]: e.target.value })
    }

    const RememberData = (e) => {
        SetData({ ...Data, Remember: e.target.checked })
    }

    const login = async (e) => {
        e.preventDefault()
        if (Data.Remember === false) {
            Cookies.remove('email-VoiceChanger')
            Cookies.remove('password-VoiceChanger')
        }
        else {
            Cookies.set('email-VoiceChanger', Data.Email)
            Cookies.set('password-VoiceChanger', Data.Password)
        }

        if (Data.Email === "") {
            toast.error("Email Id Field Is Required")
        }
        else if (!validator.isEmail(Data.Email)) {
            toast.error("Enter Your Valid Email Id")
        }
        else if (Data.Password === "") {
            toast.error("Password Field Is Required")
        }
        else {
            const Result = await UserLogin(Data)
            console.log(Result)
            if (Result.data.Status === true) {
                toast.success(Result.data.Response_Message)
                Cookies.set('jwt-VoiceChanger', Result.data.token, { expires: 1 })
                Redirect("/Home")
            }
            else {
                toast.error(Result.data.Response_Message)
            }
        }
    }

    const Eye = () => {
        if (password == "password") {
            setpassword("text");
            seteye(false);
            settype(true);
        }
        else {
            setpassword("password");
            seteye(true);
            settype(false);
        }
    }

    return (
        <>
            <Container>
                <div className="auth">
                    <div className="auth-box">
                        <Card>
                            <Card.Header className="pb-0">
                                <div className='auth-logo'>
                                    <img src="/../../logo/appicon.jpg" className='logo-mini' alt="Voice GPS Navigation" />
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Form method='post' onSubmit={login}>
                                    <h1 className='auth-title'>Sign in</h1>
                                    <h2 className='auth-subtitle'>Voice Changer</h2>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" className="my-2" name="Email" placeholder="Enter Your Email" value={Data.Email} onChange={e => { inputData(e) }} />
                                    </Form.Group>
                                    <Form.Group className="mb-4 input-prefix">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type={password} className="my-2" name="Password" placeholder="Enter Password" value={Data.Password} onChange={e => { inputData(e) }} />
                                        <i onClick={Eye} className={`bx ${eye ? "bx-hide" : "bx-show"}`}></i>
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Remember Me" checked={Data.Remember} onChange={e => { RememberData(e) }} />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="w-100 ">Sign In</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Login