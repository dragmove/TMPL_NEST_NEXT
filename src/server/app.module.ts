import { join } from 'path';
import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { ViewModule } from './view/view.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'public'),
    }),
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
        // conf: { useFilesystemPublicRoutes: false },
      }),
    ),
    ApiModule,
    ViewModule,
  ],
  // controllers: [],
  // providers: [],
})
export class AppModule {}
