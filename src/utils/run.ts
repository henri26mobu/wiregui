import child from "child_process";

interface ExecResponse {
  stdout?: string | Buffer;
  stderr?: string | Buffer;
}

class ExecError extends Error {
  constructor(
    public error: Error,
    public stdout?: string | Buffer,
    public stderr?: string | Buffer
  ) {
    super(error.message);
  }
}

export async function run(command: string, sudoPrompt = true) {
  return new Promise<ExecResponse>((resolve, reject) => {
    const finalCommand = sudoPrompt ? `pkexec ${command}` : command;
    child.exec(
      finalCommand,
      function (
        error: child.ExecException | null,
        stdout: string,
        stderr: string
      ) {
        if (!error) {
          resolve({ stdout, stderr });
        } else {
          reject(new ExecError(error, stdout, stderr));
        }
      }
    );
  });
}
