import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { OrderService } from './order.service';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateOrderDto, UpdateOrderDto } from './order.dto';
import { Order } from './order.mongo';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Create a new order
  // @Post()
  // @ApiOperation({ summary: 'Create a new order' })
  // @ApiResponse({ status: 201, description: 'Order successfully created', type: Order })
  // @ApiResponse({ status: 400, description: 'Bad Request' })
  // async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
  //   return this.orderService.create(createOrderDto);
  // }

  // Get all orders
  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'List of orders', type: [Order] })
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  // Get an order by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiResponse({ status: 200, description: 'The order details', type: Order })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async findOne(@Param('id') id: string): Promise<Order> {
    return this.orderService.findOne(id);
  }

  // Update an order by ID
  @Put(':id')
  @ApiOperation({ summary: 'Update an order by ID' })
  @ApiResponse({ status: 200, description: 'Order updated successfully', type: Order })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.orderService.update(id, updateOrderDto);
  }

  // Delete an order by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order by ID' })
  @ApiResponse({ status: 200, description: 'Order deleted successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async remove(@Param('id') id: string): Promise<Order> {
    return this.orderService.remove(id);
  }
}
