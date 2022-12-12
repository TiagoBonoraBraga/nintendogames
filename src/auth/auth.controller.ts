import { Controller, Post, Body, Get } from '@nestjs/common';
import { Request, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { IsUserAuthorization } from './decorators/is-user.decorator';
import { UserLoginDto } from './dto/user-login-input.dto';

@Controller('Authorization')
@ApiTags('Authorization')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: UserLoginDto) {
    return await this.authService.validateUser(data);
  }

  @Get()
  @UseGuards(AuthGuard(), IsUserAuthorization)
  @ApiBearerAuth()
  async getUser(@Request() req) {
    return 'Brabo';
  }
}
