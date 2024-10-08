import { Injectable } from '@nestjs/common';
import { BlogsRepository } from '../infrastructure/blogs.repository';
import { BlogCreateModel } from '../api/models/input/create-blog.input.model';
import { Blog } from '../domain/blog.entity';

@Injectable()
export class BlogsService {
  constructor(private readonly blogsRepository: BlogsRepository) {}

  async create(blogCreateModel: BlogCreateModel): Promise<{ id: string }> {
    const newBlogDto: Blog = {
      name: blogCreateModel.name,
      description: blogCreateModel.description,
      websiteUrl: blogCreateModel.websiteUrl,
      createdAt: new Date(),
      isMembership: false,
    };
    return await this.blogsRepository.create(newBlogDto);
  }

  async update(
    id: string,
    blogUpdateModel: BlogCreateModel,
  ): Promise<boolean | null> {
    const foundBlog = await this.blogsRepository.findByIdOrNotFoundFail(id);
    const updatedBlogDto: BlogCreateModel = {
      name: blogUpdateModel.name,
      description: blogUpdateModel.description,
      websiteUrl: blogUpdateModel.websiteUrl,
    };
    return await this.blogsRepository.update(foundBlog, updatedBlogDto);
  }

  async delete(id: string): Promise<boolean> {
    const foundBlog = await this.blogsRepository.findByIdOrNotFoundFail(id);
    return this.blogsRepository.delete(foundBlog.id);
  }
}
