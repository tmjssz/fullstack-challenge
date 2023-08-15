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

const mockProjects: Project[] = [
  {
    co2EstimateReduction: [1, 2],
    createdAt: 'now',
    deletedAt: null,
    description: 'First mocked project',
    id: 1,
    isActive: true,
    listing: ['foo', 'bar'],
    name: 'Mock 1',
    owner: 'me',
    updatedAt: 'now',
  },
];

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let service: ProjectsService;

  beforeEach(() => {});
  beforeEach(async () => {
    jest.resetAllMocks();

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
    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('/search', () => {
    const mockQuery = 'mockQuery';

    it('should return project items returned by the service', async () => {
      jest.spyOn(service, 'findBy').mockResolvedValueOnce(mockProjects);

      expect(await controller.findBy({ q: mockQuery })).toBe(mockProjects);
      expect(service.findBy).toHaveBeenCalledTimes(1);
      expect(service.findBy).toHaveBeenCalledWith(mockQuery);
    });
  });
});
