import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesController } from '../roles/roles.controller';
import { TransformInterceptor } from '@src/core/interceptors/transform.interceptor';
import { RolesService } from '../roles/roles.service';

@Controller('api/users')
@UseInterceptors(TransformInterceptor)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly rolesController: RolesController,
    private readonly rolesService: RolesService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(@Query() query: Record<string, any>) {
    const payload = await this.rolesService.findAll(query);
    return {
      data: payload,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
