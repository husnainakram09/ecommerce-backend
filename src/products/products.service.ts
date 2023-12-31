import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schema/products';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productsModel: Model<ProductDocument>) { }

  create(createProductDto: CreateProductDto): Promise<Product> {
    const model = new this.productsModel(createProductDto)

    return model.save();
  }

  findAll() {
    return this.productsModel.find()
  }

  async findOne(id: string | number) {
    // return `This action returns a #${id} product`;
    return this.productsModel.findById(id)
  }

  update(id: string | number, updateProductDto: UpdateProductDto) {
    console.log(updateProductDto)
    return `This action updates a #${id} product`;
  }

  remove(id: string | number) {
    // return `This action removes a #${id} product`;
    return this.productsModel.deleteOne({ _id: id })
  }
}
