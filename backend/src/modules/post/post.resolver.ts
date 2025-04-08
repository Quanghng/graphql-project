import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { PostService } from './post.service';
import { PostModel } from '../models';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { GqlExecutionContext } from '@nestjs/graphql';

@Resolver(() => PostModel)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => [PostModel])
  async posts() {
    return this.postService.getAllPosts();
  }

  @UseGuards(GqlAuthGuard)
    @Mutation(() => PostModel)
    async createPost(
    @Args('title') title: string,
    @Args('content') content: string,
    @Context() context: any, 
    ) {
    const user = context.req.user;
    return this.postService.createPost(user.sub, title, content);
    }

}