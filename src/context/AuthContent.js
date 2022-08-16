
import { createContext, useReducer } from "react";
import { types } from "./Auth/type";
import { authReducer } from '../redux/task/auth/authReducer';

const init = () => {
    const user = JSON.parse( localStorage.getItem('user') );
  
    return {
      logged: !!user,
      user: user,
    }
}

// Creacion de context
export const AuthContext = createContext();

/* 
* Creacion de provider - Cada objeto Context viene con un componente Provider de React 
* que permite que los componentes que lo consumen se suscriban a los cambios del contexto.
*/
export const AuthProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {}, init);

    const login = (name = '') => {

        const user = { id: 'ABC', name }
        const action = { type: types.login, payload: user }

        localStorage.setItem('user', JSON.stringify(user));

        dispatch(action);
    }

    const logout = () => {
        localStorage.removeItem('user');
        const action = { type: types.logout };
        dispatch(action);
    }

    return (
        <AuthContext.Provider value={{
            ...authState,

            // Methods
            login,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
}