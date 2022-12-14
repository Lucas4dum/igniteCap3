import { Repository } from "typeorm";
import dataSource from "../../../../database";
import { Specification } from "../../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository
{
  private repository: Repository<Specification>

  constructor() {
    this.repository = dataSource.getRepository(Specification);
  }
  
  async findByName(name: string): Promise<Specification> {
    const specification = this.repository.findOneBy({name});
    return specification;
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      description,
      name
    });

    await this.repository.save(specification);
  }
}

export { SpecificationsRepository }
