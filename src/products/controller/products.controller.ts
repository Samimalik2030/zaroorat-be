
import { Controller, Get, Post, Body, Param, Put, Delete, Query, UploadedFile, UseInterceptors, Patch } from '@nestjs/common';

import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ProductService } from '../service/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../schema/product.mongo';
import { UpdateProductDto } from '../dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';


@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Product successfully created' })
 async create(
    @Body() body: CreateProductDto,
  ): Promise<any> {

    console.log(body.price)
    const product = await this.productService.create(body);
    console.log(product,'in controller')
    return product
  }


  @Get()
  @ApiOperation({ summary: 'Get all products with optional filters' })
  @ApiResponse({ status: 200, description: 'List of products', type: [Product] })
  findAll(
    @Query('finish') finish?: string,
    @Query('origin') origin?: string,
    @Query('price') price?: string,
    @Query('category') category?: string,
    @Query('limit') limit?: string  // Added limit as a query parameter
  ): Promise<Product[]> {
    return this.productService.findAll({ finish, origin, price, category,limit });
  }

 
  @Get(':id')
  @ApiOperation({ summary: 'Get a single product by ID' })
  @ApiResponse({ status: 200, description: 'Product found', type: Product })
  @ApiResponse({ status: 404, description: 'Product not found' })
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

 
  @Patch(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiResponse({ status: 200, description: 'Product successfully updated', type: Product })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiResponse({ status: 200, description: 'Product successfully deleted' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  remove(@Param('id') id: string): Promise<Product> {
    return this.productService.remove(id);
  }

 
  @Get('category/:category')
  @ApiOperation({ summary: 'Get products by category' })
  @ApiResponse({ status: 200, description: 'List of products by category', type: [Product] })
  @ApiResponse({ status: 404, description: 'No products found in this category' })
  findByCategory(@Param('category') category: string): Promise<Product[]> {
    return this.productService.findByCategory(category);
  }


  @Get('tags')
  @ApiOperation({ summary: 'Get products by tags' })
  @ApiResponse({ status: 200, description: 'List of products by tags', type: [Product] })
  @ApiResponse({ status: 404, description: 'No products found with these tags' })
  findByTags(@Query('tags') tags: string[]): Promise<Product[]> {
    return this.productService.findByTags(tags);
  }

  
}
