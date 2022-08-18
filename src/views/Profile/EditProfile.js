import { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import { Link } from 'react-router-dom'
import { APIEditEmployee } from '../../api/employees'
import jwtDecode from 'jwt-decode'
import { CONFIG_HEADER } from '../../config/index.js'
import { disableSubmit, enableSubmit, handleValidOnlyNumber } from '../../utils/utils'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Flatpickr from 'react-flatpickr'
import { Spanish } from 'flatpickr/dist/l10n/es.js'

// RTK
import { useDispatch, useSelector } from 'react-redux';
import { fetchPasswordStart, fetchPasswordComplete, fetchPasswordError } from '../../redux/actions/profile'

const MySwal = withReactContent(Swal);
/**
 * Validate
 */
const validationFormPersonal = (values) => {
    const errors = {}

    if (values.first_name.trim().length === 0) {
        errors.message_error_first_name = 'Campo requerido*'
    }
    if (values.last_name.trim().length === 0) {
        errors.message_error_last_name = 'Campo requerido*'
    }
    if (values.telephone.toString().trim().length === 0) {
        errors.message_error_telephone = 'Campo requerido*'
    } else if (values.telephone.toString().trim().length < 7) {
        errors.message_error_min_telephone = 'Ingresar mínimo 7 dígitos'
    }

    return errors
}

const validationFormPassword = (values) => {
    const errors = {}

    if (values.password.trim().length === 0) {
        errors.message_error_password = 'Campo requerido*'
    }
    if (values.confirm_password.trim().length === 0) {
        errors.message_error_confirm_password = 'Campo requerido*'
    }
    if (
        (values.password.trim().length > 0 && values.confirm_password.trim().length > 0) &&
        values.password.trim() !== values.confirm_password.trim()
    ) {
        errors.message_error_password_diferents = 'Contraseñas no coinciden*'
    }

    return errors
}

/**
 * Handle submit form
 */
const handleSubmitPersonal = (values, formData, dispatch) => {
    const $btn = document.getElementById('btn-edit-personal')

    disableSubmit($btn)

    setTimeout(() => {
        MySwal.fire({
            text: 'Hemos actualizado su información personal.',
            icon: 'success',
            confirmButtonText: 'OK',
            showCloseButton: true, // icon cerrar
            allowOutsideClick: false, // click outside does not close popup
            allowEscapeKey: true, // keyup esc close popup
            customClass: { // new class modal
                container: 'swal-content',
            },
        }).then((result) => {
            enableSubmit($btn)
            // dispatch(fetchPasswordComplete())

        }).catch(() => {
            enableSubmit($btn)
            // dispatch(fetchPasswordError())
        })
    }, 3000)
}

/**
 * Handle submit form password
 */
const handleSubmitPassword = (values, formData, dispatch) => {
    const $btn = document.getElementById('btn-edit-password')

    disableSubmit($btn)
    dispatch(fetchPasswordStart())

    setTimeout(() => {
        MySwal.fire({
            text: 'Hemos actualizado su contraseña.',
            icon: 'success',
            confirmButtonText: 'OK',
            showCloseButton: true, // icon cerrar
            allowOutsideClick: false, // click outside does not close popup
            allowEscapeKey: true, // keyup esc close popup
            customClass: { // new class modal
                container: 'swal-content',
            },
        }).then((result) => {
            enableSubmit($btn)
            dispatch(fetchPasswordComplete())
            
            // clear inputs
            formData.resetForm() // reset formik
        }).catch(() => {
            enableSubmit($btn)
            dispatch(fetchPasswordError())
        })
    }, 3000)

    /*
    disableSubmit($btn)
    dispatch(fetchPasswordStart())

    MySwal.fire({
        text: `¿Está seguro de actualizar su contraseña?`,
        icon: 'info',
        confirmButtonText: 'OK',
        cancelButtonText: 'CANCELAR',
        showCancelButton: true,
        showCloseButton: true, // icon cerrar
        allowOutsideClick: false, // click afuera no cierra
        allowEscapeKey: true, // keyup esc cierra
        customClass: { // nueva clase en el moda
            container: 'swal-content',
        },
    }).then((result) => {
        if (result.value) {
            setTimeout(() => {
                alert('consumir API')
                enableSubmit($btn)
                dispatch(fetchPasswordComplete())
            }, 3000)
        } else {
            enableSubmit($btn)
            dispatch(fetchPasswordError())
        }
    })
    */
}

const EditProfile = () => {
    const [data, setData] = useState(); // Fetching data
    const dispatch = useDispatch()
    // token
    let token = localStorage.getItem('token')
    let { id } = jwtDecode(token)

    // redux
    const profileData = useSelector(state => state.profile)

    useEffect(() => {
        CONFIG_HEADER.headers['Authorization'] = 'Bearer ' + token
        APIEditEmployee(id, CONFIG_HEADER, (response) => {
            let data = response.data.data

            if (data.length > 0) {
                let employe = JSON.parse(data)
                setData(employe[0])
            }
        })

        handleValidOnlyNumber(document.getElementById('telephone'))
    }, [])

    return (
        <div className='main main-clients'>
            <div className='page-header'>
                <div className='mx-auto p-20 max-w-7xl'>
                    <nav className='page-breadcrumb'>
                        <ul>
                            <li><Link to='/perfil'>Configuración</Link></li>
                        </ul>
                    </nav>
                    <h1 className='text-3xl md:text-4xl font-extrabold mt-8'>MI PERFIL</h1>
                </div>
            </div>
            <div className='mx-auto p-20 max-w-7xl'>
                <div className='card p-20 overflow-x-auto relative'>
                    <h2 className='text-2xl font-bold mb-7'>INFORMACIÓN PERSONAL</h2>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            first_name: data ? data.first_name : '',
                            last_name: data ? data.last_name : '',
                            telephone: data ? data.telephone : '',
                            birth_date: data ? data.birth_date : '',
                        }}
                        validate={validationFormPersonal}
                        onSubmit={(values, formData) => handleSubmitPersonal(values, formData, dispatch)}
                    >
                        {(formData) => (
                            <Form className='grid grid-cols-2 gap-20' noValidate>
                                <div className='form-group col-span-2 md:col-span-1'>
                                    <label htmlFor='first_name'>Nombres</label>
                                    <input
                                        id='first_name'
                                        type='text'
                                        className='form-control'
                                        style={{ textTransform: 'uppercase' }}
                                        {...formData.getFieldProps('first_name')}
                                    />
                                    {formData.touched.first_name && formData.errors.message_error_first_name ? (
                                        <div style={{ color: "red" }}>{formData.errors.message_error_first_name}</div>
                                    ) : null}
                                </div>
                                <div className='form-group col-span-2 md:col-span-1'>
                                    <label htmlFor='last_name'>Apellidos</label>
                                    <input
                                        id='last_name'
                                        type='text'
                                        className='form-control'
                                        style={{ textTransform: 'uppercase' }}
                                        {...formData.getFieldProps("last_name")}
                                    />
                                    {formData.touched.last_name && formData.errors.message_error_last_name ? (
                                        <div style={{ color: "red" }}>{formData.errors.message_error_last_name}</div>
                                    ) : null}
                                </div>
                                <div className='form-group col-span-2 md:col-span-1'>
                                    <label htmlFor='telephone'>Teléfono</label>
                                    <input
                                        id='telephone'
                                        type='number'
                                        className='form-control'
                                        style={{ textTransform: 'uppercase' }}
                                        tabIndex={0}
                                        {...formData.getFieldProps("telephone")}
                                    />
                                    {formData.touched.telephone && formData.errors.message_error_telephone ? (
                                        <div style={{ color: "red" }}>{formData.errors.message_error_telephone}</div>
                                    ) : null}
                                    {formData.touched.telephone && formData.errors.message_error_min_telephone ? (
                                        <div style={{ color: "red" }}>{formData.errors.message_error_min_telephone}</div>
                                    ) : null}
                                </div>
                                <div className='form-group col-span-2 md:col-span-1'>
                                    <label htmlFor='birth_day'>Fec. nacimiento</label>
                                    <Flatpickr
                                        id='birth_day'
                                        className='form-control'
                                        placeholder='SELECCIONE..'
                                        style={{textTransform: 'uppercase'}}
                                        options={{
                                            enableTime: false,
                                            dateFormat: 'l, d M',
                                            locale: Spanish,
                                            disableMobile: "true"
                                        }}
                                        value= {formData.values.birth_date}
                                        disabled='disabled'
                                    />
                                </div>
                                <div className='form-group col-span-2 text-right'>
                                    <button type='submit' className='btn-rds' id='btn-edit-personal'>
                                        <em className='material-icons animate-spin'>sync</em>
                                        <strong>Editar</strong>
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>

            <div className='mx-auto p-20 max-w-7xl'>
                <div className='card p-20 overflow-x-auto relative'>
                    <h2 className='text-2xl font-bold mb-7'>CREDENCIALES</h2>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            password: '',
                            confirm_password: '',
                        }}
                        validate={validationFormPassword}
                        onSubmit={(values, formData) => handleSubmitPassword(values, formData, dispatch)}
                    >
                        {(formData) => (
                            <Form className='grid grid-cols-2 gap-20' noValidate>
                                <div className='form-group col-span-2 md:col-span-1'>
                                    <label htmlFor='password'>Contraseña</label>
                                    <input
                                        id='password'
                                        type='password'
                                        className='form-control'
                                        style={{ textTransform: 'uppercase' }}
                                        autoComplete="off"
                                        {...formData.getFieldProps("password")}
                                    />
                                    {formData.touched.password && formData.errors.message_error_password ? (
                                        <div style={{ color: "red" }}>{formData.errors.message_error_password}</div>
                                    ) : null}
                                </div>
                                <div className='form-group col-span-2 md:col-span-1'>
                                    <label htmlFor='confirm-password'>Confirmar contraseña</label>
                                    <input
                                        id='confirm-password'
                                        type='password'
                                        className='form-control'
                                        style={{ textTransform: 'uppercase' }}
                                        autoComplete="off"
                                        {...formData.getFieldProps("confirm_password")}
                                    />
                                    {formData.touched.confirm_password && formData.errors.message_error_confirm_password ? (
                                        <div style={{ color: "red" }}>{formData.errors.message_error_confirm_password}</div>
                                    ) : null}
                                    {formData.touched.confirm_password && formData.errors.message_error_password_diferents ? (
                                        <div style={{ color: "red" }}>{formData.errors.message_error_password_diferents}</div>
                                    ) : null}
                                </div>
                                <div className='form-group col-span-2 text-right'>
                                    <button type='submit' className='btn-rds' id='btn-edit-password'>
                                        <em className='material-icons animate-spin'>sync</em>
                                        <strong>Editar</strong>
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div >
    )
}

export default EditProfile