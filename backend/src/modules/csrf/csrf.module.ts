import { Global, Module } from "@nestjs/common";
import { CsrfController } from "./csrf.controller";
import { CsrfService } from "./csrf.service";

@Global()
@Module({
  controllers: [CsrfController],
  providers: [CsrfService],
  exports: [CsrfService],
})
export class CsrfModule { }