import avatar from '../../assets/images/avatar_profile.jpeg';

const Header = () => {
    return (
        <header className='header flex z-20 shadow-md sticky top-0'>
            <div className='flex p-0 min-h-48 md:min-h-64'>
                <div className='flex flex-1 px-16'></div>
                <div className='flex items-center px-8 h-full overflow-x-auto'>
                    <button type='button' className='profile-header flex items-center min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6 muiltr-w3cj8e-MuiButtonBase-root-MuiButton-root'>
                        <div className='hidden md:flex flex-col mx-4 items-end'>
                            <span className='font-semibold flex muiltr-1niqtu4-MuiTypography-root'>Abbott Keitch</span>
                            <p className='text-11 font-medium capitalize'>admin</p>
                        </div>
                        <div className='profile-header__image md:mx-4'>
                            <img className='MuiAvatar-img muiltr-1pqm26d-MuiAvatar-img' alt='avatar' src={avatar} />
                        </div>
                    </button>
                </div>
            </div>
        </header>
    )
}
export default Header;