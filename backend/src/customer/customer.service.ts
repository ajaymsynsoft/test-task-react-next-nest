import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { findEntitiesWithPaginationAndSearch } from 'src/helper/common_functions';
import { Store } from 'src/models/store.entity';

@Injectable()
export class CustomerService {

  async findAllStores(paginationDto, id) {
    const result = await findEntitiesWithPaginationAndSearch(Store, paginationDto, {},);
    return result;
  }
}
