import { config } from 'dotenv';
import process from 'process';

config();

class AppSettings {
  constructor(
    private readonly PORT: string = process.env.PORT ?? '3002',
    private readonly MONGO_URL: string = process.env.MONGO_URL ?? '',
    private readonly COLLECTION_NAME = {
      USERS: process.env.USERS_COLLECTION_NAME ?? '',
      BLOGS: process.env.BLOGS_COLLECTION_NAME ?? '',
      POSTS: process.env.POSTS_COLLECTION_NAME ?? '',
    },
    private readonly PATH = {
      USERS: '/users',
      BLOGS: '/blogs',
      POSTS: '/posts',
      TESTING: '/testing/all-data',
    },
  ) {}

  getPort(): string {
    return this.PORT;
  }
  getMongoUrl(): string {
    return this.MONGO_URL;
  }
  getCollectionNames() {
    return this.COLLECTION_NAME;
  }
  getPath() {
    return this.PATH;
  }
}

export const appSettings = new AppSettings();
