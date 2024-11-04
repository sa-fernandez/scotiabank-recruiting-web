export interface EmployeeRequest {
    id: number | undefined;
    firstName: string;
    middleName?: string;
    lastName: string;
    address: string;
    dateBirth: string;
    hireDate: string;
    email: string;
    telephone: string;
    status: string;
    idCity: number;
    idPosition: number;
}