import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Thread } from "./models/thread.model";
import { ThreadService } from "./thread.service";
import { PostThreadDto } from "./dto/post-thread.dto";

@Resolver(() => Thread)
export class ThreadResolver {
  constructor(private threadService: ThreadService) { }

  @Mutation(() => Thread)
  async postThread(
    @Args('inputs') inputs: PostThreadDto,
  ): Promise<Thread> {
    return this.threadService.postThread(inputs)
  }
}