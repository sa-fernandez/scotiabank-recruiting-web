"use client";

import React, { useState, useEffect } from 'react';
import { EmployeeRequest } from '@/src/requests/EmployeeRequest';
import { useRouter } from 'next/navigation';
import { createEmployee } from '@/src/services/employeeService';
import { getAllCities } from '@/src/services/cityService';
import { getAllPositions } from '@/src/services/positionService';
import { City } from '@/src/models/City';
import { Position } from '@/src/models/Position';
import { formatDate } from '@/src/utils/dateFormat';
import { ADDRESS_PATTERN, PHONE_PATTERN } from '@/src/utils/patternValidation';

const EmployeeCreate = () => {
    const router = useRouter();
    const [employeeRequest, setEmployeeRequest] = useState<EmployeeRequest>({
        id: undefined,
        firstName: '',
        middleName: '',
        lastName: '',
        address: '',
        dateBirth: '',
        hireDate: '',
        email: '',
        telephone: '',
        status: '',
        idCity: 0,
        idPosition: 0,
    });
    const [cities, setCities] = useState<City[]>([]);
    const [positions, setPositions] = useState<Position[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState({ telephone: '', address: '' });

    useEffect(() => {
        const fetchCitiesAndPositions = async () => {
            try {
                const fetchedCities = await getAllCities();
                const fetchedPositions = await getAllPositions();
                setCities(fetchedCities);
                setPositions(fetchedPositions);
            } catch (error) {
                console.error('Error fetching cities or positions:', error);
            }
        };
        fetchCitiesAndPositions();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEmployeeRequest((prev) => ({ ...prev, [name]: value }));

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
        if (validateForm()) {
            setLoading(true);
            try {
                const employeeToCreate = {
                    ...employeeRequest,
                    dateBirth: formatDate(employeeRequest.dateBirth),
                    hireDate: formatDate(employeeRequest.hireDate),
                };
                await createEmployee(employeeToCreate);
                router.push('/employee');
            } catch (error) {
                console.error('Error creating employee:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const validateForm = () => {
        return PHONE_PATTERN.test(employeeRequest.telephone) && ADDRESS_PATTERN.test(employeeRequest.address);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Create Employee</h2>
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
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Employee'}
                </button>
            </form>
        </div>
    );
};

export default EmployeeCreate;