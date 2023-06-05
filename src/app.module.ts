import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TeachersModule } from './teachers/teachers.module';
import { CareersModule } from './careers/careers.module';
import { SubjectsModule } from './subjects/subjects.module';
import { CoursesModule } from './courses/courses.module';
import { TeachersDetailsModule } from './teachers-details/teachers-details.module';
import { LaboratoriesModule } from './laboratories/laboratories.module';
import { LaboratoryStatusModule } from './laboratory_status/laboratory_status.module';
import { LaboratoryAssignModule } from './laboratory_assign/laboratory_assign.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [],
        synchronize: true,
        logging: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    TeachersModule,
    CareersModule,
    SubjectsModule,
    CoursesModule,
    TeachersDetailsModule,
    LaboratoriesModule,
    LaboratoryStatusModule,
    LaboratoryAssignModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
