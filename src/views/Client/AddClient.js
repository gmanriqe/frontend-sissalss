import {useEffect, useState} from 'react';
import {
    Formik,
    Form
} from 'formik';
import * as Yup from 'yup'
import Select from 'react-select'
import Flatpickr from "react-flatpickr";
import { Spanish } from 'flatpickr/dist/l10n/es.js'; // configure language for flatpickr
import PageHeader from '../../components/PageHeader';
import ErrorsMessage from '../../components/ErrorMessage';
import { APIListTypeDocument } from '../../api/type_document'
import { CONFIG_HEADER } from '../../config/index.js'

const breadcrumbs = [{ names: 'Clientes', link: '/clientes' }, { names: 'Nuevo', link: '/clientes/nuevo' }]
const sex = [
    {
        'label': 'SELECCIONE..',
        'value': ''
    },
    {
        'label': 'FEMENINO',
        'value': '0'
    },
    {
        'label': 'MASCULINO',
        'value': '1'
    },
]

/**
 * Validate with Yup
 */
const FormSchema = Yup.object().shape({
    first_name: Yup.string()
        .required('El nombre es obligatorio*'),
    last_name: Yup.string()
        .required('El apellido es obligatorio*'),
    /*
    type_document: Yup.object().shape({
        value: Yup.string().required('El tipo de documento es obligatorio*'),

    }),
    nro_document: Yup.string()
        .required('El nro. documento es obligatorio*'),
    */
    birth_date: Yup.string()
        .required('La fec. nacimiento es obligatoria*'),
    phone: Yup.string()
        .required('El teléfono es obligatoria*'),
    email: Yup.string()
        .required('El correo es obligatoria*'),
    /*
    occupation: Yup.object().shape({
        value: Yup.string().required('La ocupación es obligatorio*'),
    }),
    */
    observation: Yup.string()
        .required('La observación es obligatoria*'),
})

/**
 * Handle submit form
 */
const handleSubmit = (values, formData) => {
    console.log(values)
}

/**
 * Main component
 */
const AddClient = () => {
    let [typeDocuments, setTypeDocuments] = useState([])

    useEffect(() => {
        CONFIG_HEADER.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
        APIListTypeDocument(CONFIG_HEADER, (response) => {
            console.log(response)
            let data = response.data.data

            if (data.length > 0) {
                let listTypeDocument = JSON.parse(data)
                let filter = listTypeDocument.filter( (item) => {
                    return item.state === 1
                })

                let typeDocument = []
                typeDocument.unshift({ label: 'SELECCIONE..', value: '' })
                filter.map( (item) => (
                    typeDocument.push({ label: item.name_document, value: item.id })
                ))

                setTypeDocuments(typeDocument)
            }
        })
    }, []);
    // Type document
    const handleChangetypeDocument = (formData, selectedOption) => {
        formData.setFieldValue('type_document', selectedOption)

        const $nroDocument = document.getElementById('nro-documento')
        if (selectedOption.value !== '') {
            $nroDocument.removeAttribute('disabled')
        } else {
            $nroDocument.setAttribute('disabled', 'disabled')
        }

    }

    const handleOnBlurTypeDocument = (formData) => {
        formData.setFieldTouched('type_document', true)
    }

    // Brith date
    const handleChangeBirthDate = (formData, val) => {
        const $birthDate = val.length === 0 ? '' : new Date(new Date(val[0]).setHours(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()))
        // formData.setFieldValue('birth_date', selectedDate)
        formData.setFieldValue('birth_date', $birthDate)
    }

    const handleOnBlurBirthDate = (formData) => {
        formData.setFieldTouched('birth_date', true)
    }

    return (
        <div className='main main-addclient'>
            <PageHeader title={'NUEVO CLIENTE'} breadcrumbs={breadcrumbs} />
            <div className='mx-auto p-20 container'>
                <div className='card p-20 overflow-x-auto relative'>
                    <Formik
                        initialValues={{
                            first_name: '',
                            last_name: '',
                            type_document: { label: 'SELECCIONE..', value: '', },
                            nro_document: '',
                            birth_date: '',
                            phone: '',
                            email: '',
                            sex: { label: 'SELECCIONE..', value: '', },
                            observation: '',
                        }}
                        validationSchema={FormSchema}
                        onSubmit={handleSubmit}
                    >
                        {(formData) => (
                            <Form className='grid grid-cols-2 gap-20' noValidate>
                                <div className='form-group col-span-2 md:col-span-1'>
                                    <label htmlFor='nombre'>Nombres</label>
                                    <input
                                        id='nombre'
                                        type='text'
                                        className='form-control'
                                        style={{ textTransform: 'uppercase' }}
                                        {...formData.getFieldProps("first_name")}
                                    />
                                    {
                                        formData.touched.first_name && formData.errors.first_name ? (
                                            <ErrorsMessage errors={formData.errors.first_name} />
                                        ) : null
                                    }
                                </div>
                                <div className='form-group col-span-2 md:col-span-1'>
                                    <label htmlFor='apellido'>Apellidos</label>
                                    <input
                                        id='apellido'
                                        type='text'
                                        className='form-control'
                                        style={{ textTransform: 'uppercase' }}
                                        {...formData.getFieldProps("last_name")}
                                    />
                                    {
                                        formData.touched.last_name && formData.errors.last_name ? (
                                            <ErrorsMessage errors={formData.errors.last_name} />
                                        ) : null
                                    }
                                </div>
                                <div className='form-group col-span-2 md:col-span-1'>
                                    <label htmlFor='tipo-documento'>Tipo documento</label>
                                    <Select
                                        id='tipo-documento'
                                        className='form-control'
                                        style={{ textTransform: 'uppercase' }}
                                        name='type_document'
                                        placeholder=''
                                        options={typeDocuments}
                                        onChange={(val) => handleChangetypeDocument(formData, val)}
                                        onBlur={() => handleOnBlurTypeDocument(formData)}
                                        defaultValue={formData.values.type_document}
                                    />
                                    {
                                        formData.errors.type_document?.value ? (
                                            <ErrorsMessage errors={formData.errors.type_document?.value} />
                                        ) : null
                                    }
                                </div>
                                <div className='form-group col-span-2 md:col-span-1'>
                                    <label htmlFor='nro-documento'>Nro. documento</label>
                                    <input
                                        id='nro-documento'
                                        type='text'
                                        className='form-control'
                                        style={{ textTransform: 'uppercase' }}
                                        disabled='disabled'
                                        {...formData.getFieldProps("nro_document")}
                                    />
                                    {
                                        formData.touched.nro_document && formData.errors.nro_document ? (
                                            <ErrorsMessage errors={formData.errors.nro_document} />
                                        ) : null
                                    }
                                </div>
                                <div className='form-group col-span-2 md:col-span-1'>
                                    <label htmlFor='telefono'>Teléfono</label>
                                    <input
                                        id='telefono'
                                        type='text'
                                        className='form-control'
                                        style={{ textTransform: 'uppercase' }}
                                        {...formData.getFieldProps("phone")}
                                    />
                                    {
                                        formData.touched.phone && formData.errors.phone ? (
                                            <ErrorsMessage errors={formData.errors.phone} />
                                        ) : null
                                    }
                                </div>
                                <div className='form-group col-span-2 md:col-span-1'>
                                    <label htmlFor='correo'>Email</label>
                                    <input
                                        id='correo'
                                        type='email'
                                        className='form-control'
                                        style={{ textTransform: 'uppercase' }}
                                        {...formData.getFieldProps("email")}
                                    />
                                    {
                                        formData.touched.email && formData.errors.email ? (
                                            <ErrorsMessage errors={formData.errors.email} />
                                        ) : null
                                    }
                                </div>
                                <div className='form-group col-span-2 md:col-span-1'>
                                    <label htmlFor='fecha_nacimiento'>Fecha de nacimiento</label>
                                    <Flatpickr
                                        id='fecha_nacimiento'
                                        className='form-control'
                                        placeholder='SELECCIONE..'
                                        style={{textTransform: 'uppercase'}}
                                        options={{
                                            enableTime: false,
                                            dateFormat: 'l, d M',
                                            locale: Spanish,
                                            minDate: "today",
                                            disableMobile: "true"
                                        }}
                                        onChange={(val) => handleChangeBirthDate(formData, val)}
                                        onBlur={() => handleOnBlurBirthDate(formData)}
                                    />
                                    {
                                        formData.touched.birth_date && formData.errors.birth_date ? (
                                            <ErrorsMessage errors={formData.errors.birth_date} />
                                        ) : null
                                    }
                                </div>
                                <div className='form-group col-span-2 md:col-span-1'>
                                    <label htmlFor='sexo'>Sexo</label>
                                    <Select
                                        id='sexo'
                                        className='form-control'
                                        style={{ textTransform: 'uppercase' }}
                                        name='sex'
                                        placeholder=''
                                        options={sex}
                                        onChange={(val) => handleChangetypeDocument(formData, val)}
                                        onBlur={() => handleOnBlurTypeDocument(formData)}
                                        defaultValue={formData.values.sex}
                                    />
                                    {
                                        formData.errors.sex?.value ? (
                                            <ErrorsMessage errors={formData.errors.sex?.value} />
                                        ) : null
                                    }
                                </div>
                                <div className='form-group col-span-2'>
                                    <label htmlFor='observacion'>Observación</label>
                                    <textarea
                                        id='observacion'
                                        type='text'
                                        className='form-control'
                                        style={{ textTransform: 'uppercase' }}
                                        {...formData.getFieldProps("observation")}
                                    ></textarea>
                                    {
                                        formData.touched.observation && formData.errors.observation ? (
                                            <ErrorsMessage errors={formData.errors.observation} />
                                        ) : null
                                    }
                                </div>
                                <div className='form-group col-span-2 text-right'>
                                    <button type='submit' className='btn-rds'>Guardar</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}
export default AddClient;