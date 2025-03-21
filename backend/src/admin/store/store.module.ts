import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { CommonService } from 'src/helper/common.service';

@Module({
  controllers: [StoreController],
  providers: [StoreService, CommonService],
})
export class StoreModule { }
