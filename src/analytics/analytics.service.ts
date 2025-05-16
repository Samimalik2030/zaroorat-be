import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Analytics } from './analytics.mongo';
import { ProductService } from 'src/products/service/products.service';
import { ProjectService } from 'src/project/project.service';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Analytics.name) private analyticsModel: Model<Analytics>,
    private readonly ProductService: ProductService,
    private readonly ProjectsService: ProjectService,
    private readonly OrderService: OrderService,
  ) {}

  async calculateData() {
    const products = await this.ProductService.find();
    const projects = await this.ProjectsService.findAll();
    const orders = await this.OrderService.findAll();
    const response = {
      productCount: products.length,
      orderCount: orders.length,
      projectCount: projects.length,
      totalSales: orders.reduce((acc, curr) => curr.total + acc, 1),
    };
    return response
  }

  // Save or update an analytics record
  // async saveOrUpdateAnalytics(
  //   metric: string,
  //   value: number,
  //   period: string,
  //   granularity: string,
  //   category: string,
  //   additionalData: object = {},
  // ): Promise<Analytics> {

  //   const existingAnalytics = await this.analyticsModel.findOne({
  //     metric,
  //     period,
  //     granularity,
  //     category,
  //   });

  //   if (existingAnalytics) {

  //     existingAnalytics.value = value;
  //     existingAnalytics.additionalData = additionalData;
  //     await existingAnalytics.save();
  //     return existingAnalytics;
  //   } else {

  //     const newAnalytics = new this.analyticsModel({
  //       metric,
  //       value,
  //       period,
  //       granularity,
  //       category,
  //       additionalData,
  //     });
  //     return newAnalytics.save();
  //   }
  // }

  // Calculate total sales for a specific period
  // async calculateTotalSales(period: string): Promise<void> {
  //   const totalSales = await this.orderModel.aggregate([
  //     {
  //       $match: {
  //         createdAt: {
  //           $gte: new Date(period),
  //           $lt: new Date(
  //             new Date(period).setMonth(new Date(period).getMonth() + 1),
  //           ),
  //         },
  //       },
  //     },
  //     { $group: { _id: null, totalSales: { $sum: '$total' } } },
  //   ]);

  //   await this.saveOrUpdateAnalytics(
  //     'totalSales',
  //     totalSales[0]?.totalSales || 0,
  //     period,
  //     'monthly',
  //     'sales',
  //   );
  // }

  // Calculate total orders for a specific period
  // async calculateTotalOrders(period: string): Promise<void> {
  //   const totalOrders = await this.orderModel.countDocuments({
  //     createdAt: {
  //       $gte: new Date(period),
  //       $lt: new Date(
  //         new Date(period).setMonth(new Date(period).getMonth() + 1),
  //       ),
  //     },
  //   });

  //   await this.saveOrUpdateAnalytics(
  //     'totalOrders',
  //     totalOrders,
  //     period,
  //     'monthly',
  //     'orderCount',
  //   );
  // }

  // Calculate top-selling products for a specific period
  // async calculateTopSellingProducts(period: string): Promise<void> {
  //   const topProducts = await this.orderModel.aggregate([
  //     {
  //       $match: {
  //         createdAt: {
  //           $gte: new Date(period),
  //           $lt: new Date(
  //             new Date(period).setMonth(new Date(period).getMonth() + 1),
  //           ),
  //         },
  //       },
  //     },
  //     { $unwind: '$products' },
  //     { $group: { _id: '$products', totalSold: { $sum: 1 } } },
  //     { $sort: { totalSold: -1 } },
  //     { $limit: 5 },
  //   ]);

  //   const productIds = topProducts.map((product) => product._id);

  //   await this.saveOrUpdateAnalytics(
  //     'topSellingProducts',
  //     topProducts.length,
  //     period,
  //     'monthly',
  //     'productPerformance',
  //     { products: productIds },
  //   );
  // }
}
