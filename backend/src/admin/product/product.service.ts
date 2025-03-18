import { HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { createEntity } from 'src/helper/common_functions';
import { Product } from 'src/models/product.entity';
import globalMsg from 'src/globalMsg';

@Injectable()
export class ProductService {
  async createProduct(dto: CreateProductDto, userId) {
    const product = await Product.findOne({where:{name:dto.name}});  
    let newData = { ...dto, userId }
    if (product) {
      throw new NotFoundException(`Product already exists with ${dto.name}`);
    }  
    const createDta = await createEntity(Product, newData);
    return {
      statusCode: HttpStatus.OK,
      message: globalMsg.common.CREATED_SUCCESSFULLY,
      data: {
        createDta,
      }
    }
  }

  async findAll(page: number = 1, limit: number = 10, userId:number) {
    const offset = (page - 1) * limit;    
       const { rows, count } = await Product.findAndCountAll({
         where:{ userId },
         limit,
         offset,
       });
   
       return {
         list: rows,
         totalCount: count,
         totalPages: Math.ceil(count / limit),
         currentPage: page,
       };
  }

  async findOne(id: number, userId:number) {
    const product = await Product.findOne({where:{id,userId}});    
      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }   
      return {
        product,
      };
  }

  async update(id: number, updateProductDto: UpdateProductDto,userId) {
     const product = await Product.findOne({where:{id, userId}});
       if (!product) {
         throw new NotFoundException(`Product with ID ${id} not found`);
       } 
   
       await product.update(updateProductDto);
       return product;
  }

  async remove(id: number,userId) {
     const product = await Product.findOne({where:{id,userId}});
    
        if (!product) {
          throw new NotFoundException(`Product with ID ${id} not found`);
        }   
    
        await product.destroy();
        return { message: `Product with ID ${id} deleted successfully` };
  }
}
