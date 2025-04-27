// Inside cart.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCartDto, UpdateCartDto } from './cart.dto';
import { Cart } from './cart.mongo';


@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
  ) {}

  async addToCart(createCartDto: CreateCartDto): Promise<Cart> {
    // Example: prevent duplicate exact items
    const exists = await this.cartModel.findOne({
      userId: createCartDto.userId,
      product: createCartDto.product,
      color: createCartDto.color,
      size: createCartDto.size,
    });
    if (exists) {
      throw new BadRequestException('This item is already in the cart.');
    }

    const cartItem = new this.cartModel(createCartDto);
    return cartItem.save();
  }

  async getCartByUser(userId: string): Promise<Cart[]> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid user ID.');
    }

    return this.cartModel.find({ userId }).populate('product');
  }

  async getCartItem(id: string): Promise<Cart> {
    const item = await this.cartModel.findById(id).populate('product');
    if (!item) {
      throw new NotFoundException('Cart item not found.');
    }
    return item;
  }

  async updateCartItem(id: string, updateCartDto: UpdateCartDto): Promise<Cart> {
    const updated = await this.cartModel.findByIdAndUpdate(id, updateCartDto, {
      new: true,
    });
    if (!updated) {
      throw new NotFoundException('Cart item not found.');
    }
    return updated;
  }

  async removeCartItem(id: string): Promise<void> {
    const deleted = await this.cartModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException('Cart item not found.');
    }
  }

  async clearUserCart(userId: string): Promise<void> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid user ID.');
    }

    await this.cartModel.deleteMany({ userId });
  }
}
