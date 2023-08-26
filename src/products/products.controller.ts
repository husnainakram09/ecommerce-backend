import { ImageService } from './../image/image.service';
import { Controller, Get, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService, private imageService: ImageService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image')) // 'image' corresponds to the field name in your FormData
  async create(@UploadedFile() image, @Body() createProductDto: CreateProductDto) {
    if (image) {
      const res: any = await this.imageService.create({ image: image.buffer, originalname: image.originalname, mimetype: image.mimetype })
      createProductDto.image = res._id; // Store the image buffer in your DTO
    }
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string | number) {
  //   return this.productsService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productsService.update(+id, updateProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productsService.remove(+id);
  // }
}
