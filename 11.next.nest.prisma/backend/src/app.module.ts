import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';


// PrismaSer...
@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    }), UserModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
