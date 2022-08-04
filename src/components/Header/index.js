import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import avatar from '../../assets/images/avatar_profile.jpeg';

const Header = () => {
    useEffect(() => {
        const $profile = document.getElementById('btn-profile')
        $profile.addEventListener('click', () => {
            $profile.nextElementSibling.classList.toggle('show')
        })
    });

    return (
        <header className='header flex z-20 shadow-md sticky top-0'>
            <div className='flex p-0 min-h-48 md:min-h-64'>
                <div className='flex flex-1 px-16'></div>
                <div className='profile-header flex items-center px-8 h-full'>
                    <button type='button' className='profile-header__btn flex items-center min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6' id='btn-profile'>
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
                            <li><Link to='perfil'><i class="material-icons profile-header__icon">account_circle</i> Mi perfil</Link></li>
                            <li><Link to='salir'><i className="material-icons profile-header__icon">logout</i> Salir</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header;