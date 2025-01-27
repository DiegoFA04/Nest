import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from '../breeds/entities/breed.entity';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { Role } from '../common/enums/rol.enum';

@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Breed)
    private readonly breedRepositorie: Repository<Breed>,

    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
  ) { }

  async create(createCatDto: CreateCatDto, user: UserActiveInterface) {

    const breed = await this.breedRepositorie.findOneBy({
      name: createCatDto.breed
    });

    if (!breed) {
      throw new BadRequestException('Breed not found');
    }

    const cat = this.catRepository.create({
      ...createCatDto,
      breed: breed,
      userEmail: user.email
    })
    return await this.catRepository.save(cat);
  }

  async findAll(user: UserActiveInterface) {

    if (user.role === Role.ADMIN) {
      return await this.catRepository.find();
    }

    return await this.catRepository.find({
      where: {
        userEmail: user.email
      }
    });
  }

  async findOne(id: number) {
    return await this.catRepository.findOneBy({ id });
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    //return await this.catRepository.update(id, updateCatDto);
    return 0;
  }

  async remove(id: number) {
    return await this.catRepository.softDelete(id);
  }
}
