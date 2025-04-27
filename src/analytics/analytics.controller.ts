import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { Analytics } from './analytics.mongo';


@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  // Endpoint for Total Sales Analytics
  // @Get('total-sales')
  // @ApiOperation({ summary: 'Get total sales for a specific period' })
  // @ApiQuery({ name: 'period', description: 'Period (e.g., 2025-04)', required: true })
  // @ApiQuery({ name: 'granularity', description: 'Granularity of the data (e.g., monthly, yearly)', required: true, enum: ['monthly', 'yearly'] })
  // @ApiResponse({ status: 200, description: 'Total sales data', type: Analytics })
  // async getTotalSales(
  //   @Query('period') period: string,
  //   @Query('granularity') granularity: string
  // ): Promise<Analytics> {
  //   const result = await this.analyticsService.calculateTotalSales(period);
  //   return this.analyticsService.saveOrUpdateAnalytics(
  //     'totalSales',
  //     result.value,
  //     period,
  //     granularity,
  //     'sales',
  //     result.additionalData || {}
  //   );
  // }

  // Endpoint for Total Orders Analytics
  // @Get('total-orders')
  // @ApiOperation({ summary: 'Get total orders for a specific period' })
  // @ApiQuery({ name: 'period', description: 'Period (e.g., 2025-04)', required: true })
  // @ApiQuery({ name: 'granularity', description: 'Granularity of the data (e.g., monthly, yearly)', required: true, enum: ['monthly', 'yearly'] })
  // @ApiResponse({ status: 200, description: 'Total orders data', type: Analytics })
  // async getTotalOrders(
  //   @Query('period') period: string,
  //   @Query('granularity') granularity: string
  // ): Promise<Analytics> {
  //   const result = await this.analyticsService.calculateTotalOrders(period);
  //   return this.analyticsService.saveOrUpdateAnalytics(
  //     'totalOrders',
  //     result.value,
  //     period,
  //     granularity,
  //     'orderCount',
  //     result.additionalData || {}
  //   );
  // }

  // Endpoint for Top Selling Products Analytics
  // @Get('top-selling-products')
  // @ApiOperation({ summary: 'Get top-selling products for a specific period' })
  // @ApiQuery({ name: 'period', description: 'Period (e.g., 2025-04)', required: true })
  // @ApiQuery({ name: 'granularity', description: 'Granularity of the data (e.g., monthly, yearly)', required: true, enum: ['monthly', 'yearly'] })
  // @ApiResponse({ status: 200, description: 'Top selling products data', type: Analytics })
  // async getTopSellingProducts(
  //   @Query('period') period: string,
  //   @Query('granularity') granularity: string
  // ): Promise<Analytics> {
  //   const result = await this.analyticsService.calculateTopSellingProducts(period);
  //   return this.analyticsService.saveOrUpdateAnalytics(
  //     'topSellingProducts',
  //     result.value,
  //     period,
  //     granularity,
  //     'productPerformance',
  //     result.additionalData || {}
  //   );
  // }

  // Endpoint for Monthly Revenue Analytics
  // @Get('monthly-revenue')
  // @ApiOperation({ summary: 'Get monthly revenue for a specific period' })
  // @ApiQuery({ name: 'period', description: 'Period (e.g., 2025-04)', required: true })
  // @ApiQuery({ name: 'granularity', description: 'Granularity of the data (e.g., monthly, yearly)', required: true, enum: ['monthly', 'yearly'] })
  // @ApiResponse({ status: 200, description: 'Monthly revenue data', type: Analytics })
  // async getMonthlyRevenue(
  //   @Query('period') period: string,
  //   @Query('granularity') granularity: string
  // ): Promise<Analytics> {
  //   const result = await this.analyticsService.calculateTotalSales(period); // Monthly revenue can be similar to total sales
  //   return this.analyticsService.saveOrUpdateAnalytics(
  //     'monthlyRevenue',
  //     result.value,
  //     period,
  //     granularity,
  //     'sales',
  //     result.additionalData || {}
  //   );
  // }

  // Endpoint for Product Performance Analytics
  // @Get('product-performance')
  // @ApiOperation({ summary: 'Get product performance analytics for a specific period' })
  // @ApiQuery({ name: 'period', description: 'Period (e.g., 2025-04)', required: true })
  // @ApiQuery({ name: 'granularity', description: 'Granularity of the data (e.g., monthly, yearly)', required: true, enum: ['monthly', 'yearly'] })
  // @ApiResponse({ status: 200, description: 'Product performance data', type: Analytics })
  // async getProductPerformance(
  //   @Query('period') period: string,
  //   @Query('granularity') granularity: string
  // ): Promise<Analytics> {
  //   const result = await this.analyticsService.calculateTopSellingProducts(period); // Could be more detailed product performance data
  //   return this.analyticsService.saveOrUpdateAnalytics(
  //     'productPerformance',
  //     result.value,
  //     period,
  //     granularity,
  //     'productPerformance',
  //     result.additionalData || {}
  //   );
  // }
}
