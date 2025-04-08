import { Field, ObjectType } from "@nestjs/graphql";
import { PostModel } from "../post/post.model";
import { CommentModel } from "../comment/comment.model";

@ObjectType()
export class UserModel {
  @Field(type => Number)
  id: number;

  @Field(type => Date)
  createdAt: Date;

  @Field(type => Date)
  updatedAt: Date;

  @Field(type => String)
  email: string;

  @Field(type => String)
  hash: string;

  @Field(type => String, { nullable: true })
  firstName?: string;

  @Field(type => String, { nullable: true })
  lastName?: string;

  @Field(type => String, { nullable: true })
  refreshToken?: string;

  @Field(type => PostModel)
  posts?: PostModel[]

  @Field(type => CommentModel)
  comments?: CommentModel[]
}