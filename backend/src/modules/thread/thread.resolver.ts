import { Args, Query, Mutation, Resolver, ResolveField, Parent } from "@nestjs/graphql";
import { Thread } from "./models/thread.model";
import { ThreadService } from "./thread.service";
import { PostThreadDto } from "./dto/post-thread.dto";
import { ModifyThreadDto } from "./dto/modify-thread.dto";
import { CommentLoader } from "../comment/loaders/comment.loader";
import { Comment } from "../comment/models/comment.model";

@Resolver(() => Thread)
export class ThreadResolver {
  constructor(private threadService: ThreadService, private readonly commentLoader: CommentLoader) { }

  @Query(() => [Thread])
  async getThreads(): Promise<Thread[]> {
    return this.threadService.getThreads();
  }

  @Mutation(() => Thread)
  async postThread(
    @Args('inputs') inputs: PostThreadDto,
  ): Promise<Thread> {
    return this.threadService.postThread(inputs)
  }

  @Mutation(() => Thread)
  async modifyThread(
    @Args('inputs') inputs: ModifyThreadDto,
  ): Promise<Thread> {
    return this.threadService.modifyThread(inputs)
  }

  @Mutation(() => Thread)
  async deleteThread(
    @Args('threadId') threadId: number,
  ): Promise<Thread> {
    return this.threadService.deleteThread(threadId)
  }

  @ResolveField(() => [Comment])
  async getComments(@Parent() thread: Thread): Promise<Comment[]> {
    return this.commentLoader.batchCommentsByThread.load(thread.id);
  }

}