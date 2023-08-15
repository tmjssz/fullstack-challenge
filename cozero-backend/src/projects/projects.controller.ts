import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { SearchProjectsQueryParamsDto } from './dto/search-projects.dto';
import { SkipAuth } from 'src/decorators/skipAuth.decorator';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('create')
  create(@Body() project: CreateProjectDto) {
    return this.projectsService.create(project);
  }

  @SkipAuth()
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @SkipAuth()
  @Get('removed')
  findAllRemoved() {
    return this.projectsService.findAllRemoved();
  }

  @SkipAuth()
  @Get('search')
  findBy(@Query() searchProjectsQueryParamsDto: SearchProjectsQueryParamsDto) {
    return this.projectsService.findBy(searchProjectsQueryParamsDto.q);
  }

  @SkipAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.softRemove(+id);
  }

  @Put('restore/:id')
  restore(@Param('id') id: string) {
    return this.projectsService.restore(+id);
  }
}
