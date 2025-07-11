import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async login(dto: LoginDto){
        const user = await this.validateUser(dto);
        /*
        sub: {
                name: user.name,
            },
        */
        const payload = {
            username: user.name,
            sub: {
                name: user.name,
            },
        };
        console.log("eded")
        return {
            user,
            backendTokens: {
                accessToken: await this.jwtService.signAsync(payload,{
                    expiresIn: '1h',
                    secret: process.env.jwtSecretKey,

                }),
                refreshToken: await this.jwtService.signAsync(payload,{
                    expiresIn: '7h',
                    secret: process.env.jwtRefreshTokenKey,
                    
                }),
            },
        };

    }

    async validateUser(dto: LoginDto) {
        const user = await this.userService.findByName(dto.username);

        if (user && (await compare(dto.password, user.password))){
            const { password, ...result} = user;
            return result;
        }

        throw new UnauthorizedException()


    }

    async refreshToken(user:any){
        const payload = {
            username: user.username,
            sub: user.sub
        };

        return {
            accessToken: await this.jwtService.signAsync(payload, {
                expiresIn: '1h',
                secret: process.env.jwtSecretKey
            }),
            refreshToken: await this.jwtService.signAsync(payload,{
                expiresIn: '8h',
                secret: process.env.jwtRefreshTokenKey,
            }),
        };
    }
}
