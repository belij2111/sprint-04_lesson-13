import { Module } from '@nestjs/common';
import { TestingController } from './api/testing.controller';
import { TestingService } from './application/testing.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from '../content/blogs/domain/blog.entity';
import { User, UserSchema } from '../users/domain/user.entity';
import { TestingRepository } from './infrastructure/testing.repository';
import { Post, PostSchema } from '../content/posts/domain/post.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [TestingController],
  providers: [TestingService, TestingRepository],
})
export class TestingModule {}
