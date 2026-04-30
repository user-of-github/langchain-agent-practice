import {MemorySaver} from '@langchain/langgraph';
import {ChatOpenRouter} from '@langchain/openrouter';
import {jsExecutor, weatherTool} from './tools.js';
import {createAgent, type ReactAgent} from 'langchain';


export const configureAgent = (): ReactAgent => {
  const llm = new ChatOpenRouter({
    model: 'nvidia/nemotron-3-super-120b-a12b:free',
    apiKey: process.env.OPEN_ROUTER_API_KEY!
  });

  const memory = new MemorySaver();

  return createAgent({
    model: llm,
    tools: [weatherTool, jsExecutor],
    checkpointer: memory
  });
};