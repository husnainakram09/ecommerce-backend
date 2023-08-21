import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schema/products';
import { HttpService } from '@nestjs/axios';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productsModel: Model<ProductDocument>, private imageService: ImageService) { }

  create(createProductDto: CreateProductDto): Promise<Product> {
    const model = new this.productsModel()
    model.name = createProductDto.name
    model.price = createProductDto.price
    model.image = createProductDto.image
    return model.save();
  }

  async findAll() {
    const products: any = await this.productsModel.find()
    const productsWithImage = await Promise.all(
      products?.map(async (product) => {
        const res = await this.imageService.findOne(product.image)

        return await { ...product._doc, image: res }
      })
    )
    return productsWithImage
  }

  async findOne(id: string | number) {
    // return `This action returns a #${id} product`;
    const product: any = await this.productsModel.findById(id);
    const newproduct = { ...product._doc, image: product._doc.image.toString('base64') }
    // console.log(product)
    return newproduct
  }

  update(id: string | number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: string | number) {
    // return `This action removes a #${id} product`;
    return this.productsModel.deleteOne({ _id: id })
  }
}
