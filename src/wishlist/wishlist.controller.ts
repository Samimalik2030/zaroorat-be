import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Wishlist } from './wishlist.mongo';
import { CreateCartDto } from 'src/cart/cart.dto';
import { CreateWishlistDto } from './wishlist.dto';

@ApiTags('wishlist')
@Controller('wishlists')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post('')
  @ApiResponse({
    status: 201,
    description: 'Product added to wishlist',
    type: Wishlist,
  })
  async addToWishlist(@Body() body: CreateWishlistDto): Promise<Wishlist> {
    console.log(body,'body')
    return await this.wishlistService.addToWishlist(body);
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
