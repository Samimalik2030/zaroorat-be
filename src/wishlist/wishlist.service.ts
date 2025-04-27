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

  async addToWishlist(userId: string, productId: string): Promise<Wishlist> {
    const existingWishlist = await this.wishlistModel.findOne({
      user: userId,
      product: productId,
    });

    if (existingWishlist) {
      throw new ConflictException('Product is already in your wishlist');
    }

    const newWishlist = new this.wishlistModel({
      user: userId,
      product: productId,
    });

    return await newWishlist.save();
  }

  async getWishlist(userId: string): Promise<Wishlist[]> {
    const wishlists = await this.wishlistModel
      .find({ user: userId })
      .populate('product');
    if (!wishlists || wishlists.length === 0) {
      throw new NotFoundException('No wishlist items found for this user');
    }
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
