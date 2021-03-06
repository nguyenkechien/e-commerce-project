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
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TransformInterceptor } from '@utils/interceptors/transform.interceptor';
import { RolesService } from '../roles/roles.service';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('api/users')
@UseGuards(JwtAuthGuard)
@UseInterceptors(TransformInterceptor)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const payload = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return {
      data: payload,
    };
  }

  @Get()
  async findAll(@Query() query: Record<string, any>) {
    const payload = await this.usersService.findAll(query);
    return {
      data: payload,
    };
  }

  @Get(':email')
  async findOne(@Param('email') email: string) {
    const payload = await this.usersService.findOne(email);
    return {
      data: payload,
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
    return this.usersService.update(id, {
      ...updateUserDto,
      password: hashedPassword,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
