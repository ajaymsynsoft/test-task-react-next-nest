import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CommonService } from 'src/helper/common.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, CommonService],
})
export class ProductModule { }
