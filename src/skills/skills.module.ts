import { Module } from '@nestjs/common';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
import { Skill, SkillSchema } from './skills.mongo';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Skill.name, schema: SkillSchema }]),
  ],
  controllers: [SkillsController],
  providers: [SkillsService]
})
export class SkillsModule {}
