import { Module } from '@nestjs/common';
import { AuthGuard, AuthModule } from '@mguay/nestjs-better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { betterAuth } from 'better-auth';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from './users/users.module';

const prisma = new PrismaClient();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => {
        return {
          auth: betterAuth({
            database: prismaAdapter(prisma, {
              provider: 'postgresql',
            }),
            emailAndPassword: {
              enabled: true,
            },
            trustedOrigins: ['http://localhost:3000'],
          }),
        };
      },
    }),
    UsersModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
