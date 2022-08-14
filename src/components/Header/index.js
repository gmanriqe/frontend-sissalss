import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import avatar from '../../assets/images/avatar_profile.jpeg';
import { MenuContext } from '../../context/MenuContent';
import { AuthContext } from '../../context/AuthContent';

const Header = () => {
    const [isLogged, setIsLogged] = useContext(AuthContext);
    const [menu, setMenu] = useContext(MenuContext);

    useEffect(() => {
        if(!menu) {
            const $menu = document.getElementById('menu-header')
            if($menu) return
            // New element (menu)
            const $optsHeader = document.getElementById('opts-header')
            const elem = document.createElement('button')
            let attr = {
                type: 'button',
                class: 'w-40 h-40 p-0',
                id: 'menu-header',
                onclick: 'handleClick()'
            }
            Object.keys(attr).forEach(key => {
                elem.setAttribute(key, attr[key])
            })
            elem.innerHTML = `<span class="material-icons">
                drag_handle
            </span>`
            $optsHeader.appendChild(elem)
        }
    }, []);

    const handleLogout = () => {
        setIsLogged(false)
        localStorage.removeItem('token')
        window.location.href = '/'
    }

    const handleToggleDropdown = () => {
        const $profile = document.getElementById('btn-profile')
        // Profile
        $profile.addEventListener('click', () => {
            $profile.nextElementSibling.classList.toggle('show')
        })
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
                    <button type='button' className='profile-header__btn flex items-center min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6' id='btn-profile' onClick={() => {handleToggleDropdown()}}>
                        <div className='hidden md:flex flex-col mx-4 items-end'>
                            <span className='font-semibold flex muiltr-1niqtu4-MuiTypography-root'>Abbott Keitch</span>
                            <p className='text-11 font-medium capitalize'>admin</p>
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