import { Injectable } from '@nestjs/common';
import { rolesData } from 'src/data/dummyData';
import { RoleMst } from 'src/models/roleMst.entity';

@Injectable()
export class SeedService {

  async create() {
    try {
      const existingRoles = await RoleMst.findAll();
      if (existingRoles.length > 0) {
        return existingRoles;
      }
      const result = await RoleMst.bulkCreate(rolesData);

      return result;
    } catch (error) {
      throw error;
    }
  }

}
