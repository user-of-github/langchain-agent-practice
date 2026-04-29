import {tool} from 'langchain';
import z from 'zod';


export const weatherTool = tool(async () => {
  return Promise.resolve('the weather in Tokyo is sunny');
}, {
  name: 'weatherTool',
  description: 'Get weather in given location',
  schema: z.object({
    query: z.string().describe('The query to use in search')
  })
});