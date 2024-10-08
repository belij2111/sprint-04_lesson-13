import { Injectable } from '@nestjs/common';
import { PostsRepository } from '../infrastructure/posts.repository';
import { PostCreateModel } from '../api/models/input/create-post.input.model';
import { Post } from '../domain/post.entity';
import { BlogsRepository } from '../../blogs/infrastructure/blogs.repository';

@Injectable()
export class PostsService {
  constructor(
    private readonly postRepository: PostsRepository,
    private readonly blogsRepository: BlogsRepository,
  ) {}

  async create(postCreateModel: PostCreateModel): Promise<{ id: string }> {
    const foundBlog = await this.blogsRepository.findByIdOrNotFoundFail(
      postCreateModel.blogId,
    );
    const newPostDto: Post = {
      title: postCreateModel.title,
      shortDescription: postCreateModel.shortDescription,
      content: postCreateModel.content,
      blogId: postCreateModel.blogId,
      blogName: foundBlog.name,
      createdAt: new Date(),
      extendedLikesInfo: {
        likesCount: 0,
        dislikesCount: 0,
        myStatus: 'None',
        newestLikes: [],
      },
    };
    return await this.postRepository.create(newPostDto);
  }

  async delete(id: string): Promise<boolean> {
    const foundPost = await this.postRepository.findByIdOrNotFoundFail(id);
    return this.postRepository.delete(foundPost.id);
  }

  async update(
    id: string,
    postUpdateModel: PostCreateModel,
  ): Promise<boolean | null> {
    const foundPost = await this.postRepository.findByIdOrNotFoundFail(id);
    const updatedPostDto: PostCreateModel = {
      title: postUpdateModel.title,
      shortDescription: postUpdateModel.shortDescription,
      content: postUpdateModel.content,
      blogId: postUpdateModel.blogId,
    };
    return await this.postRepository.update(foundPost, updatedPostDto);
  }

  async createPostByBlogId(
    blogId: string,
    postCreateModel: PostCreateModel,
  ): Promise<{ id: string }> {
    const foundBlog = await this.blogsRepository.findByIdOrNotFoundFail(blogId);
    const newPostDto: Post = {
      title: postCreateModel.title,
      shortDescription: postCreateModel.shortDescription,
      content: postCreateModel.content,
      blogId: foundBlog.id,
      blogName: foundBlog.name,
      createdAt: new Date(),
      extendedLikesInfo: {
        likesCount: 0,
        dislikesCount: 0,
        myStatus: 'None',
        newestLikes: [],
      },
    };
    return await this.postRepository.create(newPostDto);
  }
}
