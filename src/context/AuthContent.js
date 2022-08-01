
import { createContext, useState } from "react";

const AuthInitial = false

// Creacion de context
export const AuthContext = createContext(AuthInitial);

// Creacion de provider
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(AuthInitial);

    return (
        // llamado al contexto y sus valores
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}