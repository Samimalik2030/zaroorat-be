import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { MongoSchema } from 'src/decorator/mongo-schema.decorator';

export class Address {
  @ApiProperty({ example: 'House 123, Street 4, Lahore', description: 'Permanent residential address' })
  @Prop({ required: true })
  permanent: string;

  @ApiProperty({ example: 'Hostel Block B, Punjab University', description: 'Current living address' })
  @Prop({ required: true })
  present: string;
}

