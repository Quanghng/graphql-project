import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from '../models';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [UserModel])
  async users() {
    return this.userService.findAll(); 
  }
  
  @Query(() => UserModel, { nullable: true })
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findById(id); 
  }
}
