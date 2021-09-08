import { Auth } from '../entities';
import * as argon2 from 'argon2';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto, RegisterDto } from '../dto';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtTokenType } from '../strategies';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(Auth)
    private authRepo: Repository<Auth>,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto): Promise<string> {
    const auth = await this.findByEmail(email);

    if (!(await argon2.verify(auth.getPassword(), password))) {
      return null;
    }

    return this.createToken(auth);
  }

  async register({ email, password }: RegisterDto): Promise<string> {
    if (!(await this.isEmailUnique(email))) {
      throw new ConflictException('email must be unique');
    }

    const auth = new Auth(email);
    await auth.setPassword(password);

    return this.createToken(await this.authRepo.save(auth));
  }

  async findById(id: number): Promise<Auth> {
    return this.authRepo.findOne({ id });
  }

  async findByEmail(email: string): Promise<Auth> {
    const auth = await this.authRepo.findOne({ email: email.toLowerCase() });

    if (!auth) {
      throw new NotFoundException('Account not found');
    }

    return auth;
  }

  async isEmailUnique(email: string): Promise<boolean> {
    return !(await this.authRepo.findOne({ email: email.toLowerCase() }));
  }

  async createToken(auth: Auth): Promise<string> {
    const payload: JwtTokenType = {
      authId: auth.id,
      roles: auth.roles,
    };

    return this.jwtService.sign(payload, { expiresIn: '120m' });
  }
}
