import { AuthenticationService, SecurityService } from '../services';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginDto, RegisterDto } from '../dto';
import { Auth } from '../entities';
import { HttpAuth } from '../decorators';
import { JwtAuthGuard } from '../guards';

@Controller('auth')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<string> {
    return this.authenticationService.login(loginDto);
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto): Promise<string> {
    await this.authenticationService.register(registerDto);

    return this.authenticationService.login(registerDto);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async getAuth(@HttpAuth() auth: SecurityService): Promise<Auth> {
    return auth.getAuthEntity();
  }
}
