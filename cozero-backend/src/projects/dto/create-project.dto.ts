export class CreateProjectDto {
  name: string;
  description: string;
  co2EstimateReduction: number[];
  owner: string;
  listing: string[];
}
