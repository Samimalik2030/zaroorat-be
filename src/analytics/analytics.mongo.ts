import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Schema } from 'mongoose';
import { MongoSchema } from 'src/decorator/mongo-schema.decorator';
import { BaseSchema } from 'src/common/base.schema';

@MongoSchema()
export class Analytics extends BaseSchema {
  @ApiProperty({ example: 'totalSales' })
  @Prop({ required: true })
  metric: string; // The type of metric, e.g., totalSales, topSellingProducts, monthlyRevenue

  @ApiProperty()
  @Prop({ required: true })
  value: number; // The value of the metric (e.g., total sales revenue, total orders)

  @ApiProperty({ example: '2025-04' })
  @Prop({ required: true })
  period: string; // The time period this metric corresponds to (e.g., '2025-04' for April 2025)

  @ApiProperty({ example: 'monthly' })
  @Prop({ required: true })
  granularity: string; // Granularity of the metric (e.g., 'monthly', 'yearly', etc.)

  @ApiProperty({ example: 'revenue' })
  @Prop({ required: true })
  metricCategory: string; // Category of the metric, like 'sales', 'orderCount', 'productPerformance', etc.

 
}

export const AnalyticsSchema = SchemaFactory.createForClass(Analytics);
