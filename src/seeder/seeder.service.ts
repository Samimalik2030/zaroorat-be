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
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'password';

    try {
      const adminExists = await this.usersService.first({
        email: adminEmail,
      });
      if (adminExists) {
        this.logger.log('Admin user already exists.');
        return;
      }

      await this.usersService.seedAdmin({
        email: adminEmail,
        password: adminPassword,
        fullName: 'admin',
        role: Role.ADMIN,
      });

      this.logger.log('Admin user created successfully.');
    } catch (error) {
      this.logger.error('Error while seeding admin user:', error.stack);
    }
  }
}
