"use client";

import React, { useEffect, useState } from 'react';
import { EmployeeRequest } from '@/src/requests/EmployeeRequest';
import { useParams, useRouter } from 'next/navigation';
import { getEmployeeById, updateEmployee } from '@/src/services/employeeService';
import { City } from '@/src/models/City';
import { Position } from '@/src/models/Position';
import { getAllCities } from '@/src/services/cityService';
import { getAllPositions } from '@/src/services/positionService';
import { formatDate } from '@/src/utils/dateFormat';
import { ADDRESS_PATTERN, PHONE_PATTERN } from '@/src/utils/patternValidation';

const EmployeeUpdate = () => {
    const { id } = useParams();
    const router = useRouter();
    const [employeeRequest, setEmployeeRequest] = useState<EmployeeRequest | null>(null);
    const [cities, setCities] = useState<City[]>([]);
    const [positions, setPositions] = useState<Position[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState({ telephone: '', address: '' });

    useEffect(() => {
        const fetchEmployeeInfo = async () => {
            try {
                if (id && typeof id === 'string') {
                    setLoading(true);
                    const [data, fetchedCities, fetchedPositions] = await Promise.all([
                        getEmployeeById(parseInt(id, 10)),
                        getAllCities(),
                        getAllPositions(),
                    ]);

                    setEmployeeRequest({
                        id: data.id,
                        firstName: data.firstName,
                        middleName: data.middleName,
                        lastName: data.lastName,
                        address: data.address,
                        dateBirth: data.dateBirth,
                        hireDate: data.hireDate,
                        email: data.email,
                        telephone: data.telephone,
                        status: data.status,
                        idCity: data.city.id,
                        idPosition: data.position.id,
                    });
                    setCities(fetchedCities);
                    setPositions(fetchedPositions);
                }
            } catch (error) {
                console.error('Error fetching employee information:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployeeInfo();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEmployeeRequest((prev) => (prev ? { ...prev, [name]: value } : prev));

        if (name === 'telephone') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                telephone: PHONE_PATTERN.test(value) ? '' : 'Número de teléfono no válido',
            }));
        } else if (name === 'address') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                address: ADDRESS_PATTERN.test(value) ? '' : 'Dirección no válida',
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (employeeRequest && validateForm()) {
            try {
                if (id && typeof id === 'string') {
                    const employeeToUpdate = {
                        ...employeeRequest,
                        dateBirth: formatDate(employeeRequest.dateBirth),
                        hireDate: formatDate(employeeRequest.hireDate),
                    };
                    await updateEmployee(parseInt(id, 10), employeeToUpdate);
                    router.push('/employee');
                }
            } catch (error) {
                console.error('Error updating employee:', error);
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!employeeRequest) return <p>Employee not found</p>;

    const validateForm = () => {
        return PHONE_PATTERN.test(employeeRequest.telephone) && ADDRESS_PATTERN.test(employeeRequest.address);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Update Employee</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            <input
                    type="text"
                    name="firstName"
                    value={employeeRequest.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="border rounded p-2 w-full text-gray-700"
                    required
                />
                <input
                    type="text"
                    name="middleName"
                    value={employeeRequest.middleName}
                    onChange={handleChange}
                    placeholder="Middle Name"
                    className="border rounded p-2 w-full text-gray-700"
                />
                <input
                    type="text"
                    name="lastName"
                    value={employeeRequest.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="border rounded p-2 w-full text-gray-700"
                    required
                />
                <input
                    type="text"
                    name="address"
                    value={employeeRequest.address}
                    onChange={handleChange}
                    placeholder="Address"
                    className="border rounded p-2 w-full text-gray-700"
                    required
                />
                {errors.address && <p className="text-red-500">{errors.address}</p>}
                <input
                    type="date"
                    name="dateBirth"
                    value={employeeRequest.dateBirth}
                    onChange={handleChange}
                    className="border rounded p-2 w-full text-gray-700"
                    required
                />
                <input
                    type="date"
                    name="hireDate"
                    value={employeeRequest.hireDate}
                    onChange={handleChange}
                    className="border rounded p-2 w-full text-gray-700"
                    required
                />
                <input
                    type="text"
                    name="email"
                    value={employeeRequest.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="border rounded p-2 w-full text-gray-700"
                    required
                />
                <input
                    type="text"
                    name="telephone"
                    value={employeeRequest.telephone}
                    onChange={handleChange}
                    placeholder="Telephone"
                    className="border rounded p-2 w-full text-gray-700"
                    required
                />
                {errors.telephone && <p className="text-red-500">{errors.telephone}</p>}
                <input
                    type="text"
                    name="status"
                    value={employeeRequest.status}
                    onChange={handleChange}
                    placeholder="Status"
                    className="border rounded p-2 w-full text-gray-700"
                    required
                />
                <select
                    name="idCity"
                    value={employeeRequest.idCity}
                    onChange={handleChange}
                    className="border rounded p-2 w-full text-gray-700"
                    required
                >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                            {city.name}
                        </option>
                    ))}
                </select>
                <select
                    name="idPosition"
                    value={employeeRequest.idPosition}
                    onChange={handleChange}
                    className="border rounded p-2 w-full text-gray-700"
                    required
                >
                    <option value="">Select Position</option>
                    {positions.map((position) => (
                        <option key={position.id} value={position.id}>
                            {position.title}
                        </option>
                    ))}
                </select>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Update Employee
                </button>
            </form>
        </div>
    );
};

export default EmployeeUpdate;