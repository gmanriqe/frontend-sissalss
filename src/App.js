// 1ero: Paquetes de terceros
import RoutesComponent from './routes/index';
import { MenuProvider } from './context/MenuContent';
// Redux
import { Provider } from 'react-redux';
import { store } from './app/store';

const App = () => {
    return (
        <div className="App">
            <Provider store={store}>
                <MenuProvider>
                    <RoutesComponent />
                </MenuProvider>
            </Provider>
        </div >
    );
}
export default App;
