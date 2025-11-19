import { HelloService } from './hello.service';

describe('HelloService', () => {
  it('returns the expected greeting payload', () => {
    const service = new HelloService();

    const result = service.getHello();

    expect(result).toEqual({
      message: 'Hello World desde NestJS con GraphQL 🚀',
    });
  });
});
