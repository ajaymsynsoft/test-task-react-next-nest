import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { createEntity } from 'src/helper/common_functions';
import { Product } from 'src/models/product.entity';
import globalMsg from 'src/globalMsg';

@Injectable()
export class ProductService {
  async createProduct(dto: CreateProductDto, user) {
    let newData = { ...dto, userId: user.id }
    const createDta = await createEntity(Product, newData);
    return {
      statusCode: HttpStatus.OK,
      message: globalMsg.common.CREATED_SUCCESSFULLY,
      data: {
        createDta,
      }
    }
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
