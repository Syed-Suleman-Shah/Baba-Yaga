// src/services/authService.js
import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/admin";

axios.defaults.withCredentials = true;

export const useAuthService = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  errorMessage: null,
  setError: (message) => set({ errorMessage: message }),
  clearError: () => set({ errorMessage: null }),


  getSellers: async()=>{
    try{
      set({ isLoading: true, errorMessage: null });
      const response = await axios.get(`${API_URL}/view-users/sellers`);
      set({
        user: response.data.sellers,
        isLoading: false,
      });
    }catch(error){
      set({ isLoading: false, errorMessage: error.response.data.message });
      throw error;
    }
  },
}));
