import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Token } from './schema/token';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async create(@Body() createAuthDto: CreateAuthDto) {
    const user = await this.authService.create(createAuthDto);
    if (typeof user == 'string') {
      throw new UnauthorizedException(user);
    }
    return user
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginAuthDto): Promise<Token> {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (user == "unauthorized") {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (!user) {
      throw new UnauthorizedException('Invalid username or email.');
    }
    return this.authService.login(user);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
