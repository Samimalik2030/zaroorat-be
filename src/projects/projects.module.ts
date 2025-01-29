import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './projects.mongo';
import { ImageKitModule } from 'src/image-kit/image-kit.module';

@Module({
  imports: [
     MongooseModule.forFeature([
       { name: Project.name, schema: ProjectSchema },
     ]),
     ImageKitModule
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
