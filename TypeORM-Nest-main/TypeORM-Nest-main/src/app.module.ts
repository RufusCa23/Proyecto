import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './common/enum';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [
    PostModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'api',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // migrationsRun: true,
      synchronize: true,
      autoLoadEntities: true,
    }),
    CategoryModule,
    AuthModule,
    AccessControlModule.forRoles(roles),
    QuestionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
