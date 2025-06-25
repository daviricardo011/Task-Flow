import { connection } from "../config/database";

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

export const UserModel = {
  async create(user: User): Promise<User> {
    const [result] = await connection.execute(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      [user.name, user.email, user.password]
    );
    return { ...user, id: (result as any).insertId };
  },
  async findAll(): Promise<User[]> {
    const [result] = await connection.execute(`SELECT * FROM users`);
    const users = result as User[]|| [];
    return users;
  },
  async findById(id: number): Promise<User | null> {
    const [result] = await connection.execute(`SELECT * FROM users WHERE id = ?`, [
      id,
    ]);
    const users = result as User[];
    return users[0] || null;
  },
  async update(id: number, user: Partial<User>): Promise<void> {
    await connection.execute(
      `UPDATE users SET name = ?, email = ? WHERE id = ?`,
      [user.name, user.email, id]
    );
  },
  async delete(id: number): Promise<void> {
    await connection.execute(`DELETE FROM users WHERE id = ?`, [id]);
  },
};
