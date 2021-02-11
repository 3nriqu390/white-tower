import { Body, Controller, Post, Delete } from '@nestjs/common';
import { IndexService } from './index.service';
import { PrismaService } from '../prisma/prisma.service';

@Controller()
export class IndexController {
  constructor(
    private readonly indexService: IndexService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post('search')
  searchWord(@Body('word') tosearch: string) {
    return this.prismaService.word.findMany({
      where: {
        word: tosearch.toLowerCase(),
      },
      include: {
        occurrences: {
          orderBy: {
            ocurrences: 'desc',
          },
          include: {
            page: true,
          },
        },
      },
    });
  }

  @Post('index')
  indexURL(@Body('pageUrl') toIndex) {
    return this.indexService.IndexNewPage(toIndex, this.prismaService);
  }

  @Delete('clear')
  clearIndex() {
    const deletePages = this.prismaService.page.deleteMany({
      where: {
        id: {
          gt: 0,
        },
      },
    });
    const deleteWords = this.prismaService.word.deleteMany({
      where: {
        id: {
          gt: 0,
        },
      },
    });
    const deleteOccurrences = this.prismaService.occurrences.deleteMany({
      where: {
        id: {
          gt: 0,
        },
      },
    });
    this.prismaService.$transaction([
      deletePages,
      deleteWords,
      deleteOccurrences,
    ]);
    return 'Clear Completed';
  }
}
