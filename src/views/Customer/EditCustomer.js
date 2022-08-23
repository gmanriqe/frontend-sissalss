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

const validateFormCustomer = () => {

}


const handleSubmitCustomer = () => {}

const EditCustomer = () => {
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
                                            // dateFormat: 'l, d M',
                                            dateFormat: 'd M Y',
                                            locale: Spanish,
                                            // minDate: "today",
                                            disableMobile: "true"
                                        }}
                                        // onChange={(val) => handleChangeBirthDate(val, formData)}
                                        // onBlur={() => handleOnBlurBirthDate(formData)}
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
                                        // onChange={(val) => handleChangeSex(val, formData)}
                                        // onBlur={() => handleOnBlurSex(formData)}
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
                                <div className='form-group col-span-2 md:col-span-1'>
                                    <label htmlFor='type-document'>Tipo documento</label>
                                    <Select
                                        id='type-document'
                                        className='form-control'
                                        style={{ textTransform: 'uppercase' }}
                                        // name='id_type_document'
                                        placeholder=''
                                        options={typeDocuments}
                                        // onChange={(val) => handleChangetypeDocument(val, formData)}
                                        // onBlur={() => handleOnBlurTypeDocument(formData)}
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
                                        // onInput={(evt) => handlerInputNumberDocument(evt)}
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