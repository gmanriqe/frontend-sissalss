import jwtDecode from 'jwt-decode';
import { ROLE } from '../config';

export const useIsRole = (roleToCompare) => {
    let token = localStorage.getItem('token')
    let { role } = jwtDecode(token)

    return role === roleToCompare
}

export const useIsAdmin = () => {
    const isAdmin = useIsRole(ROLE.ADMIN)
    return isAdmin
}

