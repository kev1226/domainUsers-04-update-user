import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ClientKafka } from '@nestjs/microservices';
import { of } from 'rxjs';
import { KafkaTopics } from '../kafka/kafka-topics.enum';
import { KafkaServices } from '../kafka/kafka-constants';

describe('UsersService', () => {
  let service: UsersService;
  const mockRepo = { update: jest.fn() };

  const mockKafka: Partial<ClientKafka> = {
    send: jest.fn().mockImplementation((topic, payload) => {
      if (topic === KafkaTopics.GET_USER_BY_ID) {
        return of({ id: 1, email: 'old@example.com' });
      }
      if (topic === KafkaTopics.GET_USER_BY_EMAIL) {
        return of(null);
      }
      return of(null);
    }),
    subscribeToResponseOf: jest.fn(),
    connect: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockRepo },
        { provide: KafkaServices.USER_SEARCH_SERVICE, useValue: mockKafka },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('debe actualizar el usuario correctamente', async () => {
    const dto = { email: 'new@example.com', password: '123456' };
    mockRepo.update.mockResolvedValue(undefined);

    const result = await service.update(1, dto);

    expect(result).toEqual({ message: 'User updated successfully' });
    expect(mockRepo.update).toHaveBeenCalledWith(1, expect.any(Object));
  });
});
