import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCustomerDto, CreateOrderDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { findEntitiesWithPaginationAndSearch } from 'src/helper/common_functions';
import { Store } from 'src/models/store.entity';
import { Product } from 'src/models/product.entity';
import { Order } from 'src/models/order.entity';
import { handleSequelizeError } from 'src/helper/error-handler';

@Injectable()
export class CustomerService {

  async findAllStores(paginationDto, id) {
    const result = await findEntitiesWithPaginationAndSearch(Store, paginationDto, {},);
    return result;
  }

  async findAllProducts(paginationDto, id) {
    const result = await findEntitiesWithPaginationAndSearch(Product, paginationDto, {}, 'AllProductsModule');
    return result;
  }

  async findAllOrders(paginationDto, id) {
    const result = await findEntitiesWithPaginationAndSearch(Product, paginationDto, {}, 'GetAllOrdersModule', id);
    return result;
  }

  async placeOrder(dto: CreateOrderDto, userId) {
    try {
      const { productId, name } = dto;
      const product = await Product.findByPk(productId);
      if (!product) throw new BadRequestException('Product not found');

      if (product.dataValues.stock <= 0) {
        throw new BadRequestException('Product out of stock');
      }

      // Create Order
      const order = await Order.create({
        userId,
        productId,
        name,
        quantity: 1,
        status: 'completed',
        storeId: product.dataValues.storeId,
      });

      const updatedStock = product.dataValues.stock - 1

      await product.update({ stock: updatedStock });

      return {
        message: 'Order placed successfully',
        order,
      };
    } catch (error) {
      handleSequelizeError(error);
    }
  }
}
