import { useState, createContext, useContext } from "react";
import axios from "axios";
import { REACT_API_BASE_URL } from "../../actions/types";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [role, setRole] = useState('');

    const load_user = async () => {
        if (localStorage.getItem("access")) {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${localStorage.getItem("access")}`,
                    "accept": "application/json"
                }
            };
    
            try {
                const res = await axios.get(REACT_API_BASE_URL + `auth/users/me`, config);
                localStorage.setItem("userRole", res.data['role'])
                setRole(localStorage.getItem('userRole'))
            } catch (err) {
                console.log(err)
            }
        } else {
            console.log('error loading access token')
        }
    };

    return (
        <AuthContext.Provider value={{ role, load_user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}