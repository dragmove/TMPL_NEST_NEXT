import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache, CachingConfig } from 'cache-manager';

@Injectable()
export class AppService {
  // Ref: https://docs.nestjs.com/techniques/caching#interacting-with-the-cache-store
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async addToCache(
    key: string,
    item: string | number,
    options?: CachingConfig,
  ) {
    await this.cacheManager.set(key, item, options);
  }

  async getFromCache(key: string) {
    const value: number = await this.cacheManager.get(key);
    if (value != null) return value + 1; // ttl: 10 sec 동안 redis cache가 유지되는 것을 확인할 수 있다.

    const dummy: number = 999;
    await this.cacheManager.set(key, dummy, {
      ttl: 10,
    });
    return dummy;
  }

  async deleteFromCache(key: string) {
    await this.cacheManager.del(key);
  }
}
