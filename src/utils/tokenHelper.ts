import crypto from "crypto";

async function generatedToken(
  size: number,
  options?: { encoding?: BufferEncoding; take?: number }
): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(size, (err, buffer) => {
      if (err) {
        return reject(err);
      }
      const token = buffer.toString(options?.encoding ?? "hex");
      if (options?.take) {
        return resolve(token.substring(0, options?.take));
      }
      resolve(token);
    });
  });
}

export default { generatedToken };
