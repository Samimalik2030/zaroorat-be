import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from 'src/user/user.mongo';
import { Wishlist } from './wishlist.mongo';
import { UserService } from 'src/user/user.service';
import { CreateWishlistDto } from './wishlist.dto';
import { ProductService } from 'src/products/service/products.service';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(Wishlist.name) private wishlistModel: Model<Wishlist>,
    private readonly UserService: UserService,
    private readonly ProductService: ProductService,
  ) {}

  async addToWishlist(data: CreateWishlistDto): Promise<any> {
    const product = await this.ProductService.findOne(data.productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const user = await this.UserService.findById(data.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const existingWishlist = await this.wishlistModel.findOne({
      user: user,
      product: product,
    });

    if (existingWishlist) {
      throw new ConflictException('Product is already in your wishlist');
    }

    const createdWishlist = await this.wishlistModel.create({
      product: product,
      user: user,
    });
    return {
      message: 'Product added to wishlist',
      wishlist: createdWishlist,
    };
  }

  async getWishlist(userId: any): Promise<Wishlist[]> {
    console.log(userId, 'user id');
    const user = await this.UserService.first({
      _id: userId,
    });
    console.log(user, 'user');
    const wishlists = await this.wishlistModel
      .find({ user: user._id })
      .populate('product')
      .exec();

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
