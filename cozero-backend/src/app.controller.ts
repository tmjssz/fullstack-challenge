import { Controller, Get, Post, UseGuards, Request, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { SkipAuth } from './decorators/skipAuth.decorator';

@Controller()
export class AppController {
  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @SkipAuth()
  @Get()
  getHello(@Request() req): string {
    return this.appService.getHello();
  }
}
