// 1ero: Paquetes de terceros
import { Outlet } from 'react-router-dom';
// 2do: Paquetes de mi propio proyecto
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';




export const Layout1 = () => {
	return (
		<div>
			<div className="layout">
				<Sidebar></Sidebar>
				<main className={`main`}>
					<Header></Header>
					<Outlet />
				</main>
			</div>
			<footer>Copyright 2022</footer>
		</div>
	);
}

export const Layout2 = () => {
	return (
		<div>
			<Outlet />
		</div>
	);
}