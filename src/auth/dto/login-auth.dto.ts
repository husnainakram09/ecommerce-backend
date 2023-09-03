import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
    @IsString()
    @IsNotEmpty()
    password: string
    @IsString()
    @IsNotEmpty()
    username: string
}
