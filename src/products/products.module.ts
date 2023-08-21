import { ImageModule } from './../image/image.module';
import { ImageService } from '../image/image.service';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product, ProductSchema } from './schema/products';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]), ImageModule],
  controllers: [ProductsController, ProductController],
  providers: [ProductsService]
})
export class ProductsModule { }
