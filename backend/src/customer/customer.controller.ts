import { Controller, Get, UseGuards, Query, Request } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { BasePaginationDto } from 'src/dto/create-common.dto';


@ApiBearerAuth('Authorization')
@ApiTags('Customer')
@UseGuards(AuthGuard)
@Roles('customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @Get('stores')
  findAllStores(@Request() req, @Query() paginationDto: BasePaginationDto,) {
    return this.customerService.findAllStores(paginationDto, req.user.id);
  }
}
