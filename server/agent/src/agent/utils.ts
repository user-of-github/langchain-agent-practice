export const evalWithCapturingOutput = async (code: string): Promise<{ stdout: string; stderr: string; }> => {
  const oldLog = console.log;
  const oldErr = console.error;

  const logs: string[] = [];
  const errors: string[] = [];

  console.log(code)

  console.log = (...args: string[])=> logs.push(args.join(' '));
  console.error = (...args: string[])=> errors.push(args.join(' '));



  try {
    const result = await eval(code);
    logs.push(String(result));
  } catch (error) {
    if (error instanceof Error) {
      errors.push(error.message);
    }
  }

  console.log = oldLog;
  console.error = oldErr;

  return {
    stdout: logs.join('\n'),
    stderr: errors.join('\n')
  };
};