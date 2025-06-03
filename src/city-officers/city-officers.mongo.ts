import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.mongo';
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';
import { MongoSchema } from 'src/decorator/mongo-schema.decorator';
import { City } from './city-officers.dto';

export type CityOfficerDocument = CityOfficer & Document;

@MongoSchema()
export class CityOfficer {
  @ApiProperty({
    description: 'Unique identifier of the user',
    type: String,
    example: '60f7a1c5e5b3a72b3c8a830f',
  })
  @Transform((obj) => obj.value.toString())
  _id: Types.ObjectId;

  @ApiProperty({ example: '03001234567', description: 'Contact phone number' })
  @Prop({ required: true, })
  phone: number;

 @ApiProperty({
    example: City.Lahore,
    description: 'District name',
    required: false,
    enum: City, 
  })
  @Prop({ enum: City, trim: true }) 
  city: City;

  @ApiProperty({
    type: () => User,
    description: 'Reference to the User who owns this',
  })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: User | MongooseSchema.Types.ObjectId;
}

export const CityOfficerSchema = SchemaFactory.createForClass(CityOfficer);
