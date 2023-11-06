import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, SignInDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto;
    return this.userService.createUser(email, name, password);
  }

  @Post('signin')
  async signIn(@Body(ValidationPipe) signInDto: SignInDto) {
    const { email, password } = signInDto;
    return this.userService.validateUser(email, password);
  }
}
