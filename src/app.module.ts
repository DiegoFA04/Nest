import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedsModule } from './breeds/breeds.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307, // Docker Compose MySQL port
      username: 'user_crud', // Docker Compose MySQL user
      password: 'root', // Docker Compose MySQL password
      database: 'db_crud', // Docker Compose MySQL database
      autoLoadEntities: true,
      synchronize: true,
    }),
    CatsModule,
    BreedsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
