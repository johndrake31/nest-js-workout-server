import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';
import { WorkoutsModule } from './workouts/workouts.module';
import { ExercisesModule } from './exercises/exercises.module';
import { ImagesModule } from './images/images.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';

const env = process.env;
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: env.DB_HOST,
      port: +env.DB_PORT,
      username: env.DB_USER_NAME,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}', UserEntity],
      synchronize: false,
      autoLoadEntities: true,
      socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
    }),
    UserModule,
    AuthModule,
    WorkoutsModule,
    ExercisesModule,
    ImagesModule,
    MulterModule.register({
      dest: './files',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
