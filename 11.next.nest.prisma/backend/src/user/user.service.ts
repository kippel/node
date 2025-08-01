import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateUserDto){
        const user = await this.prisma.user.findUnique({
            where: {
                name: dto.name,
            },
        });

        if (user) throw new ConflictException("name");

        const newUser = await this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: await hash(dto.password, 10)
            }
        })

        const { password, ...result} = newUser;

        return result;
    }

    async findByName(name: string) {
        return await this.prisma.user.findUnique({
            where: {
                name: name,
            },
        });
    }

    async findById(id: number) {
        return await this.prisma.user.findUnique({
            where: {
                id: id,
            },
        });
    }
} 
