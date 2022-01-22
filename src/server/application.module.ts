import { CacheModule, Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogController } from './blog/blog.controller';
import { BlogService } from './blog/blog.service';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
        // conf: { useFilesystemPublicRoutes: false },
      }),
      // FIXME:
      // {
      //   viewsDir: null,
      // },
    ),
    CacheModule.register({
      store: redisStore,
      host: 'redis-server',
      port: 6379,
      ttl: 10, // sec
      max: 100, // maximum number of items in cache
    }),
  ],
  controllers: [AppController, BlogController],
  providers: [AppService, BlogService],
})
export class AppModule {}
