import { HelloResolver } from './hello.resolver';
import { HelloService } from './hello.service';

describe('HelloResolver', () => {
  it('delegates to the hello service', () => {
    const payload = { message: 'Hola' };
    const service: HelloService = {
      getHello: jest.fn().mockReturnValue(payload),
    } as unknown as HelloService;
    const resolver = new HelloResolver(service);

    const result = resolver.sayHello();

    expect(service.getHello).toHaveBeenCalledTimes(1);
    expect(result).toBe(payload);
  });
});
