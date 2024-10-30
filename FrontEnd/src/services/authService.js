// src/services/authService.js
import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

axios.defaults.withCredentials = true;

export const useAuthService = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  signup: async (name, email, password, confirmPassword, role) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_URL}/signup`,
        {
          name: name,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
          role: role,
        }
      );

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false, error: error.response.data.message });
      throw error;
    }
  },
  verifyEmail: async (verificationToken)=>{
    set({ isLoading: false, error: null});
    try {
      const response = await axios.post(`${API_URL}/verify-Email`,
        {
          code: verificationToken
        }
      );
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false, error: error.response.data.message });
        throw error;
    }
  }, 
  checkAuth: async ()=>{
    set({isCheckingAuth:true , error:null});
    try{
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        isCheckingAuth: false,
      });
    }catch(error){
      
      throw error;
    }
  },
  signin: async (email, password) => {
    set({isLoading: true, error: null});
    try {
      const response = await axios.post(`${API_URL}/signin`, 
        {email: email, password: password});
        set({
          user: response.data.user,
          isAuthenticated: true,
          isLoading: false,
          isCheckingAuth: false,
        })

      
    } catch (error) {
  
      set({ isLoading: false, error: error.response.data.message });
      throw error;
    }

  },
  signout: async() => {
    set({ user: null, isAuthenticated: false, isLoading: false });
    try {
      const response = await axios.post(`${API_URL}/logout`);
      localStorage.removeItem("token");
    } catch (error) {
      
    }
    
  },
}));
