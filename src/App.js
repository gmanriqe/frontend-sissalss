// 1ero: Paquetes de terceros
import RoutesComponent from './routes/index';
import { AuthProvider } from './context/AuthContent';
import { MenuProvider } from './context/MenuContent';

const App = () => {
    return (
        <div className="App">
            <AuthProvider>
                <MenuProvider>
                    <RoutesComponent />
                </MenuProvider>
            </AuthProvider>
        </div>
    );
}
export default App;
