import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileRepository } from './profile.repository';
import { randomUUID } from 'crypto';

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

  getAllProfiles() {
    return `This action returns all profile`;
  }

  getAll(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
