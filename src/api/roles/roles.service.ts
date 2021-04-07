import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from '@src/schema/role.schema';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PaginateModel, PaginateResult } from 'mongoose';
import { HelperService } from '@core/services/helper.services';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private readonly model: PaginateModel<Role>,
    private helperService: HelperService,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const createRole = new this.model(createRoleDto);
    return createRole.save();
  }

  async findAll(query: Record<string, any>): Promise<PaginateResult<Role>> {
    const { optionQuery, filterQuery } = this.helperService.getQueryPaginate(
      query,
    );
    return await this.model.paginate(filterQuery, optionQuery);
  }

  async findOne(id: string): Promise<Role | null> {
    return await this.model
      .findOne({ _id: id })
      .select('-__v')
      .exec();
  }

  update(id: string, updateRoleDto: UpdateRoleDto) {
    return this.model.findOneAndUpdate({ _id: id }, updateRoleDto, {
      new: false,
    });
  }

  async remove(id: string): Promise<any> {
    return this.model.findOneAndDelete({ _id: id });
  }
}
