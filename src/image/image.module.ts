import { Module, Global } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { Image, ImageSchema } from './schema/image';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }])],
  controllers: [ImageController],
  providers: [ImageService],
  exports: [ImageService]
})
export class ImageModule { }
