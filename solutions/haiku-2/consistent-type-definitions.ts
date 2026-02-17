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
  findById(id: number): User | undefined;
  create(user: User): void;
  delete(id: number): void;
}

type UserRole = 'admin' | 'editor' | 'viewer';
