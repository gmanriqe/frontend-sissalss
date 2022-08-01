// 1ero: Paquetes de terceros
import RoutesComponent from './routes/index';
import { AuthProvider } from './context/AuthContent';

const App = () => {
    return (
        <div className="App">
            <AuthProvider>
                <RoutesComponent />
            </AuthProvider>
        </div>
    );
}
export default App;
