import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from 'src/user/user.mongo';
import { Wishlist } from './wishlist.mongo';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(Wishlist.name) private wishlistModel: Model<Wishlist>,
  ) {}

  async addToWishlist(userId: string, productId: string): Promise<any> {
    const existingWishlist = await this.wishlistModel.findOne({
      user: userId,
      product: productId,
    });

    if (existingWishlist) {
      throw new ConflictException('Product is already in your wishlist');
    }

    const createdWishlist = await this.wishlistModel.create({
      product: productId,
      user: userId,
    });
    return {
      message: 'Product added to wishlist',
      wishlist: createdWishlist,
    };
  }

  async getWishlist(userId: string): Promise<Wishlist[]> {
    console.log(userId);
    const wishlists = await this.wishlistModel.find().populate('product').exec();

    return wishlists;
  }

  async removeFromWishlist(
    userId: string,
    productId: string,
  ): Promise<Wishlist> {
    const wishlistItem = await this.wishlistModel.findOneAndDelete({
      user: userId,
      product: productId,
    });
    if (!wishlistItem) {
      throw new NotFoundException('Product not found in your wishlist');
    }
    return wishlistItem;
  }
}
