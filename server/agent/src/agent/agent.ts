import {createAgent, ReactAgent} from 'langchain';
import {MemorySaver} from '@langchain/langgraph';
import {ChatOpenRouter} from '@langchain/openrouter';
import {type BaseChatModel} from '@langchain/core/language_models/chat_models';
import {jsExecutor, weatherTool} from './tools';


export const configureAgent = (): ReactAgent => {
  const llm = new ChatOpenRouter({
    model: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
    apiKey: process.env.OPEN_ROUTER_API_KEY
  });

  const memory = new MemorySaver();

  return createAgent({
    model: llm,
    tools: [weatherTool, jsExecutor],
    checkpointer: memory
  });
};

export class Agent {
  private readonly llm: BaseChatModel;
  private readonly _agent: ReactAgent;
  private readonly memory: MemorySaver;

  public constructor() {
    this.llm = new ChatOpenRouter({
      model: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
      apiKey: process.env.OPEN_ROUTER_API_KEY
    });

    this.memory = new MemorySaver();

    this._agent = createAgent({
      model: this.llm,
      tools: [weatherTool],
      checkpointer: this.memory
    });
  }

  public async invoke() {
    const response = await this.agent.invoke({
      messages: [{
        role: 'human',
        content: 'Hello, how can you help me ?'
      }]
    });

    console.log(response.messages.at(-1)?.content);
  }
}