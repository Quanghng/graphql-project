import { Field, ObjectType, Int } from "@nestjs/graphql";

/* ---------- UserModel ---------- */
@ObjectType()
export class UserModel {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String)
  email: string;

  @Field(() => String)
  hash: string;

  @Field(() => [PostModel], { nullable: true })
  posts?: PostModel[];

  @Field(() => [CommentModel], { nullable: true })
  comments?: CommentModel[];
}

/* ---------- PostModel ---------- */
@ObjectType()
export class PostModel {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => Int)
  likes: number;

  @Field(() => UserModel)
  user: UserModel;

  @Field(() => Int)
  userId: number;

  @Field(() => [CommentModel], { nullable: true })
  comments?: CommentModel[];
}

/* ---------- CommentModel ---------- */
@ObjectType()
export class CommentModel {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  content: string;

  @Field(() => Int)
  likes: number;

  @Field(() => PostModel)
  post: PostModel;

  @Field(() => Int)
  postId: number;

  @Field(() => UserModel)
  user: UserModel;

  @Field(() => Int)
  userId: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
