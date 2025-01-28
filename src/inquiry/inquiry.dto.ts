import { ApiProperty } from "@nestjs/swagger";

export class CreateInquiryDto {
@ApiProperty()
name: string;

@ApiProperty()
 email: string;
 
 @ApiProperty()
message: string;
}


export class UpdateInquiryDto {
     @ApiProperty()
    message: string;
    }