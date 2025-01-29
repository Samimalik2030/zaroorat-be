import { ApiProperty } from "@nestjs/swagger";

export class CreateSkillDto {
    @ApiProperty({ description: 'Name of the Skill' })
    name: string;

    @ApiProperty({ description: 'Skill Description' })
    description: string;

    @ApiProperty({ description: 'Skill Level' })
    level: string;

    @ApiProperty({ description: 'Skill Category' })
    category: string;
}


export class UpdateSkillDto {
    @ApiProperty({ description: 'Name of the Skill' })
    name: string;

    @ApiProperty({ description: 'Skill Description' })
    description: string;

    @ApiProperty({ description: 'Skill Level' })
    level: string;

    @ApiProperty({ description: 'Skill Category' })
    category: string;
}