import { useEffect, useContext } from 'react';
import { MenuContext } from '../../context/MenuContent';

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
                        <span class="material-icons">drag_handle</span>
                    </button>
                </div>
                <div className='flex flex-1 flex-col min-h-0 muiltr-mh0qts ps ps--active-y'>

                </div>
            </div>
        </div>
    )
}
export default Sidebar;