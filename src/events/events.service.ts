import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { manageError } from 'src/common/errors/custom/manage.error';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const dataEvent = this.eventRepository.create(createEventDto);
    await this.eventRepository.save(dataEvent);
    return dataEvent;
  }

  async findAll() {
    try {
      const events = await this.eventRepository.find();
      if (events.length == 0) {
        throw new manageError({
          type: 'NOT_FOUND',
          message: 'DOES THERE ARE NOT REGISTERS YET',
        });
      }
      return events;
    } catch (err: any) {
      throw manageError.signedError(err.message);
    }
  }

  async findOne(id: number) {
    try {
      const event = await this.eventRepository.findOneBy({ id: id });
      if (!event) {
        throw new manageError({
          type: 'NOT_FOUND',
          message: 'DOES THERE ARE NOT REGISTERS YET',
        });
      }
      return event;
    } catch (err: any) {
      throw manageError.signedError(err.message);
    }
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    try {
      const { affected } = await this.eventRepository.update(
        id,
        updateEventDto,
      );
      if (affected == 0) {
        throw new manageError({
          type: 'NOT_FOUND',
          message: 'FAILED TO UPDATED',
        });
      }
      return 'PERFECT UPDATE';
    } catch (err: any) {
      throw manageError.signedError(err.message);
    }
  }

  async remove(id: number) {
    try {
      const { affected } = await this.eventRepository.delete(id);
      if (affected == 0) {
        throw new manageError({
          type: 'NOT_FOUND',
          message: 'FAILED TO DELETE',
        });
      }
      return 'PERFECT delete';
    } catch (err: any) {
      throw manageError.signedError(err.message);
    }
  }
}
