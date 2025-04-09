import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Comment } from "./models/comment.model";
import { CommentService } from "./comment.service";
import { PostCommentDto } from "./dto/post-comment.dto";

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private commentService: CommentService) { }

  @Mutation(() => Comment)
  async postComment(
    @Args('inputs') inputs: PostCommentDto,
  ): Promise<Comment> {
    return this.commentService.postComment(inputs)
  }
}