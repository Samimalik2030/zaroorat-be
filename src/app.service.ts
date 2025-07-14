import { Injectable } from '@nestjs/common';
import { AdminAnalyticsDto } from './admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Professional } from './professional/professional.mongo';
import { User } from './user/user.mongo';
import { Booking } from './bookings/bookings.mongo';
import { Role } from './user/user.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Professional.name)
    private professionalModel: Model<Professional>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getAnalytics(): Promise<AdminAnalyticsDto> {
    const totalProfessionals = await this.professionalModel.countDocuments();
    const totalBookings = await this.bookingModel.countDocuments();
    // const foreignJobApplications = await this.jobApplicationModel.countDocuments();
    const foreignJobApplications = 0
    const activeProfessionals = await this.professionalModel.countDocuments();
    const completedBookings = await this.bookingModel.countDocuments({
      status: 'completed',
    });
    const activeUsers = await this.userModel.countDocuments({ isActive: true });
    const totalCustomers = await this.userModel
      .find({
        role: Role.CUSTOMER,
      })
      .countDocuments({ isActive: true });
    const inactiveUsers = await this.userModel.countDocuments({
      isActive: false,
    });
    const newUsersThisMonth = await this.userModel.countDocuments({
      createdAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    });

    return {
      totalProfessionals,
      totalCustomers,
      totalBookings,
      foreignJobApplications,
      activeProfessionals,
      completedBookings,
      activeUsers,
      inactiveUsers,
      newUsersThisMonth,
    };
  }
}
