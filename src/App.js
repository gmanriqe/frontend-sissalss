// 1ero: Paquetes de terceros5dsdeewe<55e43h
import RoutesComponent from './router/index';
import { MenuProvider } from './context/MenuContent';
import { AuthProvider } from './context/AuthContent';
// Redux
import { Provider } from 'react-redux';
import { store } from './redux/store/store';

const App = () => {
    return (
        <div className="App">
            <Provider store={store}>
                <AuthProvider>
                    <MenuProvider>
                        <RoutesComponent />
                    </MenuProvider>
                </AuthProvider>
            </Provider>
        </div >
    );
}
export default App;
