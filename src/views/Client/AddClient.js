// import {useState} from 'react';
import {
    Formik,
    Form
} from 'formik';
import * as Yup from 'yup';
import Select from 'react-select'
import PageHeader from '../../components/PageHeader';
import ErrorsMessage from '../../components/ErrorMessage';

const breadcrumbs = [{ names: 'Clientes', link: '/clientes' }, { names: 'Nuevo', link: '/clientes/nuevo' }]

// Options for select
const options = [
    { label: 'SELECCIONE..', value: '', },
    { label: 'Chocolate', value: 'chocolate', },
    { label: 'Strawberry', value: 'strawberry' },
    { label: 'Vanilla', value: 'vanilla' }
]

const options2 = [
    { label: 'SELECCIONE..', value: '', },
    { label: 'AMA DE CASA', value: 'AMA DE CASA', },
    { label: 'ENFERMERA', value: 'ENFERMERA' },
    { label: 'MEDICO', value: 'MEDICO' },
    { label: 'OTROS', value: 'OTROS' }
]

/**
 * Validate form
 */
const FormSchema = Yup.object().shape({
    first_name: Yup.string()
        .required('El nombre es obligatorio*'),
    last_name: Yup.string()
        .required('El apellido es obligatorio*'),
    type_document: Yup.object().shape({
        value: Yup.string().required('El tipo de documento es obligatorio*'),
    }),
    nro_document: Yup.string()
        .required('El nro. documento es obligatorio*'),
    birth_date: Yup.string()
        .required('La fec. nacimiento es obligatoria*'),
    phone: Yup.string()
        .required('El teléfono es obligatoria*'),
    email: Yup.string()
        .required('El correo es obligatoria*'),
    occupation: Yup.object().shape({
        value: Yup.string().required('La ocupación es obligatorio*'),
    }),
    observation: Yup.string()
        .required('La observación es obligatoria*'),
})

/**
 * Handle submit form
 */
const handleSubmit = (values, formData) => {
    alert('submit')
}

/**
 * Main component
 */
const AddClient = () => {
    const handleChangetypeDocument = (formData, selectedOption) => {
        formData.setFieldValue('type_document', selectedOption)
    }

    const handleOnBlurTypeDocument = (formData) => {
        formData.setFieldTouched('type_document', true)
    }

    const handleChangeOccupation = (formData, selectedOption) => {
        formData.setFieldValue('occupation', selectedOption)
    }

    const handleOnBlurOccupation = (formData) => {
        formData.setFieldTouched('occupation', true)
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
                            occupation: { label: 'SELECCIONE..', value: '', },
                            observation: '',
                        }}
                        validationSchema={FormSchema}
                        onSubmit={handleSubmit}
                    >
                        {(formData) => (
                            <Form className='grid grid-cols-2 gap-20' noValidate>
                                {console.log(formData)}
                                <div className='form-group col-span-2 md:col-span-1'>
                                    <label htmlFor='nombre'>Nombres</label>
                                    <input
                                        id='nombre'
                                        type='text'
                                        className='form-control'
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
                                        name='type_document'
                                        placeholder=''
                                        options={options}
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
                                    <label htmlFor='nro-document'>Nro. documento</label>
                                    <input
                                        id='nro-document'
                                        type='text'
                                        className='form-control'
                                        {...formData.getFieldProps("nro_document")}
                                    />
                                    {
                                        formData.touched.nro_document && formData.errors.nro_document ? (
                                            <ErrorsMessage errors={formData.errors.nro_document} />
                                        ) : null
                                    }
                                </div>
                                <div className='form-group col-span-2 md:col-span-1'>
                                    <label htmlFor='fecha_nacimiento'>Fecha de nacimiento</label>
                                    <input
                                        id='fecha_nacimiento'
                                        type='date'
                                        className='form-control'
                                        {...formData.getFieldProps("birth_date")}
                                    />
                                    {
                                        formData.touched.birth_date && formData.errors.birth_date ? (
                                            <ErrorsMessage errors={formData.errors.birth_date} />
                                        ) : null
                                    }
                                </div>
                                <div className='form-group col-span-2 md:col-span-1'>
                                    <label htmlFor='telefono'>Teléfono</label>
                                    <input
                                        id='telefono'
                                        type='text'
                                        className='form-control'
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
                                        {...formData.getFieldProps("email")}
                                    />
                                    {
                                        formData.touched.email && formData.errors.email ? (
                                            <ErrorsMessage errors={formData.errors.email} />
                                        ) : null
                                    }
                                </div>
                                <div className='form-group col-span-2 md:col-span-1'>
                                    <label htmlFor='ocupacion'>Ocupación</label>
                                    <Select
                                        id='ocupacion'
                                        className='form-control'
                                        name='occupation'
                                        placeholder=''
                                        options={options2}
                                        onChange={(val) => handleChangeOccupation(formData, val)}
                                        onBlur={() => handleOnBlurOccupation(formData)}
                                        defaultValue={formData.values.occupation}
                                    />
                                    {
                                        formData.errors.occupation?.value ? (
                                            <ErrorsMessage errors={formData.errors.occupation?.value} />
                                        ) : null
                                    }
                                </div>
                                <div className='form-group col-span-2'>
                                    <label htmlFor='observacion'>Observacion</label>
                                    <textarea
                                        id='observacion'
                                        type='text'
                                        className='form-control'
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