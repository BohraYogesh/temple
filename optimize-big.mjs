import sharp from "sharp";
import fs from "fs";
import path from "path";

const DIR = "public/images";
const BACKUP = "images-backup";
fs.mkdirSync(BACKUP, { recursive: true });

// [file, max width, quality]
const JOBS = [
  ["plant.webp", 1000, 60],
  ["bg2.webp", 900, 70],
  ["temple2.webp", 900, 70],
  ["bg.webp", 900, 70],
  ["frame-1.webp", 900, 68],
];

for (const [file, width, quality] of JOBS) {
  const cur = path.join(DIR, file);
  const bak = path.join(BACKUP, file);
  if (!fs.existsSync(bak)) fs.copyFileSync(cur, bak); // original safe rahega
  const input = fs.readFileSync(bak);
  const buf = await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toBuffer();
  fs.writeFileSync(cur, buf);
  console.log(`${file}: ${(input.length / 1024) | 0} KB -> ${(buf.length / 1024) | 0} KB`);
}