import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule, CsrfModule, PostModule, PrismaModule, UserModule } from './modules';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { Request } from 'express';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), 
      playground: true, 
      installSubscriptionHandlers: false, 
    }),

    CsrfModule,
    AuthModule,
    UserModule,
    PostModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

