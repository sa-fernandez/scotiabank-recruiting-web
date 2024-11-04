import { City } from "./City";
import { Position } from "./Position";

export interface Employee {
    id: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    address: string;
    dateBirth: string;
    hireDate: string;
    email: string;
    telephone: string;
    status: string;
    city: City;
    position: Position;
}