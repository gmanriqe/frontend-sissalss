import PageHeader from '../../components/PageHeader';
const breadcrumbs = [{ names: 'Lista', link: '/personal' }, { names: 'Nuevo', link: '/personal/nuevo' }]

const AddStaff = () => {
    return (
        <div className='main main-addclient'>
            <PageHeader title={'PERSONAL'} breadcrumbs={breadcrumbs} />
            <div className='mx-auto p-20 container'>
                <div className='card p-20 overflow-x-auto relative'>
                    
                </div>
            </div>
        </div>
    )
}
export default AddStaff;