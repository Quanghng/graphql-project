import { Field, ObjectType } from "@nestjs/graphql";
import { PostModel } from "../post/post.model";
import { UserModel } from "../user/user.model";

@ObjectType()
export class CommentModel {
  @Field(type => Number)
  id: number;

  @Field(type => String)
  content: string;

  @Field(type => Number)
  likes: number;

  @Field(type => PostModel)
  post: PostModel;

  @Field(type => Number)
  postId: number;

  @Field(type => UserModel)
  user: UserModel;

  @Field(type => Number)
  userId: number;

  @Field(type => Date)
  createdAt: Date;

  @Field(type => Date)
  updatedAt: Date;
}