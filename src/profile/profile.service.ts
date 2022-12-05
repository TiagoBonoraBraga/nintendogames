import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileRepository } from './profile.repository';
import { randomUUID } from 'crypto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async createProfile(profile: CreateProfileDto): Promise<CreateProfileDto> {
    const profileEntity = { ...profile, id: randomUUID() };
    const createdProfile = await this.profileRepository.createProfile(
      profileEntity,
    );
    return createdProfile;
  }

  async getAllProfiles(): Promise<Profile[]> {
    return await this.profileRepository.findAllUsers();
  }

  async getProfileById(profileId: string): Promise<Profile> {
    const foundProfile = await this.profileRepository.findProfileById(
      profileId,
    );
    return foundProfile;
  }

  async updateProfile(
    id: string,
    profileData: UpdateProfileDto,
  ): Promise<UpdateProfileDto> {
    const updatedProfile = await this.profileRepository.updateProfile(
      id,
      profileData,
    );
    return updatedProfile;
  }

  async deleteProfileById(profileId: string): Promise<boolean> {
    try {
      const existiProfile = await this.profileRepository.deleteProfile(
        profileId,
      );
      if (existiProfile) {
        return true;
      }
    } catch (error) {
      console.log(error);
      return true;
    }
  }
}
