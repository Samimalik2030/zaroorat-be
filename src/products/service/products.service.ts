import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from '../schema/product.mongo';
import { CalculatorDto, CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ImageKitService } from 'src/image-kit/image-kit.service';
import { CalculateAmountDto } from '../dto/CalculateAmountDto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly imageKitService: ImageKitService,
  ) {}

  async create(data: CreateProductDto): Promise<Product> {
    console.log(data, 'product');
    const product = await this.productModel.create({
      ...data,
      dimensions: {
        length: data.length,
        width: data.width,
      },
    });
    console.log(product);
    return product;
  }

  async find() {
    return await this.productModel.find();
  }

  async findAll(filters: {
    finish?: string;
    origin?: string;
    price?: string;
    category?: string;
    limit?: string;
  }): Promise<Product[]> {
    const { finish, price, category, limit } = filters;

    const query: any = {};

    if (finish) {
      query.finish = finish;
    }

    if (price) {
      query.price = { $lte: parseFloat(price) };
    }
    if (category) {
      query.category = category;
    }

    const maxLimit = limit ? parseInt(limit, 10) : 10;

    return this.productModel.find(query).limit(maxLimit).exec();
  }

  async findOne(id: string): Promise<Product> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid product ID');
    }

    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(id: string, data: UpdateProductDto): Promise<Product> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid product ID');
    }

    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      {
        ...data,
        dimensions: {
          length: data.length,
          width: data.width,
        },
      },
      { returnDocument: 'after' },
    );

    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }

    return updatedProduct;
  }

  async remove(id: string): Promise<any> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid product ID');
    }

    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
    if (!deletedProduct) {
      throw new NotFoundException('Product not found');
    }

    return {
      message: 'Product deleted sucessfully',
    };
  }

  async findByCategory(category: string): Promise<Product[]> {
    const products = await this.productModel.find({ category }).exec();
    if (!products.length) {
      throw new NotFoundException('No products found in this category');
    }
    return products;
  }

  async findByTags(tags: string[]): Promise<Product[]> {
    const products = await this.productModel
      .find({ tags: { $in: tags } })
      .exec();
    if (!products.length) {
      throw new NotFoundException('No products found with the specified tags');
    }
    return products;
  }

  async findBySupplier(supplier: string): Promise<Product[]> {
    const products = await this.productModel.find({ supplier }).exec();
    if (!products.length) {
      throw new NotFoundException('No products found for this supplier');
    }
    return products;
  }

  async findByIds(ids: string[]): Promise<Product[]> {
    // Ensure the array of ids contains valid ObjectIds
    const objectIds = ids.map((id) => {
      if (!Types.ObjectId.isValid(id)) {
        throw new NotFoundException(`Invalid product ID: ${id}`);
      }
      return new Types.ObjectId(id);
    });

    // Query to fetch products by their IDs
    const products = await this.productModel
      .find({ _id: { $in: objectIds } })
      .exec();

    if (!products.length) {
      throw new NotFoundException('No products found with the given IDs');
    }

    return products;
  }

  async calculteAmount(data: CalculateAmountDto) {
    const product = await this.productModel.findById(data.productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const amountOfProduct = product.price;
    const finalAmount = amountOfProduct * data.count;
    return finalAmount;
  }

  async getEstimateCost(data: CalculatorDto) {
    const product = await this.productModel.findById(data.id);

    if (!product) {
      throw new Error('Product not found');
    }

    const { length: productLength, width: productWidth } = product.dimensions;

    const areaOfSingleProduct = productLength * productWidth;
    const roomLengthInInches = data.length * 12;
    const roomWidthInInches = data.width * 12;
    const coveredArea = roomLengthInInches * roomWidthInInches;
    const estimatedProducts = Math.ceil(coveredArea / areaOfSingleProduct);
    console.log(estimatedProducts, 'estimated products');
    console.log(product.price, ' products price');

    const estimatedPrice = estimatedProducts * product.price;

    return {
      estimatedPrice,
      estimatedProducts,
      area: coveredArea,
      productArea: areaOfSingleProduct,
      products: estimatedProducts,
    };
  }
}
