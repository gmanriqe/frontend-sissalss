import { useContext } from "react";
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { APILogin } from '../../api/login';
import { AuthContext } from '../../context/AuthContent';

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

    const handleSubmit = (values) => {
        APILogin(values, (response) => {
            let resultData = response.data?.token
            
            if(resultData){
                localStorage.setItem('token', resultData)
                setIsLogged(true)
                navigate('/clientes')
            }
        })
    }

    return (
        <main className='card w-full max-w-xs p-16'>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                validate={validateMainForm}
                onSubmit={handleSubmit}
            >
                {(formData) => (
                    <Form>
                        <fieldset>
                            <legend className='text-center font-bold text-2xl'>SISSA</legend>
                            <div className='form-group'>
                                <label className='form-label'>USUARIO:</label>
                                <Field
                                    type='text'
                                    className='form-control'
                                    name='username' />
                                {
                                    formData.touched.username && formData.errors.username ? (
                                        <span className='message-error error'>{formData.errors.username}</span>
                                    ) : null
                                }
                            </div>
                            <div className='form-group'>
                                <label className='form-label'>CONTRASEÑA:</label>
                                <Field
                                    type='password'
                                    className='form-control'
                                    name='password' />
                                {
                                    formData.touched.password && formData.errors.password ? (
                                        <span className='message-error error'>{formData.errors.password}</span>
                                    ) : null
                                }
                            </div>
                            <div className='form-group text-center'>
                                <button className='btn btn-primary' type='submit'>LOGIN</button>
                            </div>
                        </fieldset>
                    </Form>)}
            </Formik>
        </main>
    );
}
export default Login;