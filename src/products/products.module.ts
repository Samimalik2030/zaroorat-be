import { Module } from '@nestjs/common';


import { ProductService } from './service/products.service';
import { ProductController } from './controller/products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schema/product.mongo';
import { ImageKitModule } from 'src/image-kit/image-kit.module';


@Module({
  imports:[
    MongooseModule.forFeature([{name:Product.name,schema:ProductSchema}]),
    ImageKitModule
  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports:[ProductService]
})
export class ProductsModule {}
