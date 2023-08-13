import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image')) // 'image' corresponds to the field name in your FormData
  async create(@UploadedFile() image, @Body() createProductDto: CreateProductDto) {
    if (image) {
      createProductDto.image = image.buffer; // Store the image buffer in your DTO
      // console.log(createProductDto)
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
