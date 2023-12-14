import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { Constants } from 'utils/constants';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn(emailId: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        emailId: emailId,
      },
    });
    if (!user || !user.password) {
      throw new HttpException(Constants.invalid, HttpStatus.UNAUTHORIZED);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpException(Constants.invalid, HttpStatus.UNAUTHORIZED);
    }

    const accessToken = this.generateAccessToken(user);

    return {
      userData: user,
      access_token: accessToken,
    };
  }

  private generateAccessToken(user: any): string {
    const payload = {
      emailId: user.emailId,
    };
    try {
      const tokenGenerate = this.jwtService.sign(payload, {});
      return tokenGenerate;
    } catch (err) {
      return err;
    }
  }
}
