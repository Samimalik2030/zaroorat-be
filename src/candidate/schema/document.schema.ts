import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { FileDto } from 'src/decorator/file.type';
import { MongoSchema } from 'src/decorator/mongo-schema.decorator';


export class Documents {
  @ApiProperty({ type: FileDto })
  @Type(() => FileDto)
  @Prop({ type: Object })
  cnic: FileDto;

  @ApiProperty({ type: FileDto })
  @Type(() => FileDto)
  @Prop({ type: Object })
  matric_certificate: FileDto;

  @ApiProperty({ type: FileDto })
  @Type(() => FileDto)
  @Prop({ type: Object })
  inter_certificate: FileDto;

  @ApiProperty({ type: FileDto })
  @Type(() => FileDto)
  @Prop({ type: Object })
  domicile: FileDto;

  @ApiProperty({ type: FileDto })
  @Type(() => FileDto)
  @Prop({ type: Object })
  character_certificate: FileDto;

  @ApiProperty({ type: FileDto })
  @Type(() => FileDto)
  @Prop({ type: Object })
  medical_certificate: FileDto;

  @ApiProperty({ type: FileDto })
  @Type(() => FileDto)
  @Prop({ type: Object })
  photo: FileDto;
}

