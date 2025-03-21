import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CommonService } from 'src/helper/common.service';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, CommonService],
})
export class CustomerModule { }
