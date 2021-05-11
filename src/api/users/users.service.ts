import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@schema/user.schema';
import { HelperService } from '@utils/services/helper.services';
import { PaginateModel } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly model: PaginateModel<User>,
    private helperService: HelperService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const createUser = new this.model(createUserDto);
    const newUser = (await createUser.save())
      .populate('role', '-__v')
      .execPopulate();
    // const { password, ...payload } = newUser.toJSON();
    return newUser;
  }

  async findAll(query?: Record<string, any>) {
    const { optionQuery, filterQuery } = this.helperService.getQueryPaginate(
      query || {},
    );
    return await this.model.paginate(filterQuery, optionQuery);
  }

  async findOne(email: string): Promise<User> {
    const user = await this.model
      .findOne({ email })
      .select('-__v')
      .populate('role', '-__v')
      .exec();
    if (user) return user;
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    return await this.model.findOneAndUpdate({ email }, updateUserDto, {
      new: false,
    });
  }

  async remove(email: string): Promise<any> {
    return await this.model.findOneAndDelete({ email });
  }
}
