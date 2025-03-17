import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from 'src/models/store.entity';

@Injectable()
export class StoreService {
  async create(createStoreDto: CreateStoreDto,userId:number) {   
    return await Store.create({...createStoreDto,userId});
  }

  async findAll(page: number = 1, limit: number = 10, userId:number) {   
    const offset = (page - 1) * limit;    
    const { rows, count } = await Store.findAndCountAll({
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
    const store = await Store.findOne({where:{id,userId}});

    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }   
    return {
      store,
    };
  }

  async update(id: number, updateStoreDto: UpdateStoreDto, userId:number) {
    const store = await Store.findOne({where:{id, userId}});
    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }   

    await store.update({name:updateStoreDto.name});
    return store;
  }

  async remove(id: number, userId:number) {
    const store = await Store.findOne({where:{id,userId}});

    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }   

    await store.destroy();
    return { message: `Store with ID ${id} deleted successfully` };
  }
}
