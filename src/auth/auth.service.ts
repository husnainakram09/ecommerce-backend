import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/auth';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { bcrypt } from "bcrypt"
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(username: string, password: string): Promise<User | string | null> {
    const user: any = await this.userModel.findOne({ username }).exec();
    if (!user) {
      return null
    }
    if (user && (await bcrypt.compare(password, user?.password))) {
      return user;
    }
    return "unauthorized";
  }

  async login(user: any): Promise<{ accessToken: string }> {
    const payload = { sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async create(createAuthDto: CreateAuthDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
    createAuthDto.password = hashedPassword
    const model = new this.userModel(createAuthDto)
    return model.save();
  }

  findAll() {
    return this.userModel.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
