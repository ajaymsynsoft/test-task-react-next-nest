import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CommonService } from 'src/helper/common.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, CommonService],
})
export class AuthModule { }
