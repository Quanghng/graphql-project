import { Args, Int, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { ThreadService } from "../thread/thread.service";
import { User } from "./models/user.model";
import { Thread } from "../thread/models/thread.model";

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private threadService: ThreadService,
  ) { }

  @Query(() => User)
  async getUser(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @ResolveField(() => [Thread])
  async getThreads(@Parent() user: User) {
    console.log('user', user);
    const { id } = user;
    return this.threadService.getThreadsByUser(id);
  }
}