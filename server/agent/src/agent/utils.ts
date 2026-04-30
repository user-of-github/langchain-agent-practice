import vm from 'node:vm';

export const evalWithCapturingOutput = async (code: string): Promise<{ stdout: string; stderr: string }> => {
  const logs: string[] = [];
  const errors: string[] = [];


  const sandbox = {
    console: {
      log: (...args: unknown[]) => logs.push(args.map(String).join(' ')),
      error: (...args: unknown[]) => errors.push(args.map(String).join(' ')),
      warn: (...args: unknown[]) => errors.push(args.map(String).join(' '))
    },
    Promise
  };

  vm.createContext(sandbox);

  const wrappedCode = `(async () => { ${code} })()`;

  try {
    const script = new vm.Script(wrappedCode, { filename: 'user-code.js' });

    const result = await script.runInContext(sandbox);

    if (result !== undefined) {
      logs.push(String(result));
    }
  } catch (error) {
    if (error instanceof Error) {
      errors.push(error.message);
    } else {
      errors.push(String(error));
    }
  }

  return {
    stdout: logs.join('\n'),
    stderr: errors.join('\n')
  };
};