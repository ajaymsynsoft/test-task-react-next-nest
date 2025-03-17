import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Request  } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';

@ApiBearerAuth('Authorization')
@ApiTags('Store')
@UseGuards(AuthGuard)
@Roles('admin')
@Controller('admin/store')
export class StoreController {
  constructor(private readonly storeService: StoreService) { }

  @Post()
  create(@Request() req, @Body() createStoreDto: CreateStoreDto) {    
    return this.storeService.create(createStoreDto,req.user.id);
  }

  @Get()
  findAll(@Request() req, @Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.storeService.findAll(Number(page), Number(limit),req.user.id);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.storeService.findOne(+id,req.user.id);
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(+id, updateStoreDto,req.user.id);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.storeService.remove(+id,req.user.id);
  }
}
