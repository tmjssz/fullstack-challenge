import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';

const mockProjectsRepository = {
  save: jest.fn(),
  find: jest.fn(),
  findBy: jest.fn(),
  findOneBy: jest.fn(),
  softDelete: jest.fn(),
  delete: jest.fn(),
  restore: jest.fn(),
};

const mockProjects: Project[] = [
  {
    co2EstimateReduction: [1, 2],
    createdAt: "now",
    deletedAt: null,
    description: "First mocked project",
    id: 1,
    isActive: true,
    listing: ["foo", "bar"],
    name: "Mock 1",
    owner: "me",
    updatedAt: "now"
  }
]

describe('ProjectsService', () => {
  let service: ProjectsService;

  beforeEach(async () => {
    jest.resetAllMocks()
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: getRepositoryToken(Project),
          useValue: mockProjectsRepository,
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findBy', () => {
    const query = "mockQuery"

    it('should return project items returned by the repository', async () => {
      mockProjectsRepository.findBy.mockResolvedValueOnce(mockProjects)
      expect(await service.findBy(query)).toEqual(mockProjects);
      expect(mockProjectsRepository.findBy).toHaveBeenCalledTimes(1)
    });

    it('should throw if the repository function throws', async () => {
      mockProjectsRepository.findBy.mockRejectedValueOnce(new Error(":("))
      await expect(service.findBy(query)).rejects.toThrow();
      expect(mockProjectsRepository.findBy).toHaveBeenCalledTimes(1)
    });
  });
});
