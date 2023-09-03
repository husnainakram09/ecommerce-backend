// import { diskStorage } from 'multer';
import { Controller, Get, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  generateUniqueImageName(productName: string) {
    // Generate a timestamp to make the name more unique
    const timestamp = Date.now();
    // Generate a random string (you can customize the length as needed)
    const randomString = Math.random().toString(36).substring(2, 8);
    // Combine the product name, timestamp, and random string
    const uniqueName = `${productName}_${timestamp}_${randomString}`;
    // Remove spaces and special characters and convert to lowercase (optional)
    const finalName = uniqueName.replace(/[^\w\s]/gi, '').toLowerCase();
    return finalName;
  }
  // , {
  //   storage: diskStorage({
  //     destination: "./uploads",
  //     filename: (req, file: any, cb) => {
  //       const timestamp = Date.now();
  //       const randomString = Math.random().toString(36).substring(2, 8);
  //       const uniqueName = `${timestamp}_${randomString}_${file.originalname}`;
  //       // console.log(`${req.body.id}.${file.mimetype.split("/")[1]}`)
  //       cb(null, uniqueName)
  //     }
  //   })
  // }

  @Post()
  @UseInterceptors(FileInterceptor('image')) // 'image' corresponds to the field name in your FormData
  async create(@Body() createProductDto: CreateProductDto) {
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
