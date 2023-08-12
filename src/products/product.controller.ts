import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productsService: ProductsService) { }

    @Get(':id')
    findOne(@Param('id') id: string | number) {
        return this.productsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productsService.update(+id, updateProductDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productsService.remove(+id);
    }
}
