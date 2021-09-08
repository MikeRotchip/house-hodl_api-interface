import * as argon2 from 'argon2';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ unique: true })
  email: string;

  @Column()
  private password: string;

  @Column()
  roles: number;

  constructor(email: string) {
    this.email = email;
    this.roles = 1;
  }

  getPassword(): string {
    return this.password;
  }

  async setPassword(password: string) {
    this.password = await argon2.hash(password);
  }
}
