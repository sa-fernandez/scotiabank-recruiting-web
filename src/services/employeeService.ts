import { API_BASE_URL } from '../utils/apiConfig';
import { Employee } from '../models/Employee';
import { EmployeeRequest } from '../requests/EmployeeRequest';
import { EmployeeDetailsDTO } from '../dto/EmployeeDetailsDTO';
import { EmployeeViewDTO } from '../dto/EmployeeViewDTO';

export const getEmployeeById = async (id: number): Promise<Employee> => {
    try {
        const response = await fetch(`${API_BASE_URL}/employee/${id}`);
        if (!response.ok) throw new Error("Error fetching employee by ID");
        const data = await response.json();
        return data.message;
    } catch {
        throw new Error("Error fetching employee by ID");
    }
};

export const getAllEmployees = async (): Promise<Employee[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/employee/employees`);
        if (!response.ok) throw new Error("Error fetching employees");
        const data = await response.json();
        return data.message;
    } catch {
        throw new Error("Error fetching employees");
    }
};

export const createEmployee = async (employeeRequest: EmployeeRequest): Promise<Employee> => {
    try {
        const response = await fetch(`${API_BASE_URL}/employee/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employeeRequest),
        });
        if (!response.ok) throw new Error("Error creating employee");
        const data = await response.json();
        return data.message;
    } catch {
        throw new Error("Error creating employee");
    }
};

export const updateEmployee = async (id: number, employeeRequest: EmployeeRequest): Promise<Employee> => {
    try {
        const response = await fetch(`${API_BASE_URL}/employee/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employeeRequest),
        });
        if (!response.ok) throw new Error("Error updating employee");
        const data = await response.json();
        return data.message;
    } catch {
        throw new Error("Error updating employee");
    }
};

export const deleteEmployee = async (id: number): Promise<{ success: boolean; message: string }> => {
    try {
        const response = await fetch(`${API_BASE_URL}/employee/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error("Error deleting employee");
        const data = await response.json();
        return data.message;
    } catch {
        throw new Error("Error deleting employee");
    }
};

export const getEmployeeDetailsById = async (id: number): Promise<EmployeeDetailsDTO> => {
    try {
        const response = await fetch(`${API_BASE_URL}/employee/details/${id}`);
        if (!response.ok) throw new Error("Error fetching employee details by ID");
        const data = await response.json();
        return data.message;
    } catch {
        throw new Error("Error fetching employee details by ID");
    }
};

export const getEmployeeView = async (): Promise<EmployeeViewDTO[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/employee/view`);
        if (!response.ok) throw new Error("Error fetching employee view");
        const data = await response.json();
        return data.message;
    } catch {
        throw new Error("Error fetching employee view");
    }
};