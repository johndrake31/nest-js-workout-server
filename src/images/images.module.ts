import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { ImagesEntity } from './entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImagesEntity])],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
