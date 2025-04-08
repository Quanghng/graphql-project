import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { doubleCsrf } from "csrf-csrf";
import { Request, Response } from "express";

@Injectable()
export class CsrfService {
  private csrfProtection;

  constructor(private config: ConfigService) {
    this.csrfProtection = doubleCsrf({
      getSecret: () => {
        const secret = this.config.get<string | string[]>("CSRF_SECRET");
        if (!secret) {
          throw new Error("CSRF_SECRET is not defined in the configuration");
        }
        return secret;
      },
      cookieName: this.config.get("CSRF_COOKIE_NAME"),
    });
  }

  getToken(req: Request, res: Response) {
    const csrf = {
      token: this.csrfProtection.generateToken(req, res),
    }
    return csrf;
  }
}