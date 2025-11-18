import React, {createContext, useState} from 'react';
import {ACCESS_TOKEN, PROFILE} from "../constant/ConstantVariables.js";
import AuthService from "../services/AuthService.js";
import {getErrorMessage} from "../utils/GenericUtils.js";
import {Toast} from "../components/common/Toast.jsx";

export const AuthContext = createContext("AuthContext");

const token = localStorage.getItem(ACCESS_TOKEN);
let _profile = localStorage.getItem(PROFILE);
_profile = _profile ? JSON.parse(_profile) : null;

const AuthContextProvider = ({children}) => {

    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(!!token);
    const [profile, setProfile] = useState(_profile);

    const login = async (data) => {
        try {
            setLoading(true);
            const res = await AuthService.login(data);

            Toast("success", "Login Successful", "You have been logged in successfully");

            setProfile(res.data.user);
            setIsLogin(true);

            localStorage.setItem(PROFILE, JSON.stringify(res.data.user));
            localStorage.setItem(ACCESS_TOKEN, res.data.token);

            return true;
        } catch (error) {
            const message = getErrorMessage(error);
            Toast("error", "Login Failed", message);
            return false;
        } finally {
            setLoading(false);
        }
    }

    const register = async (data) => {
        try {
            setLoading(true);
            const res = await AuthService.register(data);

            Toast("success", "Registration Successful", "Your account has been created successfully");

            setProfile(res.data.user);
            setIsLogin(true);

            localStorage.setItem(PROFILE, JSON.stringify(res.data.user));
            localStorage.setItem(ACCESS_TOKEN, res.data.token);

            return true;
        } catch (error) {
            const message = getErrorMessage(error);
            Toast("error", "Registration Failed", message);
            return false;
        } finally {
            setLoading(false);
        }
    }

    const logout = () => {
        setIsLogin(false);
        setProfile(null);
        localStorage.removeItem(PROFILE);
        localStorage.removeItem(ACCESS_TOKEN);
        Toast("success", "Logged Out", "You have been logged out successfully");
    }

    const getProfile = async () => {
        try {
            setLoading(true);
            const res = await AuthService.getMe();
            // Handle backend response structure (res.data.user or res.data)
            const userData = res.data?.user || res.data;
            setProfile(userData);
            localStorage.setItem(PROFILE, JSON.stringify(userData));
        } catch (error) {
            const message = getErrorMessage(error);
            Toast("error", "Error", message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                login,
                register,
                logout,
                getProfile,
                isLogin,
                profile,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
