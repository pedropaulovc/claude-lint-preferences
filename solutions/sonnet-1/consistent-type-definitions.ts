type UserRole = 'admin' | 'editor' | 'viewer';

interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
}

interface AdminUser extends User {
    permissions: string[];
    lastLogin: Date;
}

interface UserService {
    findById(id: number): Promise<User | undefined>;
    create(user: Omit<User, 'id'>): Promise<User>;
    delete(id: number): Promise<void>;
}
