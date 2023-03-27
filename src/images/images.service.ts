import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImagesEntity } from './entities/image.entity';
import { CreateImageDto, CreateImageIdDto } from './dto/create-image.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImagesEntity)
    private readonly imageRepository: Repository<ImagesEntity>,
  ) {}

  async uploadImage(
    id: CreateImageIdDto,
    pathName: string,
  ): Promise<CreateImageDto | string> {
    try {
      const newImage = this.imageRepository.create();
      newImage.name = pathName;
      newImage.dateCreated = new Date();
      if (id) {
        if (id.workoutId) newImage.workoutId = id.workoutId;
        if (id.exerciseId) newImage.exerciseId = id.exerciseId;
      }
      if (!id.workoutId && !id.exerciseId) {
        throw new Error('somtehing went wrong');
      }

      const image = await this.imageRepository.save(newImage);

      return image;
    } catch (error) {
      console.log(error);
      return 'Error Will Robinson';
    }
  }

  async getImage(id: string): Promise<ImagesEntity | Buffer | string> {
    const image = await this.imageRepository.findOneBy({ id });
    return image;
  }

  async getImages(): Promise<ImagesEntity[]> {
    return this.imageRepository.find();
  }
  async deleteImage(id: number): Promise<void> {
    await this.imageRepository.delete(id);
  }

  // create(createImageDto: CreateImageDto) {
  //   return 'This action adds a new image';
  // }
  // findAll() {
  //   return `This action returns all images`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} image`;
  // }
  // update(id: number, updateImageDto: UpdateImageDto) {
  //   return `This action updates a #${id} image`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} image`;
  // }
}
