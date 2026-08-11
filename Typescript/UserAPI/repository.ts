import type { User } from './types';

export class UserRepository {
    private userCache: Map<number, User>;
    private nextId: number;

    constructor() {
        this.userCache = new Map();
        this.nextId = 1;
    }

    createUser(item: Omit<User, 'id'>): User {
        const user: User = {id: this.nextId++, ...item};
        this.userCache.set(user.id, user);
        return user;
    }

    getUserById(id: number): User | undefined {
        return this.userCache.get(id);
    }

    getAllUsers(): User[] {
        return [...this.userCache.values()];
    }

    updateUser(id: number, updates: Partial<User>): User | undefined {
        const exists = this.userCache.get(id);
        if(!exists) return undefined;

        this.userCache.set(id, {...exists, ...updates});
        return this.userCache.get(id);
    }

    deleteUser(id: number): boolean {
        return this.userCache.delete(id);
    }
}