import { API_BASE_URL } from '../utils/apiConfig';
import { Position } from '../models/Position';

export const getPositionById = async (id: number): Promise<Position> => {
    try {
        const response = await fetch(`${API_BASE_URL}/position/${id}`);
        if (!response.ok) throw new Error("Error fetching position by ID");
        const data = await response.json();
        return data.message;
    } catch {
        throw new Error("Error fetching position by ID");
    }
};

export const getAllPositions = async (): Promise<Position[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/position/positions`);
        if (!response.ok) throw new Error("Error fetching positions");
        const data = await response.json();
        return data.message;
    } catch {
        throw new Error("Error fetching positions");
    }
};

export const createPosition = async (positionRequest: Position): Promise<Position> => {
    try {
        const response = await fetch(`${API_BASE_URL}/position/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(positionRequest),
        });
        if (!response.ok) throw new Error("Error creating position");
        const data = await response.json();
        return data.message;
    } catch {
        throw new Error("Error creating position");
    }
};

export const updatePosition = async (id: number, positionRequest: Position): Promise<Position> => {
    try {
        const response = await fetch(`${API_BASE_URL}/position/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(positionRequest),
        });
        if (!response.ok) throw new Error("Error updating position");
        const data = await response.json();
        return data.message;
    } catch {
        throw new Error("Error updating position");
    }
};

export const deletePosition = async (id: number): Promise<{ success: boolean; message: string }> => {
    try {
        const response = await fetch(`${API_BASE_URL}/position/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error("Error deleting position");
        const data = await response.json();
        return data.message;
    } catch {
        throw new Error("Error deleting position");
    }
};