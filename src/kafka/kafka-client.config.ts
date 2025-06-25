import { ClientsModuleOptions, Transport } from '@nestjs/microservices';

export const kafkaClientConfig: ClientsModuleOptions = [
  {
    name: 'USER_SEARCH_SERVICE',
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'update-user',
        brokers: ['3.232.44.31:9092'],
      },
      consumer: {
        groupId: 'update-user-group',
      },
    },
  },
];
