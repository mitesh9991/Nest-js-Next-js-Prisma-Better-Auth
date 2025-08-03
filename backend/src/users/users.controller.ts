import { AuthGuard, Session, UserSession } from '@mguay/nestjs-better-auth';
import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  @Get('session')
  getSession(@Session() session: UserSession) {
    return session;
  }
}
