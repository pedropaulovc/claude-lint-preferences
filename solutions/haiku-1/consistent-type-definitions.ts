type User = {
  id: number;
  name: string;
  email: string;
  phone?: string;
};

type AdminUser = User & {
  permissions: string[];
  lastLogin: Date;
};

interface UserService {
  findById(id: number): User | null;
  create(user: User): void;
  delete(id: number): void;
}

type UserRole = 'admin' | 'editor' | 'viewer';
