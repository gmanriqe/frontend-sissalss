import { useEffect, useState } from 'react';
import {
    Formik,
    Form
} from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select'
import Flatpickr from "react-flatpickr";
import { Spanish } from 'flatpickr/dist/l10n/es.js'; // configure language for flatpickr
import PageHeader from '../../components/PageHeader';
import ErrorsMessage from '../../components/ErrorMessage';
import { APIListTypeDocument, fetchData, fetchPostData } from '../../api/type_document'
import { CONFIG_HEADER, SEX, URL_API } from '../../config/index.js'
import {
    disableSubmit,
    enableSubmit,
    validOnlyNumber,
    validateEmail,
    validateLengthTypeDocument
} from '../../utils/utils';

// Day
import * as dayjs from 'dayjs'
// Swal
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
// Redux RTK
import { useSelector } from 'react-redux'
// Axios
import axios from 'axios'

dayjs.locale('es') // use Spanish locale globally
const MySwal = withReactContent(Swal);
const breadcrumbs = [{ names: 'Clientes', link: '/clientes' }]
let global_length_type_document = null
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
// CONFIG_HEADER.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')

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
        errors.message_error_number_document_length = 'Número de documento inválido*'
    }
    if (values.email.trim().length === 0) {
        errors.message_error_email = 'Campo requerido*'
    } else if (validateEmail(values.email.trim()) === false) {
        errors.message_error_email_formato = 'Formato inválido*'
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
const handleSubmitCustomer = (values, id) => {
    const $btn = document.getElementById('btn-save')
    disableSubmit($btn)

    let data = {}
    data.first_name = values.first_name.toUpperCase()
    data.last_name = values.last_name.toUpperCase()
    data.telephone = values.telephone.toString()
    data.birthday = values.birthday.split('T')[0]
    data.email = values.email.toUpperCase()
    data.sex = Number(values.sex.value)
    data.observation = values.observation.toUpperCase()
    data.id_type_document = values.id_type_document.value === '' ? null : Number(values.id_type_document.value)
    data.document_number = values.document_number ? values.document_number.toString() : null

    async function fetchEditCustomer() {
        try {
            const response = await fetchPostData(`/edit_customer/${id}`, data)
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
                }).catch(() => {
                    enableSubmit($btn)
                })
            }
        } finally {
            console.log('finally')
        }
    }
    fetchEditCustomer()
}

/**
 * Redux filter value
 */
const reduxGetCustomer = async (listData, id) => {
    let filterData = await listData.filter((item) => item.id === Number(id))

    return filterData[0] // set data to state
}

/**
 * Set value type document
 */
const setValueTypeDocument = async (listTypeDocument, _data) => {
    if (_data.id_type_document) {
        let typeDocument = await listTypeDocument.filter(item => item.value === _data.id_type_document.toString())
        return typeDocument[0]
    } else {
        return { label: 'SELECCIONE..', value: '' }
    }
}

/**
 * Build variable type document
 */
const fnTypeDocument = (listTypeDocument) => {
    let filterTypeDocument = listTypeDocument.filter((item) => {
        return item.state === 1
    })

    let listTypeDocuments = [{ label: 'SELECCIONE..', value: '' }]

    filterTypeDocument.map((item) => (
        listTypeDocuments.push({ label: item.name_document, value: item.id.toString() })
    ))

    return listTypeDocuments
}

const setTypeDocument = async (filterDocument, _data, setSelectedTypeDocument) => {
    let typeDocument = await setValueTypeDocument(filterDocument, _data) // set value sex
    setSelectedTypeDocument(typeDocument)
}

const setValueSex = async (_data, setSelectedTypeSex) => {
    if (_data.sex === 1 || _data.sex === 2 || _data.sex === 0) {
        let sex = await SEX.filter(item => item.value === _data.sex.toString())
        setSelectedTypeSex(sex[0])
    }
}

const EditCustomer = () => {
    const [_data, _setData] = useState({}); // Fetching data to Redux RTK
    const [stateTypeDocuments, setStateTypeDocuments] = useState([])

    const [selectedTypeSex, setSelectedTypeSex] = useState('')
    const [selectedTypeDocument, setSelectedTypeDocument] = useState('')

    const navigate = useNavigate();
    const { id } = useParams()
    const listData = useSelector(state => state.customer.data)

    useEffect(() => {
        async function fetchTypeDocument() {
            try {
                const response = await fetchData('/list_type_document', CONFIG_HEADER)
                const data = await response.data.data
                let listTypeDocument = await JSON.parse(data)

                let customer = await reduxGetCustomer(listData, id)
                _setData(customer)

                let filterDocument = await fnTypeDocument(listTypeDocument)
                setStateTypeDocuments(filterDocument)

                setValueSex(_data, setSelectedTypeSex) // set value sex
                setTypeDocument(filterDocument, _data, setSelectedTypeDocument) // set value type document
            } finally {
                console.log('finally')
            }
        }

        fetchTypeDocument()

    }, [_data, listData, id]);

    return (
        <div className='main main-addclient'>
            <PageHeader title={'EDITAR'} breadcrumbs={breadcrumbs} />
            <div className='mx-auto p-20 max-w-7xl'>
                <div className='card p-20 overflow-x-auto relative'>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            first_name: _data ? _data.first_name : '',
                            last_name: _data ? _data.last_name : '',
                            id_type_document: selectedTypeDocument, // selectedTypeDocument - validate all into
                            document_number: _data ? _data.document_number : '',
                            telephone: _data ? _data.telephone : '',
                            email: _data ? _data.email : '',
                            birthday: _data ? _data.birthday : '',
                            sex: selectedTypeSex, // selectedTypeSex - validate all into
                            observation: _data ? _data.observation ?? '' : '',
                        }}
                        validate={validateFormCustomer}
                        onSubmit={(val, formData) => handleSubmitCustomer(val, id)}
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
                                        disabled='disabled'
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
                                        disabled='disabled'
                                    />
                                    {
                                        formData.touched.last_name && formData.errors.message_error_last_name ? (
                                            <ErrorsMessage errors={formData.errors.message_error_last_name} />
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
                                            dateFormat: 'd M Y',
                                            locale: Spanish,
                                            disableMobile: "true",
                                        }}
                                        onChange={(val) => handleChangeBirthDate(val, formData)}
                                        onBlur={() => handleOnBlurBirthDate(formData)}
                                        value={formData.values.birthday}
                                        disabled='disabled'
                                    />
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
                                        placeholder=''
                                        options={SEX}
                                        onChange={(val) => handleChangeSex(val, formData)}
                                        onBlur={() => handleOnBlurSex(formData)}
                                        value={formData.values.sex}
                                        isDisabled
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
                                <div className='form-group col-span-2 md:col-span-1'>
                                    <label htmlFor='type-document'>Tipo documento</label>
                                    <Select
                                        id='type-document'
                                        className='form-control'
                                        style={{ textTransform: 'uppercase' }}
                                        placeholder=''
                                        options={stateTypeDocuments}
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
export default EditCustomer;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator