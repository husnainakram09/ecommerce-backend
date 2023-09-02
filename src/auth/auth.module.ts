import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/auth';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: 'hakto-key', // Replace with your actual secret key
      signOptions: { expiresIn: '1h' }, // Adjust the token expiration time as needed
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
