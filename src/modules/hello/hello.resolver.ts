import { Resolver, Query } from '@nestjs/graphql';
import { HelloService } from './hello.service';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType({
  description: 'Simple demo object returned by the hello resolver.',
})
class Hello {
  @Field({ description: 'Greeting message emitted by the service.' })
  message: string;
}

@Resolver(() => Hello)
export class HelloResolver {
  constructor(private readonly helloService: HelloService) {}

  @Query(() => Hello, {
    description: 'Return a baseline greeting to verify the API is up.',
  })
  sayHello(): Hello {
    return this.helloService.getHello();
  }
}
