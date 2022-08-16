import { useContext } from "react";
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { APILogin } from '../../api/login';
import { AuthContext } from '../../context/AuthContent';

// import {useSelector} from 'react-redux'

const validateMainForm = (values) => {
    const errors = {};

    if (values.username.trim().length === 0) {
        errors.username = 'El username es requerido'
    }

    if (values.password.trim().length === 0) {
        errors.password = 'El password es requerido'
    }

    return errors
}

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    // const navigate = useNavigate();

    // const [isLogged, setIsLogged] = useContext(AuthContext);
    // const auth = useSelector((state) => state.auth);

    const handleSubmit = (values) => {
        APILogin(values, (response) => {
            let resultData = response.data?.token

            if (!resultData) {
                const $message = document.getElementById('message-login')
                $message.innerHTML = `${response.data?.message}`
                return
            }


            // setIsLogged(true)
            // navigate('/dashboard')
            // localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJzcmlvcyIsImVtYWlsIjoic3Jpb3NAbHVjaGFzYWxvbnNwYS5wZSIsInJvbGUiOiJDQUpFUkEiLCJmaXJzdF9uYW1lIjoiU09GSUEiLCJsYXN0X25hbWUiOiJSSU9TIiwiaWF0IjoxNjYwNTkwNjE1LCJleHAiOjE2NjA2MDkyMTV9._Teb-HiSKvIMjDU5OFWeFJ6985rfumCdvs5HkI3aTpA')
            
            const lastPath = localStorage.getItem('lastPath') || '/';
            localStorage.setItem('token', resultData) // send token storage
            login('Fernando Herrera');
            navigate(lastPath, {
                replace: true
            });
        })
    }

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <main className='card w-full max-w-xs p-16'>
                <Formik
                    initialValues={{
                        username: 'srios',
                        password: 'srios',
                    }}
                    validate={validateMainForm}
                    onSubmit={handleSubmit}
                >
                    {(formData) => (
                        <Form noValidate autoComplete="off">
                            <fieldset className='grid grid-cols-1 gap-10'>
                                <legend className='text-center font-bold text-2xl'>SISSA</legend>
                                <div className='form-group'>
                                    <label className='form-label'>Usuario</label>
                                    <Field
                                        type='text'
                                        className='form-control'
                                        name='username'
                                    />
                                    {
                                        formData.touched.username && formData.errors.username ? (
                                            <span className='message-error error'>{formData.errors.username}</span>
                                        ) : null
                                    }
                                </div>
                                <div className='form-group'>
                                    <label className='form-label'>Contraseña</label>
                                    <Field
                                        type='password'
                                        className='form-control'
                                        name='password'
                                    />
                                    {
                                        formData.touched.password && formData.errors.password ? (
                                            <span className='message-error error'>{formData.errors.password}</span>
                                        ) : null
                                    }
                                </div>
                                <div className='form-group text-center'>
                                    <button className='btn-rds btn-primary btn-block' type='submit'>Ingresar</button>
                                </div>
                                <div className='form-group' id='message-login'></div>
                            </fieldset>
                        </Form>)}
                </Formik>
            </main>
        </div>
    );
}
export default Login;