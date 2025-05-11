import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { SuccessResponse } from '@/common/utils/success-response';
import { UserResource } from './resources/user.resource';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('register')
    async registerUser(@Body() registerUserDto: RegisterUserDto) {
        const { user, token, expiration } = await this.authService.registerUser(registerUserDto);
        return new SuccessResponse(
            {
                user: UserResource.make(user),
                token,
                expiration,
            },
            HttpStatus.CREATED,
            'Usuario registrado con éxito',
        )
    }

    @Post('login')
    async loginUser(@Body() loginUserDto: LoginUserDto) {
        const { user, token, expiration } = await this.authService.loginUser(loginUserDto);
        return new SuccessResponse(
            {
                user: UserResource.make(user),
                token,
                expiration,
            },
            HttpStatus.OK,
            'Usuario logueado con éxito',
        )
    }

    @UseGuards(JwtGuard)
    @Post('logout')
    logoutUser() {
        return new SuccessResponse(
            {},
            HttpStatus.OK,
            'Usuario deslogueado con éxito',
        )
    }
}
