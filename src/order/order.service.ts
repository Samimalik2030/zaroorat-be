import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProductService } from 'src/products/service/products.service';
import { Order } from './order.mongo';
import { CreateOrderDto, UpdateOrderDto } from './order.dto';


@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private productService: ProductService, 
  ) {}


  // async create(createOrderDto: CreateOrderDto): Promise<Order> {

  //   const productIds = createOrderDto.products.map(product => product.toString());
  //   const products = await this.productService.findByIds(productIds);
  //   if (products.length !== createOrderDto.products.length) {
  //     throw new BadRequestException('One or more products are invalid or not found.');
  //   }


  //   const subtotal = createOrderDto.products.reduce((sum, product) => sum + product., 0);
  //   const shipping = createOrderDto.shippingAddress ? 50 : 0; 
  //   const tax = (subtotal + shipping) * 0.1;
  //   const total = subtotal + shipping + tax;

  //   const order = new this.orderModel({
  //     ...createOrderDto,
  //     subtotal,
  //     shipping,
  //     tax,
  //     total,
  //   });

  //   return order.save();
  // }

  // Get all orders (with pagination or filtering as needed)
  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  // Get an order by ID
  async findOne(id: string): Promise<Order> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid order ID');
    }

    const order = await this.orderModel.findById(id).populate('products').populate('user').exec();
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  // Update an order by ID
  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid order ID');
    }

    const updatedOrder = await this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true }).exec();
    if (!updatedOrder) {
      throw new NotFoundException('Order not found');
    }

    return updatedOrder;
  }


  async remove(id: string): Promise<Order> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid order ID');
    }

    const deletedOrder = await this.orderModel.findByIdAndDelete(id).exec();
    if (!deletedOrder) {
      throw new NotFoundException('Order not found');
    }

    return deletedOrder;
  }


  async findByUser(userId: string): Promise<Order[]> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid user ID');
    }

    return this.orderModel.find({ user: userId }).exec();
  }


  async findByStatus(status: string): Promise<Order[]> {
    return this.orderModel.find({ status }).exec();
  }
}
