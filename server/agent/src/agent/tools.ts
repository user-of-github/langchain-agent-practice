import {tool} from 'langchain';
import z from 'zod';
import {evalWithCapturingOutput} from './utils';


export const weatherTool = tool(async () => {
  return Promise.resolve('the weather in Tokyo is sunny');
}, {
  name: 'weatherTool',
  description: 'Get weather in given location',
  schema: z.object({
    query: z.string().describe('The query to use in search')
  })
});

export const jsExecutor = tool(
  async ({ code }) => {
    return await evalWithCapturingOutput(code);
  },
  {
    name: 'run_javascript_code_tool',
    description: `
      Run general purpose javascript code. 
      This can be used to access Internet or do any computation that you need. 
      The output will be composed of the stdout and stderr. 
      The code should be written in a way that it can be executed with javascript eval in node environment.
    `,
    schema: z.object({
      code: z.string().describe('code to be executed')
    })
  }
);