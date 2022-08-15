import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import avatar from '../../assets/images/avatar_profile.jpeg';
import { MenuContext } from '../../context/MenuContent';
import { AuthContext } from '../../context/AuthContent';
import jwtDecode from 'jwt-decode';

const Header = () => {
    const [isLogged, setIsLogged] = useContext(AuthContext);
    const [menu, setMenu] = useContext(MenuContext);

    let token = localStorage.getItem('token')
    let decoded = jwtDecode(token)

    const handleLogout = () => {
        setIsLogged(false)
        localStorage.removeItem('token')
        window.location.href = '/'
    }

    const handleToggleDropdown = () => {
        const $profile = document.getElementById('btn-profile')
        $profile.nextElementSibling.classList.toggle('show')
    }

    const handleClick = () => {
        const $menu = document.getElementById('menu-header')
        const $sidebar = document.getElementById('sidebar')

        $sidebar.classList.remove('hide-menu')
        $menu.remove()
        console.log(menu)
        setMenu(!menu)
    }

    window.handleClick = handleClick
    return (
        <header className='header flex z-20 shadow-md sticky top-0'>
            <div className='flex p-0 min-h-48 md:min-h-64'>
                <div className='flex items-center flex-1 px-16' id='opts-header'></div>
                <div className='profile-header flex items-center px-8 h-full'>
                    <button type='button' className='profile-header__btn flex items-center min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6' id='btn-profile' onClick={() => handleToggleDropdown()}>
                        <div className='hidden md:flex flex-col mx-4 items-end'>
                            <span className='font-semibold flex muiltr-1niqtu4-MuiTypography-root'>{`${decoded.first_name} ${decoded.last_name}`}</span>
                            <p className='text-11 font-medium capitalize'>{`${decoded.role}`}</p>
                        </div>
                        <div className='profile-header__image md:mx-4'>
                            <img className='' alt='avatar' src={avatar} />
                        </div>
                    </button>
                    <div className='profile-header__opt'>
                        <ul>
                            <li><Link to='perfil'><i className="material-icons profile-header__icon">account_circle</i> Mi perfil</Link></li>
                            <li><span onClick={() => handleLogout()}><i className="material-icons profile-header__icon">logout</i> Salir</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header;