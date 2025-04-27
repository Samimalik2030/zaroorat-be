import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name); 

  constructor(private readonly usersService: UserService) {}

  async onApplicationBootstrap() {
    await this.seedAdminUser();
  }

  private async seedAdminUser() {
    const adminEmail = 'admin@example.com';
    const adminPassword = 'Admin@123';

    try {
      // Check if admin already exists
      const adminExists = await this.usersService.first({
        email: adminEmail,
      });
      if (adminExists) {
        this.logger.log('Admin user already exists.');
        return;
      }

      // Seed the admin user
      await this.usersService.seedAdmin({
        email: adminEmail,
        password: adminPassword,
        fullName: 'admin',
        role:Role.ADMIN
      });

      this.logger.log('Admin user created successfully.');
    } catch (error) {
      this.logger.error('Error while seeding admin user:', error.stack);
    }
  }
}
