import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class CreateReviewDto {
    @ApiProperty({ description: 'Name of the User' })
    name: string;

    @ApiProperty({ description: 'Your email' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Comment' })
    comment: string;
}


export class UpdateReviewDto {
    @ApiProperty({ description: 'Name of the User' })
    name: string;

    @ApiProperty({ description: 'Your email' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Comment' })
    comment: string;
}