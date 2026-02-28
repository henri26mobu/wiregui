import child from "child_process";
import sudo from "sudo-prompt";

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
    if (sudoPrompt) {
      if (process.platform === "linux") {
        // Linux : pkexec (polkit)
        child.exec(
          `pkexec ${command}`,
          function (error, stdout, stderr) {
            if (!error) {
              resolve({ stdout, stderr });
            } else {
              reject(new ExecError(error, stdout, stderr));
            }
          }
        );
      } else if (process.platform === "darwin") {
        // macOS : osascript with quoted command to handle spaces in paths
        const fullCommand = `PATH=/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin ${command}`;
        child.exec(
          `osascript -e 'do shell script ${JSON.stringify(fullCommand)} with administrator privileges'`,
          function (error, stdout, stderr) {
            if (!error) {
              resolve({ stdout, stderr });
            } else {
              reject(new ExecError(error, stdout, stderr));
            }
          }
        );
      } else {
        // Fallback : sudo-prompt
        sudo.exec(
          command,
          { name: "wiregui" },
          function (error?: Error, stdout?: string | Buffer, stderr?: string | Buffer) {
            if (!error) {
              resolve({ stdout, stderr });
            } else {
              reject(new ExecError(error, stdout, stderr));
            }
          }
        );
      }
    } else {
      child.exec(
        command,
        function (error, stdout, stderr) {
          if (!error) {
            resolve({ stdout, stderr });
          } else {
            reject(new ExecError(error, stdout, stderr));
          }
        }
      );
    }
  });
}
