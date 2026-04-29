import Fastify, { type FastifyInstance} from 'fastify';
import cors from '@fastify/cors';
import {Agent, configureAgent} from './agent/agent';
import {type ReactAgent} from 'langchain';
import * as repl from "node:repl";

const port = Number(process.env.PORT || 3002);


class Server {
  private readonly fastify: FastifyInstance;
  private readonly agent: ReactAgent;

  public constructor() {
    this.fastify = this.configureFastify();
    this.agent = configureAgent();
  }

  public async run() {
    try {
      await this.fastify.listen({ port });
      console.log('Server is running');
    } catch (err) {
      this.fastify.log.error(err);
      process.exit(1);
    }
  }

  private configureFastify(): FastifyInstance {
    const fastify = Fastify({ logger: true });
    fastify.register(cors, { origin: '*' });

    fastify.post('/generate', async (request, reply) => {
      const { prompt, thread_id } = request.body;
      
      const result = await this.agent.invoke({
        messages: [{
          role: 'user',
          content: 'What\'s the weather in Tokyo ?'
        }]
      }, { configurable: { thread_id: 42 }});

      return result.messages.at(-1)?.content;
    });

    return fastify;
  }
}

await new Server().run();
