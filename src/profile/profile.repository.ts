import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createProfile(profile: Profile): Promise<Profile> {
    try {
      const CreatedProfile = await this.prisma.profile.create({
        data: profile,
      });
      return CreatedProfile;
    } catch (error) {
      throw new Exception(
        Exceptions.DatabaseException,
        'Error ao criar: Profile',
      );
    }
  }

  async updateProfile(
    id: string,
    profile: UpdateProfileDto,
  ): Promise<UpdateProfileDto> {
    try {
      const UpdatedProfile = await this.prisma.profile.update({
        where: { id: id },
        data: profile,
      });
      return UpdatedProfile;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async deleteProfile(id: string): Promise<Profile> {
    try {
      const deletedProfile = await this.prisma.profile.delete({
        where: { id: id },
      });
      return deletedProfile;
    } catch (error) {
      throw new Exception(
        Exceptions.DatabaseException,
        'Profile não encontrado.',
      );
    }
  }

  async findAllProfiles(): Promise<Profile[]> {
    try {
      const allProfiles = await this.prisma.profile.findMany();
      return allProfiles;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async findProfileById(id: string): Promise<Profile> {
    try {
      const foundProfile = await this.prisma.profile.findUniqueOrThrow({
        where: { id: id },
      });
      return foundProfile;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }
}
