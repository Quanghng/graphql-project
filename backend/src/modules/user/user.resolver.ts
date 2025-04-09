import { Args, Int, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { ThreadService } from "../thread/thread.service";
import { User } from "./models/user.model";
import { Thread } from "../thread/models/thread.model";
import { ThreadLoader } from "../thread/loaders/thread.loader";

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly threadLoader: ThreadLoader,
    private userService: UserService,
    private threadService: ThreadService
  ) { }

  @Query(() => User)
  async getUser(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @ResolveField(() => [Thread])
  async getThreads(@Parent() user: User): Promise<Thread[]> {
    return this.threadLoader.batchThreadsByUser.load(user.id);
  }
}