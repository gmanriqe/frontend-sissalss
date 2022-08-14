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
    const navigate = useNavigate();

    const [isLogged, setIsLogged] = useContext(AuthContext);
    // const auth = useSelector((state) => state.auth);

    const handleSubmit = (values) => {
        APILogin(values, (response) => {
            let resultData = response.data?.token

            if(!resultData) {
                const $message = document.getElementById('message-login')
                $message.innerHTML = `${response.data?.message}`
            }

            if (resultData) {
                localStorage.setItem('token', resultData)
                setIsLogged(true)
                navigate('/personal')
            }
        })
    }

    return (
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
    );
}
export default Login;