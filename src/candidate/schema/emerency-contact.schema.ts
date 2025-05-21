import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MongoSchema } from 'src/decorator/mongo-schema.decorator';


export class EmergencyContact {
  @ApiProperty({ example: 'Ahmed Khan', description: 'Name of the emergency contact person' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: 'Brother', description: 'Relation to the candidate' })
  @Prop({ required: true })
  relation: string;

  @ApiProperty({ example: '03001234567', description: 'Phone number of the emergency contact' })
  @Prop({ required: true })
  contact: string;
}



export class Contact {
  @ApiProperty({ example: 'Multan', description: 'District of the candidate' })
  @Prop({ required: true })
  district: string;

  @ApiProperty({ example: '03123456789', description: 'Phone number of the candidate' })
  @Prop({ required: true })
  phone: string;

  @ApiProperty({ type: EmergencyContact, description: 'Emergency contact details' })
  @Type(() => EmergencyContact)
  @Prop({ type: EmergencyContact })
  emergency_contact: EmergencyContact;
}


