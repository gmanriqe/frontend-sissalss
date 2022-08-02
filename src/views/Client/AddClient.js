import {useState} from 'react';
import {
    Formik,
    Form
} from 'formik';
import Select from 'react-select'
import PageHeader from '../../components/PageHeader';
import ErrorsMessage from '../../components/ErrorMessage';

const breadcrumbs = [{ names: 'Clientes', link: '/clientes' }, { names: 'Nuevo', link: '/clientes/nuevo' }]

// Options for select
const options = [
    { value: '', label: 'SELECCIONE..'},
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

/**
 * Handle submit form
 */
const handleSubmit = (values, formData) => {
    alert('submit')
}

/**
 * Validate form
 */
 const validateMainForm = (values) => {
    const errors = {};
    console.log(values)
    if (values.first_name.trim().length === 0) {
        errors.first_name = 'El nombre es requerido'
    }
    if (values.last_name.trim().length === 0) {
        errors.last_name = 'El apellido es requerido'
    }
    if (values.type_document.value === '') {
        errors.type_document = 'El tipo de documento es requerido'
    }
    if (values.nro_document.trim().length === 0) {
        errors.nro_document = 'El nro de documento es requerido'
    }
    if (values.birth_date.trim().length === 0) {
        errors.birth_date = 'La fecha de nacimiento es requerida'
    }
    if (values.phone.trim().length === 0) {
        errors.phone = 'El teléfono es requerido'
    }
    if (values.email.trim().length === 0) {
        errors.email = 'El email es requerido'
    }
    if (values.occupation.trim().length === 0) {
        errors.occupation = 'La ocupación es requerido'
    }
    if (values.observation.trim().length === 0) {
        errors.observation = 'La observación es requerido'
    }
    return errors
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

    return (
        <div className='main main-addclient'>
            <PageHeader title={'NUEVO CLIENTE'} breadcrumbs={breadcrumbs} />
            <div className='mx-auto p-20 container'>
                <div className='card p-20 overflow-x-auto relative'>
                    <Formik
                        initialValues={{
                            first_name: '',
                            last_name: '',
                            type_document: { value: '', label: 'SELECCIONE..'},
                            nro_document: '',
                            birth_date: '',
                            phone: '',
                            email: '',
                            occupation: '',
                            observation: '',
                        }}
                        validate={validateMainForm}
                        onSubmit={handleSubmit}
                    >
                        {(formData) => (
                            <Form className='grid grid-cols-2 gap-20'>
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
                                        formData.touched.type_document && formData.errors.type_document ? (
                                            <ErrorsMessage errors={formData.errors.type_document} />
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
                                    <select className='form-control' id='ocupacion' name='occupation'></select>
                                    {
                                        formData.touched.occupation && formData.errors.occupation ? (
                                            <ErrorsMessage errors={formData.errors.occupation} />
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