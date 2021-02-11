import { Injectable } from '@nestjs/common';
import got from 'got';
import * as cheerio from 'cheerio';
import { PrismaService } from '../prisma/prisma.service';

export interface node {
  pageUrl: string;
  height: number;
}

@Injectable()
export class IndexService {
  private pagesQueue: node[] = [];
  private pageCount = 0;
  private wordCount = 0;

  IndexNewPage = async (page: string, prismaService: PrismaService) => {
    page = page.includes('http') ? page : 'http://' + page;
    this.pagesQueue.push({ pageUrl: page, height: 0 });
    await this.visitPages(prismaService);
    const result = {
      pages: this.pageCount.valueOf(),
      words: this.wordCount.valueOf(),
    };
    this.pageCount = 0;
    this.wordCount = 0;
    return result;
  };

  visitPages = async (prisma: PrismaService) => {
    while (this.pagesQueue.length > 0) {
      const current = this.pagesQueue[0];
      const indexedPage = await prisma.page.findUnique({
        where: { url: current.pageUrl },
      });
      if (!indexedPage /*&& this.validURL(current.pageUrl)*/) {
        await this.parsePages(current.pageUrl, current.height, prisma);
      }
      this.pagesQueue = this.pagesQueue.slice(1);
    }
  };

  parsePages = async (
    currentPage: string,
    height: number,
    prisma: PrismaService,
  ) => {
    let parsedPage;
    let pageTitle;

    return got(currentPage)
      .then(async (response) => {
        this.pageCount++;
        parsedPage = cheerio.load(response.body);
        pageTitle = parsedPage('title').text();
        await prisma.page.create({
          data: {
            url: currentPage,
            name: pageTitle,
          },
        });

        parsedPage('a').each((i, link) => {
          const href = link.attribs.href;
          if (
            this.pagesQueue.every((node) => node.pageUrl !== href) &&
            this.isValid(href) &&
            height < 2
          ) {
            this.pagesQueue.push({ pageUrl: href, height: height + 1 });
          }
        });

        await this.indexWords(
          parsedPage('body').text(),
          currentPage,
          pageTitle,
          prisma,
        );
      })
      .catch((err) => {
        return err;
      });
  };

  isValid = (url: string) => {
    if (typeof url === 'undefined') {
      return false;
    }
    return url.includes('http');
  };

  indexWords = async (
    text: string,
    currentPage: string,
    title: string,
    prisma: PrismaService,
  ) => {
    const plainText = text
      .replace(/[^\w\s]/gi, ' ')
      .replace(/(\r\n|\n|\r)/gm, ' ')
      .toLowerCase();

    const wordsArray = plainText.split(' ');

    for (let i = 0; i < wordsArray.length; i++) {
      if (wordsArray[i] !== '') {
        const indexedWord = await prisma.word.findFirst({
          where: { word: wordsArray[i] },
        });
        const currentpageId = await prisma.page.findFirst({
          where: {
            url: currentPage,
          },
          select: {
            id: true,
          },
        });
        if (!indexedWord) {
          this.wordCount++;
          console.log(this.wordCount);
          await prisma.word.create({
            data: {
              word: wordsArray[i],
              occurrences: {
                create: [
                  {
                    ocurrences: 1,
                    pageId: currentpageId.id,
                  },
                ],
              },
            },
          });
        } else {
          const currentwordId = await prisma.word.findFirst({
            where: {
              word: wordsArray[i],
            },
            select: {
              id: true,
            },
          });
          const foundOcurrence = await prisma.occurrences.findFirst({
            where: {
              wordId: currentwordId.id,
              pageId: currentpageId.id,
            },
            select: {
              ocurrences: true,
              id: true,
            },
          });
          if (foundOcurrence) {
            await prisma.occurrences.update({
              where: {
                id: foundOcurrence.id,
              },
              data: {
                ocurrences: {
                  increment: 1,
                },
              },
            });
          } else {
            await prisma.occurrences.create({
              data: {
                ocurrences: 1,
                pageId: currentpageId.id,
                wordId: currentwordId.id,
              },
            });
          }
        }
      }
    }
  };
}
