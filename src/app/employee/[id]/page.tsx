"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getEmployeeDetailsById } from '../../../services/employeeService';
import { formatDate } from '@/src/utils/dateFormat';
import { EmployeeDetailsDTO } from '@/src/dto/EmployeeDetailsDTO';

const EmployeeDetails = () => {
    const id = useParams().id;
    const [employee, setEmployee] = useState<EmployeeDetailsDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchEmployee = async () => {
            if (id && typeof id == 'string') {
                setLoading(true);
                try {
                    const data = await getEmployeeDetailsById(parseInt(id, 10));
                    setEmployee(data);
                } catch (error) {
                    console.error('Error fetching employee:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchEmployee();
    }, [id]);

    if (loading) return <p className="text-center py-4">Loading employee details...</p>;

    const timeInPosition = employee ? Math.floor((new Date().getTime() - new Date(employee.hireDate).getTime()) / (1000 * 3600 * 24)) : 0;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Employee Details</h2>
            {employee ? (
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-semibold">Employee Section</h3>
                        <p><strong>First Name:</strong> {employee.firstName}</p>
                        <p><strong>Middle Name:</strong> {employee.middleName || 'N/A'}</p>
                        <p><strong>Last Name:</strong> {employee.lastName}</p>
                        <p><strong>Location City:</strong> {employee.cityName}</p>
                        <p><strong>Address:</strong> {employee.address}</p>
                        <p><strong>Date Birth:</strong> {formatDate(employee.dateBirth)}</p>
                        <p><strong>Telephone:</strong> {employee.telephone}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Position Section</h3>
                        <p><strong>Position Title:</strong> {employee.title}</p>
                        <p><strong>Hire Date:</strong> {formatDate(employee.hireDate)}</p>
                        <p><strong>Email:</strong> {employee.email}</p>
                        <p><strong>Salary:</strong> {employee.salary}</p>
                        <p><strong>Time in Position:</strong> {timeInPosition} days</p>
                    </div>
                </div>
            ) : (
                <p>No employee found.</p>
            )}
        </div>
    );
};

export default EmployeeDetails;
