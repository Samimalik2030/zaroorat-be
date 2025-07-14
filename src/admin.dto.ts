import { ApiProperty } from '@nestjs/swagger';

export class AdminAnalyticsDto {
  @ApiProperty({ example: 420 })
  totalProfessionals: number;

  @ApiProperty({ example: 1350 })
  totalCustomers: number;

  @ApiProperty({ example: 870 })
  totalBookings: number;

  @ApiProperty({ example: 320 })
  foreignJobApplications: number;

  @ApiProperty({ example: 380 })
  activeProfessionals: number;

  @ApiProperty({ example: 650 })
  completedBookings: number;

  @ApiProperty({ example: 950 })
  activeUsers: number;

  @ApiProperty({ example: 150 })
  inactiveUsers: number;

  @ApiProperty({ example: 120 })
  newUsersThisMonth: number;
}
