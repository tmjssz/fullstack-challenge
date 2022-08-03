import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from 'src/users/dto/user-login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    const isPasswordMatch = await bcrypt.compare(pass, user.password);
    if (user && isPasswordMatch) {
      const { password, ...result } = user; // Remove password from the result
      return result;
    }
    return null;
  }

  async login(user: UserLoginDto) {
    const payload = { email: user.email };
    return {
      email: user.email,
      access_token: this.jwtService.sign(payload),
    };
  }
}
