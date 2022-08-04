
import { createContext, useState } from "react";

const MenuInitial = true

// Creacion de context
export const MenuContext = createContext(MenuInitial);

// Creacion de provider
export const MenuProvider = ({ children }) => {
    const [menu, setMenu] = useState(MenuInitial);

    return (
        // llamado al contexto y sus valores
        <MenuContext.Provider value={[menu, setMenu]}>
            {children}
        </MenuContext.Provider>
    )
}