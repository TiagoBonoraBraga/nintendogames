import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { handleException } from 'src/utils/exceptions/exceptionsHelper';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  service: any;
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async createProfile(
    @Body() { name, image }: CreateProfileDto,
    @Res() response: Response,
  ) {
    try {
      const result = await this.profileService.createProfile({
        name,
        image,
      });
      response.status(201).send(result);
    } catch (error) {
      handleException(error);
    }
  }

  @Get()
  async getAllProfiles(): Promise<Profile[]> {
    return this.profileService.getAllProfiles();
  }

  @Get(':id')
  async getProfileById(@Param('id') profileId: string): Promise<Profile> {
    try {
      return await this.profileService.getProfileById(profileId);
    } catch (error) {
      handleException(error);
    }
  }

  @Patch(':id')
  async updateProfile(
    @Param('id') id: string,
    @Body() profileData: UpdateProfileDto,
  ): Promise<UpdateProfileDto> {
    try {
      return await this.profileService.updateProfile(id, profileData);
    } catch (error) {
      handleException(error);
    }
  }

  @Delete(':id')
  async DeleteProfileById(@Param('id') profileId: string): Promise<string> {
    const profileIsDeleted = await this.profileService.deleteProfileById(
      profileId,
    );
    if (profileIsDeleted) {
      return 'Profile deletado com sucesso';
    } else {
      return 'Profile não encontrado';
    }
  }
}
