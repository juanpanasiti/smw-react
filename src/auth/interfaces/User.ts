import { RoleEnum } from '../../common/enums';

export interface User {
    id: number;
    username: string;
    email: string;
    role: RoleEnum;
    createdAt: string;
    updatedAt: string;
}
