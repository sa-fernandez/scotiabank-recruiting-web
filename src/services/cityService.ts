import { API_BASE_URL } from '../utils/apiConfig';
import { City } from '../models/City';

export const getCityById = async (id: number): Promise<City> => {
    try {
        const response = await fetch(`${API_BASE_URL}/city/${id}`);
        if (!response.ok) throw new Error("Error fetching city by ID");
        const data = await response.json();
        return data.message;
    } catch {
        throw new Error("Error fetching city by ID");
    }
};

export const getAllCities = async (): Promise<City[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/city/cities`);
        if (!response.ok) throw new Error("Error fetching cities");
        const data = await response.json();
        return data.message;
    } catch {
        throw new Error("Error fetching cities");
    }
};

export const createCity = async (cityRequest: City): Promise<City> => {
    try {
        const response = await fetch(`${API_BASE_URL}/city/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cityRequest),
        });
        if (!response.ok) throw new Error("Error creating city");
        const data = await response.json();
        return data.message;
    } catch {
        throw new Error("Error creating city");
    }
};

export const updateCity = async (id: number, cityRequest: City): Promise<City> => {
    try {
        const response = await fetch(`${API_BASE_URL}/city/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cityRequest),
        });
        if (!response.ok) throw new Error("Error updating city");
        const data = await response.json();
        return data.message;
    } catch {
        throw new Error("Error updating city");
    }
};

export const deleteCity = async (id: number): Promise<{ success: boolean; message: string }> => {
    try {
        const response = await fetch(`${API_BASE_URL}/city/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error("Error deleting city");
        const data = await response.json();
        return data.message;
    } catch {
        throw new Error("Error deleting city");
    }
};