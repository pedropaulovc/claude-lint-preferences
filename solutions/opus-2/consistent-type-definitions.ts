interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface AdminUser extends User {
  permissions: string[];
  lastLogin: Date;
}

interface UserService {
  findById(id: string): User | undefined;
  create(user: Omit<User, "id">): User;
  delete(id: string): boolean;
}

type UserRole = "admin" | "editor" | "viewer";
