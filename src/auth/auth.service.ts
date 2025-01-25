import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async register({ name, email, password }: RegisterDto) {

        const user = await this.usersService.findOneByEmail(email);

        if (user) {
            throw new BadRequestException('User already exists');
        }

        return this.usersService.create({ name, email, password: await bcryptjs.hash(password, 10) });
    }

    async login({ email, password }: LoginDto) {

        const user = await this.usersService.findOneByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Email is incorrect');
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Password is incorrect');
        }

        const payload = { sub: user.id, email: user.email };

        const token = await this.jwtService.sign(payload);

        return {
            access_token: token,
            email: user.email,
        };
    }

}
