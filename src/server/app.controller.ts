import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Render,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Render('home')
  @Get()
  public async index(@Query('name') name?: string) {
    // TODO: redis cache 테스트 완료. 정리 필요
    // Ref:
    // https://docs.nestjs.com/techniques/caching#interacting-with-the-cache-store
    // https://github.com/dabroek/node-cache-manager-redis-store
    // https://www.learmoreseekmore.com/2020/12/nestjs-redis-cache.html
    // https://progressivecoder.com/setting-up-nestjs-caching-using-cache-manager-and-in-memory-cache/
    // https://wanago.io/2021/01/04/api-nestjs-in-memory-cache-performance/
    // https://wanago.io/2021/01/11/nestjs-cache-redis-node-js-cluster/
    const foo = await this.appService.getFromCache('foo');
    console.log('[index] foo :', foo);

    return { name, foo };
  }

  @Render('about')
  @Get('/about')
  public about() {
    return {};
  }

  /*
  @Post('/cache')
  async addToCache(@Body() cacheEntry: any) {
    await this.appService.addToCache(cacheEntry.key, cacheEntry.item, {
      ttl: 1000,
    });
  }

  @Get('/cache/:key')
  async getFromCache(@Res() response, @Param('key') key) {
    const value = await this.appService.getFromCache(key);
    console.log('[/cache/:key] value :', value);

    return response.status(HttpStatus.OK).json(value);
  }

  @Delete('/cache/:key')
  async deleteFromCache(@Param('key') key) {
    await this.appService.deleteFromCache(key);
  }
  */
}
