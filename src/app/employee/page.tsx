"use client";

import React, { useEffect, useState } from 'react';
import { deleteEmployee, getEmployeeView } from '../../services/employeeService';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/src/utils/dateFormat';
import { EmployeeViewDTO } from '@/src/dto/EmployeeViewDTO';

const EmployeeView = () => {
    const [employees, setEmployees] = useState<EmployeeViewDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const fetchEmployees = async () => {
            setLoading(true);
            try {
                const data = await getEmployeeView();
                setEmployees(data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteEmployee(id);
            setEmployees(employees.filter((employee) => employee.id != id));
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    }

    if (loading) return <p className="text-center py-4">Fetching employees...</p>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Employee Viewer</h2>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">First Name</th>
                        <th className="py-3 px-6 text-left">Last Name</th>
                        <th className="py-3 px-6 text-left">Position Title</th>
                        <th className="py-3 px-6 text-left">Date Arrival</th>
                        <th className="py-3 px-6 text-left">Status</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {employees.map((employee) => (
                        <tr key={employee.id} className="border-b hover:bg-gray-100">
                            <td className="py-3 px-6">{employee.firstName}</td>
                            <td className="py-3 px-6">{employee.lastName}</td>
                            <td className="py-3 px-6">{employee.positionTitle || 'N/A'}</td>
                            <td className="py-3 px-6">{formatDate(employee.dateArrival)}</td>
                            <td className="py-3 px-6">{employee.status}</td>
                            <td className="py-3 px-6 text-center">
                                <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600" onClick={() => router.push(`/employee/${employee.id}`)}>
                                    Details
                                </button>
                                <button className="bg-amber-300 text-white py-1 px-3 rounded hover:bg-amber-400 ml-2" onClick={() => router.push(`/employee/${employee.id}/update`)}>
                                    Update
                                </button>
                                <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 ml-2" onClick={() => handleDelete(employee.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button 
                onClick={() => router.push('/employee/create')} 
                className="mt-4 bg-[#BB86F3] text-white py-2 px-4 rounded hover:bg-[#9E66C7]"
            >
                Create Employee
            </button>
        </div>
    );
};

export default EmployeeView;