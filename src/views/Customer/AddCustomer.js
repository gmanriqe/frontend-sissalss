import { useEffect, useState } from 'react';
import {
    Formik,
    Form
} from 'formik';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'
import Flatpickr from "react-flatpickr";
import { Spanish } from 'flatpickr/dist/l10n/es.js'; // configure language for flatpickr
import PageHeader from '../../components/PageHeader';
import ErrorsMessage from '../../components/ErrorMessage';
import { APIListTypeDocument } from '../../api/type_document'
import { CONFIG_HEADER, SEX } from '../../config/index.js'
import {
    disableSubmit,
    enableSubmit,
    validOnlyNumber,
    validateEmail,
    validateLengthTypeDocument
} from '../../utils/utils';
import { APIAddCustomer } from '../../api/customers';

// Day
import * as dayjs from 'dayjs'
// Swal
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

dayjs.locale('es') // use Spanish locale globally
const MySwal = withReactContent(Swal);
const breadcrumbs = [{ names: 'Clientes', link: '/clientes' }, { names: 'Nuevo', link: '/clientes/nuevo' }]
let global_length_type_document = null
/*
 * Brith date
 */
const handleChangeBirthDate = (val, formData) => {
    formData.setFieldValue('birthday', val.length === 0 ? '' : dayjs(val).format('YYYY-MM-DD'))
}

const handleOnBlurBirthDate = (formData) => {
    formData.setFieldTouched('birthday', true)
}

/*
 * Type document
 */
const checkCharacter = (selectedOption) => {
    let $numberDocument = document.getElementById('number-document')

    switch (selectedOption) {
        case 'CARNET DE EXTRANJERIA':
            $numberDocument.setAttribute('data-maxlength', '10')
            break;
        case 'DNI':
            $numberDocument.setAttribute('data-maxlength', '8')
            break;
        case 'LIBRETA ELECTORAL':
            $numberDocument.setAttribute('data-maxlength', '12')
            break;
        case 'PARTIDA DE NACIMIENTO':
            $numberDocument.setAttribute('data-maxlength', '10')
            break;
        case 'PASAPORTE':
            $numberDocument.setAttribute('data-maxlength', '12')
            break;
        default:
        // do nothing
    }
}

/*
 * Valid nro documento
 */
const handlerInputNumberDocument = (evt) => {
    const $numberDocument = evt.target
    const maxLength = $numberDocument.dataset.maxlength
    global_length_type_document = maxLength
    if ($numberDocument.value.length > maxLength) {
        evt.target.value = $numberDocument.value.substring(0, maxLength)
    }
}

/*
 * Valid type number
 */
const handleChangetypeDocument = (selectedOption, formData) => {
    const $nroDocument = document.getElementById('number-document')

    formData.setFieldValue('id_type_document', selectedOption)
    formData.setFieldValue('document_number', '')

    if (selectedOption.value === '') {
        $nroDocument.setAttribute('disabled', 'disabled')
    } else {
        $nroDocument.removeAttribute('disabled')
        checkCharacter(selectedOption.label, formData)
    }

}
const handleOnBlurTypeDocument = (formData) => {
    formData.setFieldTouched('id_type_document', true)
}

/*
 * Sex
 */
const handleChangeSex = (selectedOption, formData) => {
    formData.setFieldValue('sex', selectedOption)
}
const handleOnBlurSex = (formData) => {
    formData.setFieldTouched('sex', true)
}

/*
 * Validate
 */
const validateFormCustomer = (values) => {
    let errors = {}

    if (values.first_name.trim().length === 0) {
        errors.message_error_first_name = 'Campo requerido*'
    }
    if (values.last_name.trim().length === 0) {
        errors.message_error_last_name = 'Campo requerido*'
    }
    if (values.telephone.toString().trim().length === 0) {
        errors.message_error_telephone = 'Campo requerido*'
    }
    if (values.birthday.trim().length === 0) {
        errors.message_error_birth_date = 'Campo requerido*'
    }
    if (values.id_type_document.value !== '' && values.document_number.toString().trim().length === 0) {
        errors.message_error_number_document = 'Campo requerido*'
    } else if (values.id_type_document.value !== '' && validateLengthTypeDocument(values.document_number.toString().trim(), global_length_type_document) === false) {
        errors.message_error_number_document_length = 'N??mero de documento inv??lido*'
    }
    if (values.email.trim().length === 0) {
        errors.message_error_email = 'Campo requerido*'
    } else if (validateEmail(values.email.trim()) === false) {
        errors.message_error_email_formato = 'Formato inv??lido*'
    }
    if (values.sex.value === '') {
        errors.message_error_sex = 'Campo requerido*'
    }
    if (values.observation.trim().length === 0) {
        errors.message_error_observation = 'Campo requerido*'
    }

    return errors
}

/**
 * Handle submit form
 */
const handleSubmitCustomer = (values, navigate, formData) => {
    const $btn = document.getElementById('btn-save')
    disableSubmit($btn)

    let data = {}
    data.first_name = values.first_name.toUpperCase();
    data.last_name = values.last_name.toUpperCase();
    data.telephone = values.telephone.toString();
    data.birthday = values.birthday;
    data.email = values.email.toUpperCase();
    data.sex = Number(values.sex.value);
    data.observation = values.observation.toUpperCase();
    data.id_type_document = values.id_type_document.value.length === '' ? null : Number(values.id_type_document.value);
    data.document_number = values.document_number.toString().length === 0 ? null : values.document_number.toString();

    CONFIG_HEADER.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
    APIAddCustomer(CONFIG_HEADER, data, (response) => {
        const message = response.data.message
        if (response.status === 500) {
            MySwal.fire({
                text: `${message}`,
                icon: 'error',
                confirmButtonText: 'OK',
                showCloseButton: true, // icon cerrar
                allowOutsideClick: false, // click outside does not close popup
                allowEscapeKey: true, // keyup esc close popup
                customClass: { // new class modal
                    container: 'swal-content',
                },
            }).then((result) => {
                enableSubmit($btn)
            })
        } else if (response.status === 200) {
            MySwal.fire({
                text: `${message}`,
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
                // Redirect to list customers
                navigate('/clientes')
                /*
                // clear inputs
                formData.resetForm() // reset formik
                */
            }).catch(() => {
                enableSubmit($btn)
            })
        }
    })

    /*
    setTimeout(() => {
        MySwal.fire({
            text: 'Se guardo el cliente con ??xito.',
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
            // clear inputs
            formData.resetForm() // reset formik
        }).catch(() => {
            enableSubmit($btn)
        })
    }, 3000)
    */
}

const AddCustomer = () => {
    let [typeDocuments, setTypeDocuments] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchingTypeDocuments = () => {
            CONFIG_HEADER.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
            APIListTypeDocument(CONFIG_HEADER, (response) => {

                let data = response.data.data
                if (data.length > 0) {
                    let listTypeDocument = JSON.parse(data)
                    let filter = listTypeDocument.filter((item) => {
                        return item.state === 1
                    })

                    let listTypeDocuments = []
                    listTypeDocuments.unshift({ label: 'SELECCIONE..', value: '' })
                    filter.map((item) => (
                        listTypeDocuments.push({ label: item.name_document, value: item.id.toString() })
                    ))

                    setTypeDocuments(listTypeDocuments)
                }
            })
        }
        fetchingTypeDocuments()
    }, []);

    return (
        <div className='main main-addclient'>
            <PageHeader title={'NUEVO CLIENTE'} breadcrumbs={breadcrumbs} />
            <div className='mx-auto p-20 max-w-7xl'>
                <div className='card p-20 overflow-x-auto relative'>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            first_name: '',
                            last_name: '',
                            id_type_document: typeDocuments[0],
                            document_number: '',
                            telephone: '',
                            email: '',
                            birthday: '',
                            sex: SEX[0],
                            observation: '',
                        }}
                        validate={validateFormCustomer}
                        onSubmit={(val, formData) => handleSubmitCustomer(val, navigate, formData)}
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
                                        {...formData.getFieldProps("first_name")}
                                    />
                                    {
                                        formData.touched.first_name && formData.errors.message_error_first_name ? (
                                            <ErrorsMessage errors={formData.errors.message_error_first_name} />
                                        ) : null
                                    }
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
                                    {
                                        formData.touched.last_name && formData.errors.message_error_last_name ? (
                                            <ErrorsMessage errors={formData.errors.message_error_last_name} />
                                        ) : null
                                    }
                                </div>
                                <div className='form-group col-span-2 md:col-span-1'>
                                    <label htmlFor='telephone'>Tel??fono</label>
                                    <input
                                        id='telephone'
                                        type='number'
                                        className='form-control'
                                        style={{ textTransform: 'uppercase' }}
                                        onKeyDown={(evt) => validOnlyNumber(evt)}
                                        {...formData.getFieldProps("telephone")}
                                    />
                                    {
                                        formData.touched.telephone && formData.errors.message_error_telephone ? (
                                            <ErrorsMessage errors={formData.errors.message_error_telephone} />
                                        ) : null
                                    }
                                </div>
                                <div className='form-group col-span-2 md:col-span-1'>
                                    <label htmlFor='birth-date'>Fecha de nacimiento</label>
                                    <Flatpickr
                                        id='birth-date'
                                        className='form-control'
                                        placeholder='SELECCIONE..'
                                        style={{ textTransform: 'uppercase' }}
                                        options={{
                                            enableTime: false,
                                            // dateFormat: 'l, d M',
                                            dateFormat: 'd M Y',
                                            locale: Spanish,
                                            // minDate: "today",
                                            disableMobile: "true"
                                        }}
                                        onChange={(val) => handleChangeBirthDate(val, formData)}
                                        onBlur={() => handleOnBlurBirthDate(formData)}
                                    />
                                    {console.log(formData)}
                                    {
                                        formData.touched.birthday && formData.errors.message_error_birth_date ? (
                                            <ErrorsMessage errors={formData.errors.message_error_birth_date} />
                                        ) : null
                                    }
                                </div>
                                <div className='form-group col-span-2 md:col-span-1'>
                                    <label htmlFor='email'>Email</label>
                                    <input
                                        id='email'
                                        type='email'
                                        className='form-control'
                                        style={{ textTransform: 'uppercase' }}
                                        {...formData.getFieldProps("email")}
                                    />
                                    {
                                        formData.touched.email && formData.errors.message_error_email ? (
                                            <ErrorsMessage errors={formData.errors.message_error_email} />
                                        ) : null
                                    }
                                    {
                                        formData.touched.email && formData.errors.message_error_email_formato ? (
                                            <ErrorsMessage errors={formData.errors.message_error_email_formato} />
                                        ) : null
                                    }
                                </div>
                                <div className='form-group col-span-2 md:col-span-1'>
                                    <label htmlFor='sex'>Sexo</label>
                                    <Select
                                        id='sex'
                                        className='form-control'
                                        style={{ textTransform: 'uppercase' }}
                                        // name='sex'
                                        placeholder=''
                                        options={SEX}
                                        onChange={(val) => handleChangeSex(val, formData)}
                                        onBlur={() => handleOnBlurSex(formData)}
                                        value={formData.values.sex}

                                    />
                                    {formData.touched.sex && formData.errors.message_error_sex ? (
                                        <ErrorsMessage errors={formData.errors.message_error_sex} />
                                    ) : null}
                                </div>
                                <div className='form-group col-span-2'>
                                    <label htmlFor='observation'>Observaci??n</label>
                                    <textarea
                                        id='observation'
                                        type='text'
                                        className='form-control'
                                        style={{ textTransform: 'uppercase' }}
                                        {...formData.getFieldProps("observation")}
                                    ></textarea>
                                    {
                                        formData.touched.observation && formData.errors.message_error_observation ? (
                                            <ErrorsMessage errors={formData.errors.message_error_observation} />
                                        ) : null
                                    }
                                </div>
                                <div className='form-group col-span-2 md:col-span-1'>
                                    <label htmlFor='type-document'>Tipo documento</label>
                                    <Select
                                        id='type-document'
                                        className='form-control'
                                        style={{ textTransform: 'uppercase' }}
                                        // name='id_type_document'
                                        placeholder=''
                                        options={typeDocuments}
                                        onChange={(val) => handleChangetypeDocument(val, formData)}
                                        onBlur={() => handleOnBlurTypeDocument(formData)}
                                        value={formData.values.id_type_document}
                                    />
                                    {
                                        formData.touched.id_type_document && formData.errors.id_type_document ? (
                                            <ErrorsMessage errors={formData.errors.id_type_document} />
                                        ) : null
                                    }
                                </div>
                                <div className='form-group col-span-2 md:col-span-1'>
                                    <label htmlFor='number-document'>Nro. documento</label>
                                    <input
                                        id='number-document'
                                        type='number'
                                        className='form-control'
                                        style={{ textTransform: 'uppercase' }}
                                        disabled='disabled'
                                        onKeyDown={(evt) => validOnlyNumber(evt)}
                                        onInput={(evt) => handlerInputNumberDocument(evt)}
                                        {...formData.getFieldProps("document_number")}
                                    />
                                    {
                                        formData.touched.document_number && formData.errors.message_error_number_document ? (
                                            <ErrorsMessage errors={formData.errors.message_error_number_document} />
                                        ) : null
                                    }
                                    {
                                        formData.touched.id_type_document && formData.errors.message_error_number_document_length ? (
                                            <ErrorsMessage errors={formData.errors.message_error_number_document_length} />
                                        ) : null
                                    }
                                </div>
                                <div className='form-group col-span-2 text-right'>
                                    <button type='submit' className='btn-rds' id='btn-save'>
                                        <em className='material-icons animate-spin'>sync</em>
                                        <strong>Guardar</strong>
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}
export default AddCustomer;