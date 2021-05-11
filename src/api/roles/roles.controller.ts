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
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { MessageEnum, MessageTypeEnum } from '@utils/constants/message.enum';
import { HelperService } from '@utils/services/helper.services';
import { TransformInterceptor } from '@utils/interceptors/transform.interceptor';
import { CoreResponseResult } from '@utils/interceptors/transform.interface';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('api/roles')
@UseGuards(JwtAuthGuard)
@UseInterceptors(TransformInterceptor)
export class RolesController {
  constructor(
    private readonly service: RolesService,
    private helperService: HelperService,
  ) {}

  @Post()
  async create(
    @Body() createRoleDto: CreateRoleDto,
  ): Promise<CoreResponseResult> {
    const payload = await this.service.create(createRoleDto);
    return {
      data: payload,
      message: MessageEnum.CREATE_SUCCESS,
    };
  }

  @Get()
  async findAll(
    @Query() query: Record<string, any>,
  ): Promise<CoreResponseResult> {
    const payload = await this.service.findAll(query);
    return {
      data: payload,
      message: MessageTypeEnum.FIND_ALL,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CoreResponseResult> {
    const payload = await this.service.findOne(id);
    if (!payload) this.helperService.throwException();
    return {
      data: payload,
      message: MessageEnum.FIND_ONE_SUCCESS,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<CoreResponseResult> {
    const payload = await this.service.update(id, updateRoleDto);
    return {
      data: payload,
      message: MessageEnum.UPDATE_SUCCESS,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CoreResponseResult> {
    const payload = await this.service.remove(id);
    return {
      data: payload,
      message: MessageEnum.DELETE_SUCCESS,
    };
  }
}
