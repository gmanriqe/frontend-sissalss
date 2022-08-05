import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { MenuContext } from '../../context/MenuContent';
import avatar from '../../assets/images/avatar_profile.jpeg';

const Sidebar = () => {
    const [menu, setMenu] = useContext(MenuContext);

    useEffect(() => {
        const $menu = document.getElementById('menu')
        const $sidebar = document.getElementById('sidebar')

        $menu.addEventListener('click', () => {
            setMenu(!menu)
            $sidebar.classList.add('hide-menu')
            console.log(menu)
        })
    }, [menu, setMenu]);


    return (
        <div className='sidebar flex-col flex-auto sticky top-0 overflow-hidden h-screen shrink-0 z-20 shadow-5' id='sidebar'>
            <div className='sidebar__content flex flex-auto flex-col overflow-hidden h-full'>
                <div className='flex flex-row items-center shrink-0 h-48 md:h-72 px-20'>
                    <div className='flex flex-1 mx-4'>

                    </div>
                    <button type="button" className="w-40 h-40 p-0" id='menu'>
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
                        <p className="text-14 font-medium whitespace-nowrap">Jesús Gonzales</p>
                        <p className="user-profile__mail text-13 font-medium whitespace-nowrap">jgonzales@luchasalonspa.pe</p>
                    </div>
                    {/* menu */}
                    <ul className='main-menu'>
                        <li>
                            <div className='main-menu__header'>
                                <h6>Control</h6>
                                <small>Control del personal</small>
                            </div>
                            <ul className='main-menu__list'>
                                <li><Link to='/personal'><span className="material-icons align-middle">groups</span>Personal</Link></li>
                            </ul>
                        </li>
                        <li>
                            <div className='main-menu__header'>
                                <h6>Citas</h6>
                                <small>Citas y clientas</small>
                            </div>
                            <ul className='main-menu__list'>
                                <li><Link to='/citas'><span className="material-icons align-middle">volunteer_activism</span>Citas</Link></li>
                                <li><Link to='/clientes'><span className="material-icons align-middle">group</span>Clientes</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Sidebar;