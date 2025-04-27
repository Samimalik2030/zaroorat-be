import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Wishlist } from './wishlist.mongo';

@ApiTags('wishlist')
@Controller('wishlists')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}


  @Post(':userId/:productId')
  @ApiOperation({ summary: 'Add a product to the user wishlist' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiParam({ name: 'productId', description: 'Product ID to add' })
  @ApiResponse({
    status: 201,
    description: 'Product added to wishlist',
    type: Wishlist,
  })
  @ApiResponse({
    status: 409,
    description: 'Product is already in the wishlist',
  })
  async addToWishlist(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ): Promise<Wishlist> {
    try {
      return await this.wishlistService.addToWishlist(userId, productId);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
      throw error;
    }
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get user wishlist' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User wishlist', type: [Wishlist] })
  async getWishlist(@Param('userId') userId: string): Promise<Wishlist[]> {
    return this.wishlistService.getWishlist(userId);
  }


  @Delete(':userId/:productId')
  @ApiOperation({ summary: 'Remove product from user wishlist' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiParam({ name: 'productId', description: 'Product ID to remove' })
  @ApiResponse({
    status: 200,
    description: 'Product removed from wishlist',
    type: Wishlist,
  })
  async removeFromWishlist(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ): Promise<Wishlist> {
    return this.wishlistService.removeFromWishlist(userId, productId);
  }
}
