import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image, ImageDocument } from './schema/image';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ImageService {
  constructor(@InjectModel(Image.name) private imageModel: Model<ImageDocument>) { }

  create(createImageDto: CreateImageDto): Promise<Image> {
    const model = new this.imageModel()
    model.image = createImageDto.image
    model.originalname = createImageDto.originalname
    model.mimetype = createImageDto.mimetype
    return model.save()
  }

  async findAll() {
    const imagesData = await this.imageModel.find()
    // const images = await Promise.all(
    //   imagesData.map((data) => {
    //     const base64String = data.image.toString('base64');
    //     const binaryData = atob(base64String);

    //     // Convert binary data to a Blob
    //     const blob = new Blob([binaryData], { type: data.mimetype })
    //     return blob
    //   })
    // )
    return imagesData
  }

  async findOne(id: number | string): Promise<any> {
    const imageData: any = await this.imageModel.findById(id)
    const base64String = imageData.image.toString('base64');
    const binaryData = atob(base64String);

    // Convert binary data to a Blob
    // const blob = new Blob([binaryData], { type: imageData.mimetype })

    // delete imageData._doc.image
    return binaryData
    // return { ...imageData._doc, data: binaryData }
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
