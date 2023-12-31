import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/auth';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"
import { Token, TokenDocument } from './schema/token';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<User | string | null> {
    const user: any = await this.userModel.findOne({ email }).exec();
    if (!user) {
      return null
    }
    if (user && (await bcrypt.compare(password, user?.password))) {
      return user;
    }
    return "unauthorized";
  }

  async login(user: any): Promise<Token> {
    const payload = { sub: user.id };
    const accessToken = this.jwtService.sign(
      payload,
      {
        expiresIn: "24h",
      }
    );
    const token = new this.tokenModel({ accessToken, email: user.email, userId: user?._id || user.id })
    return token.save()
  }

  async create(createAuthDto: CreateAuthDto): Promise<User | string> {
    if ((await this.userModel.find({ username: createAuthDto.username })).length > 0) {
      return "username already exists"
    } else if ((await this.userModel.find({ email: createAuthDto.email })).length > 0) {
      return "email already exists"
    }
    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
    createAuthDto.password = hashedPassword
    const model = new this.userModel(createAuthDto)
    return model.save()
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
