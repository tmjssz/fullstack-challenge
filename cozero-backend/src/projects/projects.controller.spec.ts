import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { AuthService } from 'src/auth/auth.service';
import { Project } from './entities/project.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockProjectsRepository = {
  save: jest.fn(),
  find: jest.fn(),
  findBy: jest.fn(),
  findOneBy: jest.fn(),
  softDelete: jest.fn(),
  delete: jest.fn(),
  restore: jest.fn(),
};

const mockAuthService = {
  login: jest.fn(),
};

describe('ProjectsController', () => {
  let controller: ProjectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        ProjectsService,
        {
          provide: getRepositoryToken(Project),
          useValue: mockProjectsRepository,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
