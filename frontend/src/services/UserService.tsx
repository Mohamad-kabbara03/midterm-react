import { getToken } from "../utils/localStorageUtils";
import http from "../http-common";

interface AuthData {
    email: string;
    password: string;
}

const getAll = () => {
    return http.get(`/users`, {
        headers: {
            Authorization: `Bearer ${getToken() || ''}`
        }
    });
};

const authenticate = (userData: AuthData) => {
    return http.post(`/auth/login`, userData, {
        headers: {
            Authorization: `Bearer ${getToken() || ''}`
        }
    });
};

const  getUserDetails = () => {
    return http.get(`/auth/user-details`, {
        headers: {
            Authorization: `Bearer ${getToken() || ''}`
        }
    });
};


const registerUser = (userData: any) => {
    return http.post('/auth/register', userData, {
        headers: {
            Authorization: `Bearer ${getToken() || ''}`
        }
    });
};

  

const getUsers = () =>{
    return http.get(`/users`, {
        headers: {
            Authorization: `Bearer ${getToken() || ''}`
        }
    });
}

const getUserDetailsByID = () => {
    return http.get(`/auth/user-details`, {
        headers: {
            Authorization: `Bearer ${getToken() || ''}`
        }
    });
};

const UserService = {
    getAll,
    authenticate,
    getUsers,
    getUserDetails,
    registerUser
};


export default UserService;
