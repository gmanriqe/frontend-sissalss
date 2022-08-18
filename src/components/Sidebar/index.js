import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { MenuContext } from '../../context/MenuContent';
import avatar from '../../assets/images/avatar_profile.png';
import { APIPermissionsMenu } from '../../api/menu';
import { groupBy } from '../../utils/utils';

const Sidebar = () => {
    const [menu, setMenu] = useContext(MenuContext);

    const [permissions, setPermissions] = useState([]);

    let token = localStorage.getItem('token')
    let decoded = jwt_decode(token)

    useEffect(() => {
        // Menu dinamic
        let username = {
            username: decoded.username
        }

        APIPermissionsMenu(username, (response) => {
            let data = response?.data?.data

            if (data) {
                let groupByMenu = groupBy(data, 'header_section')
                setPermissions(groupByMenu)
            }
        })
    }, []);

    const handleToggleMenuIcon = () => {
        const $sidebar = document.getElementById('sidebar')

        $sidebar.classList.add('hide-menu')
        setMenu(!menu)
        menu_()
    }

    const menu_ = () => {
        if(!!menu) {
            const $menu = document.getElementById('menu-header')
            if($menu) return
            
            // New element (menu)
            const $optsHeader = document.getElementById('opts-header')
            const elem = document.createElement('button')
            let attr = {
                type: 'button',
                class: 'w-40 h-40 p-0',
                id: 'menu-header',
                onclick: 'handleToggleMenuIcon()'
            }
            Object.keys(attr).forEach(key => {
                elem.setAttribute(key, attr[key])
            })
            elem.innerHTML = `<span class="material-icons">
                drag_handle
            </span>`
            $optsHeader.appendChild(elem)
        }
    }

    return (
        <div className='sidebar flex-col flex-auto sticky top-0 overflow-hidden h-screen shrink-0 z-20 shadow-5' id='sidebar'>
            <div className='sidebar__content flex flex-auto flex-col overflow-hidden h-full'>
                <div className='flex flex-row items-center shrink-0 h-48 md:h-72 px-20'>
                    <div className='flex flex-1 mx-4'>

                    </div>
                    <button type="button" className="w-40 h-40 p-0" id='menu' onClick={() => handleToggleMenuIcon()}>
                        <span className="material-icons">drag_handle</span>
                    </button>
                </div>
                <div className='flex flex-1 flex-col min-h-0 muiltr-mh0qts ps ps--active-y'>
                    {/* perfil */}
                    <div className="user-profile relative flex flex-col items-center justify-center p-16 pb-14 shadow-0">
                        <div className="flex items-center justify-center mb-24">
                            <figure className="text-32 font-bold w-96 h-96">
                                <img alt="Abbott Keitch" src={avatar} className='rounded-full' />
                            </figure>
                        </div>
                        <p className="text-14 font-medium whitespace-nowrap">{`${decoded.first_name} ${decoded.last_name}`}</p>
                        <p className="user-profile__mail text-13 font-medium whitespace-nowrap">{decoded.email.toLowerCase()}</p>
                    </div>
                    <ul className='main-menu'>
                        {
                            Object.keys(permissions).map((key, index) => (
                                <li key={index}>
                                    <div className='main-menu__header'>
                                        <h6>{Object.keys(permissions)[index].split(' - ')[0]}</h6>
                                        <small>{Object.keys(permissions)[index].split(' - ')[1]}</small>
                                    </div>
                                    <ul className='main-menu__list'>
                                        {
                                            permissions[Object.keys(permissions)[index]].map((item, idx) => (
                                                <li key={idx}>
                                                    <Link to={item.path}><span className="material-icons align-middle">{item.icon}</span>{item.name_items}</Link>
                                                </li>
                                            ))
                                        }
                                    </ul>

                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Sidebar;