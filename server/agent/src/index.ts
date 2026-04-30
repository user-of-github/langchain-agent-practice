import Fastify, { type FastifyInstance} from 'fastify';
import cors from '@fastify/cors';
import {configureAgent} from './agent/agent.js';
import {type ReactAgent} from 'langchain';
import * as repl from 'node:repl';
import type {GenerateBody} from './types.js';

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

    fastify.post<{ Body: GenerateBody }>('/generate', async (request, reply) => {
      const { prompt, thread_id } = request.body;

      const result = await this.agent.invoke({
        messages: [{
          role: 'user',
          content: prompt
        }]
      }, { configurable: { thread_id: thread_id ? thread_id : undefined }});

      return result.messages.at(-1)?.content;
    });

    return fastify;
  }
}

await new Server().run();
