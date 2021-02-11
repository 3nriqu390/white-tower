import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IndexModule } from './index/index.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [IndexModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
