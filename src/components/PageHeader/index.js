import { Link } from 'react-router-dom'
const PageHeader = ({title, breadcrumbs}) => {
    return (
        <div className='page-header'>
            <div className='mx-auto p-20 container '>
                <nav className='page-breadcrumb'>
                    <ul>
                        {
                            breadcrumbs.map((breadcrumb, index) => {
                                return (
                                    <li key={index}><Link to={breadcrumb.link}>{breadcrumb.names}</Link></li>
                                )
                            })
                        }
                    </ul>
                </nav>
                <h1 className='text-3xl md:text-4xl font-extrabold mt-8'>{title}</h1>
            </div>
        </div>
    )
}
export default PageHeader;