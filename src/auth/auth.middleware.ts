import { Constants, endpoints } from 'utils/constants';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: any, res: any, next: () => void) {
    const authHeader = req.headers.authorization;
    if (
      req.originalUrl.startsWith(endpoints.users + endpoints.signUp) ||
      req.originalUrl.startsWith(endpoints.users + endpoints.signIn)
    ) {
      next();
      return;
    }

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      try {
        const decoded = this.jwtService.verify(token);
        req.user = decoded;
        next();
      } catch (err) {
        res.status(401).send(Constants.invalidToken);
      }
    } else {
      res.status(401).send(Constants.Unauthorized);
    }
  }
}
