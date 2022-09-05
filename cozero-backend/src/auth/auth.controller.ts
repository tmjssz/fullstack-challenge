import { Controller, Post, Body } from '@nestjs/common';
import { SkipAuth } from 'src/decorators/skipAuth.decorator';
import { UserLoginDto } from 'src/users/dto/user-login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post('sign-in')
  signIn(@Body() user: UserLoginDto) {
    return this.authService.validateUser(user.email, user.password);
  }
}
