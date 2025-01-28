import { ApiProperty } from "@nestjs/swagger";

export class createProjectDto{
    @ApiProperty({ description: 'Name of the project' })
    name: string;

    @ApiProperty({
        description: 'Images of the project',
        type: 'array',
        items: {
          type: 'string',
          format: 'binary',
        },
        isArray:true
      })
    images: string[];

    @ApiProperty({ description: 'Description of the project' })
    description: string;

    @ApiProperty({ description: 'Technologies used in the project', type: [String] })
    stacks: string[];

    @ApiProperty({ description: 'Live URL of the project' })
    liveUrl: string;

    @ApiProperty({ description: 'Repository URL of the project' })
    repoUrl: string;

    @ApiProperty({ description: 'Status of the project', default: 'In Progress' })
    status: string;

    @ApiProperty({ description: 'Key features of the project', type: [String] })
    features: string[];

    @ApiProperty({ description: 'Start date of the project' })
    startDate: Date;

    @ApiProperty({ description: 'End date of the project' })
    endDate: Date;
}


export class UpdateProjectDto{
    @ApiProperty({ description: 'Name of the project' })
    name: string;
    @ApiProperty({
        description: 'Images of the project',
        type: 'array',
        items: {
          type: 'string',
          format: 'binary',
        },
        isArray:true
      })
    images: string[];

    @ApiProperty({ description: 'Description of the project' })
    description: string;

    @ApiProperty({ description: 'Technologies used in the project', type: [String] })
    stacks: string[];

    @ApiProperty({ description: 'Live URL of the project' })
    liveUrl: string;

    @ApiProperty({ description: 'Repository URL of the project' })
    repoUrl: string;

    @ApiProperty({ description: 'Status of the project', default: 'In Progress' })
    status: string;

    @ApiProperty({ description: 'Key features of the project', type: [String] })
    features: string[];

    @ApiProperty({ description: 'Start date of the project' })
    startDate: Date;

    @ApiProperty({ description: 'End date of the project' })
    endDate: Date;
}