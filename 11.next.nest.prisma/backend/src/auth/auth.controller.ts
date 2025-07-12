import { Body, Controller, Post, Get, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private userService: UserService,
        private authService: AuthService, 
    ) {}

    @Get('bar')
    async bar(){
        return { "bar" : "foo"}
    }

    @Post('register')
    async registerUser(@Body() dto: CreateUserDto){
        
        return await this.userService.create(dto);
    }

    @Post('login')
    async login(@Body() dto: LoginDto) {
        console.log("ddddd")
        return await this.authService.login(dto)
    }

    @UseGuards(RefreshJwtGuard)
    @Post("refresh")
    async refreshToken(@Request() req){
        return await this.authService.refreshToken(req.user)


    }

}
