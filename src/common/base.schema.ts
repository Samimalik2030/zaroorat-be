import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Schema } from 'mongoose';

export abstract class BaseSchema {
  @Exclude()
  etype: string;

  @Exclude()
  _id: Schema.Types.ObjectId;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @Exclude()
  deletedAt: Date;

  @Exclude()
  protected __v: number;

  toObject: () => this;

  @ApiProperty()
  id: string;
}
