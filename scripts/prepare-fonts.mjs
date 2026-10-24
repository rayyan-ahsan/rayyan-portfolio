import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";

const fonts = {
  "FOT-RodinBokutoh Pro B.otf": "dc007b3fb233d40c4dfb754cc691b0b86c19b0dd27b596b2386b9cac58134ce7",
  "FOT-RodinBokutoh Pro L.otf": "123f68736ab1a9f9a661526ef10d4e7e6cc32f130eb93565fb2caa6a41bd9e19",
  "FOT-RodinBokutoh Pro M.otf": "dc11afa8da325524020f5a4d3967422b391d2ac781a4493670b23aeea10b5844",
  "FOT-RodinBokutoh Pro UB.otf": "1ef74e7689aaa5511023b850accb84ce1fbc2be41817647632d44f189c41eec0",
  "FOT-Seurat Pro B.otf": "19e5370dfb141710217e9fc06755f615e827e3f463f33d20aa276ee78c86bfd1",
  "FOT-Seurat Pro EB.otf": "888f55b62dc9b7825faf02138a887ef0ed3dbfce76e58ddcadd2859f37901078",
  "FOT-Seurat Pro L.otf": "5b50768465494f657d1e05db4005190f52626e9620493be883bfe21934e10acb",
  "FOT-Seurat Pro M.otf": "fdb0b6ec42959cc69a36eef2df36afc9b716860f429196e1fec32d2756545fb2",
};

const directory = new URL("../assets/fonts/", import.meta.url);
const hash = (data) => createHash("sha256").update(data).digest("hex");
await mkdir(directory, { recursive: true });

for (const [name, expectedHash] of Object.entries(fonts)) {
  const destination = new URL(encodeURIComponent(name), directory);
  try {
    if (hash(await readFile(destination)) === expectedHash) continue;
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  const base = process.env.FONT_BASE_URL;
  if (!base) {
    throw new Error(`Missing ${name}. Supply the local fonts or set FONT_BASE_URL to the hosted fonts directory.`);
  }
  const url = new URL(encodeURIComponent(name), base.endsWith("/") ? base : `${base}/`);
  if (url.protocol !== "https:") throw new Error("FONT_BASE_URL must use HTTPS.");
  const response = await fetch(url, { signal: AbortSignal.timeout(60_000) });
  if (!response.ok) throw new Error(`Font download failed (${response.status}): ${name}`);
  const data = Buffer.from(await response.arrayBuffer());
  if (hash(data) !== expectedHash) throw new Error(`Font checksum mismatch: ${name}`);
  await writeFile(destination, data);
  console.log(`Prepared ${name}`);
}
