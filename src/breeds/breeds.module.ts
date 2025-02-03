import { Module } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { BreedsController } from './breeds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [BreedsController],
  providers: [BreedsService],
  imports: [TypeOrmModule.forFeature([Breed]), AuthModule],
  exports: [TypeOrmModule],
})
export class BreedsModule { }
