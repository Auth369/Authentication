import { Injectable } from '@nestjs/common';
import { AddUserDto } from './dto/addUser.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) {}

  async signUpData(addUserDto: AddUserDto) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await this.hashPassword(addUserDto.password, salt);
      const UserData = await this.prisma.user.create({
        data: {
          fullName: addUserDto.fullName,
          emailId: addUserDto.emailId,
          password: hashedPassword,
          mobileNo: addUserDto.mobileNo,
        },
      });
      return UserData;
    } catch (err) {
      return err;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async getprofileData(id?: string) {
    if (id) {
      const userData = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      return userData;
    } else {
      const userData = await this.prisma.user.findMany();
      return userData;
    }
  }

  async randomJokeData(): Promise<any> {
    try {
      const response = await this.httpService
        .get('https://api.chucknorris.io/jokes/random')
        .toPromise();
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to fetch data');
    }
  }
}
