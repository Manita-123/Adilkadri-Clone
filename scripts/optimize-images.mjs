
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const inputDir = "src/user/assets/img";
const outputDir = "src/user/assets/img-avif";

await fs.mkdir(outputDir, { recursive: true });

const supported = /\.(jpe?g|png|webp|tiff?)$/i;

async function getImages(dir) {
  const entries = await fs.readdir(dir, {
    withFileTypes: true,
  });

  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...await getImages(fullPath));
    } else if (supported.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

const images = await getImages(inputDir);

for (const file of images) {
  const relativePath = path.relative(inputDir, file);
  const outputPath = path.join(
    outputDir,
    relativePath.replace(/\.(jpe?g|png|webp|tiff?)$/i, ".avif")
  );

  await fs.mkdir(path.dirname(outputPath), {
    recursive: true,
  });

  try {
    await sharp(file)
      .rotate()
      .resize({
        width: 1200,
        height: 1200,
        fit: "inside",
        withoutEnlargement: true,
      })
      .avif({ quality: 55 })
      .toFile(outputPath);

    console.log(`Converted: ${relativePath}`);
  } catch (error) {
    console.error(`Failed: ${relativePath}`, error.message);
  }
}

console.log(`Finished processing ${images.length} images.`);
