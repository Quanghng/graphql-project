import { Field, ObjectType } from "@nestjs/graphql";
import { UserModel } from "src/modules/user/user.model";

@ObjectType()
export class PostModel {
  @Field(type => Number)
  id: number;

  @Field(type => Date)
  createdAt: Date;

  @Field(type => Date)
  updatedAt: Date;

  @Field(type => String)
  content: string;

  @Field(type => Number)
  likes: number;

  @Field(type => String)
  comments: string;

  @Field(type => UserModel)
  author: UserModel;

  @Field(type => Number)
  authorId: number;
}