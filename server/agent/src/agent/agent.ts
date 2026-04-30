import {MemorySaver} from '@langchain/langgraph';
import {ChatOpenRouter} from '@langchain/openrouter';
import {jsExecutor, weatherTool} from './tools.js';
import {createAgent, type ReactAgent} from 'langchain';


export const configureAgent = (): ReactAgent => {
  const llm = new ChatOpenRouter({
    model: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
    apiKey: process.env.OPEN_ROUTER_API_KEY!
  });

  const memory = new MemorySaver();

  return createAgent({
    model: llm,
    tools: [weatherTool, jsExecutor],
    checkpointer: memory
  });
};