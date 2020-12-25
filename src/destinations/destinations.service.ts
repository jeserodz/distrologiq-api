import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Destination } from './destinations.entity';
import { Repository } from 'typeorm';
import { CreateDestinationDTO, UpdateDestinationDTO } from './destinations.dto';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectRepository(Destination)
    private destinationsRepository: Repository<Destination>,
  ) {}

  async getAll() {
    return this.destinationsRepository.find({});
  }

  async getOne(id: number) {
    return this.destinationsRepository.findOne({ where: { id } });
  }

  async create(data: CreateDestinationDTO) {
    const destination = new Destination();
    Object.assign(destination, data);
    return this.destinationsRepository.save(destination);
  }

  async update(id: number, data: UpdateDestinationDTO) {
    const destination = await Destination.findOne({ where: { id } });
    Object.assign(destination, data);
    return this.destinationsRepository.save(destination);
  }

  async remove(id: number) {
    try {
      await this.destinationsRepository.delete(id);
    } catch (error) {
      const msg =
        'No se pudo eliminar este destino. ' +
        'Puede que esté siendo utilizado por la aplicación.';
      throw new UnprocessableEntityException(msg);
    }
  }

  /**
   * Returns the destination instance that represents
   * the application owner company.
   */
  async getOwnCompany() {
    return this.destinationsRepository.findOne({
      where: { isOwnCompany: true },
    });
  }
}
