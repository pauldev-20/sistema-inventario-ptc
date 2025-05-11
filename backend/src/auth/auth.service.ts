import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { getAccessToken } from './utils';
import { LoginUserDto } from './dto/login-user.dto';
import { NotAuthorizationError } from '@/common/exceptions/not-authorization.error';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async registerUser(data: RegisterUserDto) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        
        const user = await this.userRepository.createUser({
            data: {
                name: data.name,
                password: hashedPassword,
            },
        });

        const { token, expiration } = getAccessToken({userId: user.id});
        
        return {
            user,
            token,
            expiration,
        }
    }

    async loginUser(data: LoginUserDto) {
        const { name, password } = data
        
        const user = await this.userRepository.getUser({ name })

        if (!user) {
            throw new NotFoundException('Usuario no encontrado')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            throw new NotAuthorizationError('Credenciales inválidas')
        }

        const { token, expiration } = getAccessToken({userId: user.id});

        return {
            user,
            token,
            expiration,
        }
    }
}
