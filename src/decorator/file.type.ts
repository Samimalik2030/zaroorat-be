import { ApiProperty } from "@nestjs/swagger";

export class FileDto{
    @ApiProperty({ description: 'Id of the file' })
    id: string;

    @ApiProperty({ description: 'url of the file' })
    url: string;
}