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
  NotFoundException,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { MessageEnum } from '../core/constants/message.enum';
import { HelperService } from '@core/services/helper.services';
import { TransformInterceptor } from '@src/core/interceptors/transform.interceptor';
import { CoreResponseResult } from '@src/core/interceptors/transform.interface';

@Controller('roles')
@UseInterceptors(TransformInterceptor)
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
    private helperService: HelperService,
  ) {}

  @Post()
  async create(
    @Body() createRoleDto: CreateRoleDto,
  ): Promise<CoreResponseResult> {
    const payload = await this.rolesService.create(createRoleDto);
    return {
      data: payload,
      message: MessageEnum.CREATE_SUCCESS,
    };
    // return this.helperService.resJson({
    //   successMsg: MessageEnum.CREATE_SUCCESS,
    //   errorMsg: MessageEnum.CREATE_FAILED,
    //   payload,
    // });
  }

  @Get()
  async findAll(
    @Query() query: Record<string, any>,
  ): Promise<CoreResponseResult> {
    const payload = await this.rolesService.findAll(query);
    return {
      data: payload,
      message: MessageEnum.FIND_ALL_SUCCESS,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CoreResponseResult> {
    const payload = await this.rolesService.findOne(id);
    if (!payload) throw new NotFoundException(MessageEnum.DATA_NOT_FOUND)
    return {
      data: payload,
      message: MessageEnum.FIND_ONE_SUCCESS,
    };
    // try {

    // } catch (error) {
    //   console.log(`error`, error);
    //   return {
    //     status: false,
    //   };
    // }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<CoreResponseResult> {
    const payload = await this.rolesService.update(id, updateRoleDto);
    // return this.helperService.resJson({
    //   successMsg: MessageEnum.UPDATE_SUCCESS,
    //   errorMsg: MessageEnum.UPDATE_FAILED,
    //   payload,
    // });
    return {
      data: payload,
      message: MessageEnum.UPDATE_SUCCESS,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const payload = await this.rolesService.remove(id);
    return this.helperService.resJson({
      successMsg: MessageEnum.DELETE_SUCCESS,
      errorMsg: MessageEnum.DELETE_FAILED,
      payload,
    });
  }
}
