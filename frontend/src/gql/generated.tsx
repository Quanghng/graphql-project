import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  likes: Scalars['Int']['output'];
  threadId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  postThread: Thread;
};


export type MutationPostThreadArgs = {
  inputs: PostThreadDto;
};

export type PostThreadDto = {
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  getUser: User;
  threads: Array<Thread>;
};


export type QueryGetUserArgs = {
  id: Scalars['Int']['input'];
};

export type Thread = {
  __typename?: 'Thread';
  comments?: Maybe<Array<Comment>>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  likes: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

/** user */
export type User = {
  __typename?: 'User';
  comments?: Maybe<Array<Comment>>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  getThreads: Array<Thread>;
  hash: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  thread?: Maybe<Array<Thread>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type GetThreadsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetThreadsQuery = { __typename?: 'Query', threads: Array<{ __typename?: 'Thread', id: number, title: string, content: string, likes: number, user: { __typename?: 'User', email: string }, comments?: Array<{ __typename?: 'Comment', id: number, content: string, user: { __typename?: 'User', email: string } }> | null }> };


export const GetThreadsDocument = gql`
    query GetThreads {
  threads {
    id
    title
    content
    likes
    user {
      email
    }
    comments {
      id
      content
      user {
        email
      }
    }
  }
}
    `;

/**
 * __useGetThreadsQuery__
 *
 * To run a query within a React component, call `useGetThreadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetThreadsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetThreadsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetThreadsQuery(baseOptions?: Apollo.QueryHookOptions<GetThreadsQuery, GetThreadsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetThreadsQuery, GetThreadsQueryVariables>(GetThreadsDocument, options);
      }
export function useGetThreadsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetThreadsQuery, GetThreadsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetThreadsQuery, GetThreadsQueryVariables>(GetThreadsDocument, options);
        }
export function useGetThreadsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetThreadsQuery, GetThreadsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetThreadsQuery, GetThreadsQueryVariables>(GetThreadsDocument, options);
        }
export type GetThreadsQueryHookResult = ReturnType<typeof useGetThreadsQuery>;
export type GetThreadsLazyQueryHookResult = ReturnType<typeof useGetThreadsLazyQuery>;
export type GetThreadsSuspenseQueryHookResult = ReturnType<typeof useGetThreadsSuspenseQuery>;
export type GetThreadsQueryResult = Apollo.QueryResult<GetThreadsQuery, GetThreadsQueryVariables>;