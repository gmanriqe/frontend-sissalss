import { useEffect, useState } from 'react';
import {
    Formik,
    Form
} from 'formik';
import Select from 'react-select'
import Flatpickr from "react-flatpickr";
import { Spanish } from 'flatpickr/dist/l10n/es.js'; // configure language for flatpickr
import PageHeader from '../../components/PageHeader';
import ErrorsMessage from '../../components/ErrorMessage';
import { APIListTypeDocument } from '../../api/type_document'
import { CONFIG_HEADER, SEX } from '../../config/index.js'

const breadcrumbs = [{ names: 'Clientes', link: '/clientes' }, { names: 'Nuevo', link: '/clientes/nuevo' }]
/*
 * Brith date
 */
/*
const handleChangeBirthDate = (formData, val) => {
    const $birthDate = val.length === 0 ? '' : new Date(new Date(val[0]).setHours(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()))
    // formData.setFieldValue('birth_date', selectedDate)
    formData.setFieldValue('birth_date', $birthDate)
}

const handleOnBlurBirthDate = (formData) => {
    formData.setFieldTouched('birth_date', true)
}
*/

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
    }
}

const handleKeypressNumberDocument = (evt) => {
    const $numberDocument = evt.target
    const maxLength = $numberDocument.dataset.maxlength

    if($numberDocument.value.length > maxLength){
        evt.target.value = $numberDocument.value.substring(0, maxLength)
    }
}

const handleChangetypeDocument = (selectedOption, formData) => {
    const $nroDocument = document.getElementById('number-document')

    formData.setFieldValue('type_document', selectedOption)
    formData.setFieldValue('number_document', '')

    if (selectedOption.value === '') {
        $nroDocument.setAttribute('disabled', 'disabled')
        
    } else {
        $nroDocument.removeAttribute('disabled')
        checkCharacter(selectedOption.label, formData)
    }

}
const handleOnBlurTypeDocument = (formData) => {
    formData.setFieldTouched('type_document', true)
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
    if (values.type_document.value !== '' && values.number_document.toString().trim().length === 0) {
        errors.message_error_number_document = 'Campo requerido*'
    }
    if (values.telephone.toString().trim().length === 0) {
        errors.message_error_telephone = 'Campo requerido*'
    }
    if (values.email.trim().length === 0) {
        errors.message_error_email = 'Campo requerido*'
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
const handleSubmitCustomer = (values, formData) => {
    alert(JSON.stringify(values))
}

const AddClient = () => {
    let [typeDocuments, setTypeDocuments] = useState([])

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
            <div className='mx-auto p-20 container'>
                <div className='card p-20 overflow-x-auto relative'>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            first_name: '',
                            last_name: '',
                            type_document: typeDocuments[0],
                            number_document: '',
                            telephone: '',
                            email: '',
                            // birth_date: '',
                            sex: SEX[0],
                            observation: '',
                        }}
                        validate={validateFormCustomer}
                        onSubmit={handleSubmitCustomer}
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
                                    <label htmlFor='type-document'>Tipo documento</label>
                                    <Select
                                        id='type-document'
                                        className='form-control'
                                        style={{ textTransform: 'uppercase' }}
                                        // name='type_document'
                                        placeholder=''
                                        options={typeDocuments}
                                        onChange={(val) => handleChangetypeDocument(val, formData)}
                                        onBlur={() => handleOnBlurTypeDocument(formData)}
                                        value={formData.values.type_document}
                                    />
                                    {
                                        formData.touched.type_document && formData.errors.type_document ? (
                                            <ErrorsMessage errors={formData.errors.type_document} />
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
                                        onInput={(evt) => handleKeypressNumberDocument(evt)}
                                        {...formData.getFieldProps("number_document")}
                                    />
                                    {
                                        formData.touched.number_document && formData.errors.message_error_number_document ? (
                                            <ErrorsMessage errors={formData.errors.message_error_number_document} />
                                        ) : null
                                    }
                                </div>
                                <div className='form-group col-span-2 md:col-span-1'>
                                    <label htmlFor='telephone'>Teléfono</label>
                                    <input
                                        id='telephone'
                                        type='number'
                                        className='form-control'
                                        style={{ textTransform: 'uppercase' }}
                                        {...formData.getFieldProps("telephone")}
                                    />
                                    {
                                        formData.touched.telephone && formData.errors.message_error_telephone ? (
                                            <ErrorsMessage errors={formData.errors.message_error_telephone} />
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
                                </div>
                                {/* <div className='form-group col-span-2 md:col-span-1'>
                                    <label htmlFor='birth-date'>Fecha de nacimiento</label>
                                    <Flatpickr
                                        id='birth-date'
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
                                </div>*/}
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
                                    <label htmlFor='observation'>Observación</label>
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
                                <div className='form-group col-span-2 text-right'>
                                    <button type='submit' className='btn-rds'>
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
export default AddClient;