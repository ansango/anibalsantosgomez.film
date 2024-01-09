import fs from "fs";
import path from "path";

import sharp from "sharp";

const createFolder = (folderName, options) => {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName, options);
  }
};

const imageExtensions = [".jpg", ".jpeg", ".png", ".gif"];

function getImagesFromFolder(folderPath) {
  let images = [];
  fs.readdirSync(folderPath).forEach((file) => {
    const filePath = path.join(folderPath, file);
    const fileStat = fs.statSync(filePath);
    if (fileStat.isDirectory()) {
      images = images.concat(getImagesFromFolder(filePath));
    } else if (imageExtensions.includes(path.extname(filePath).toLowerCase())) {
      images.push(filePath);
    }
  });
  return images;
}

async function resize(
  inputPath,
  outputPath,
  format = "webp",
  quality = 85,
  effort = 6,
  widthResize = 1920,
  heightResize = 1280
) {
  console.log("Starting image resizing");
  console.log("Input path:", inputPath);
  createFolder(inputPath);
  console.log("Output path:", outputPath);
  const outputDirPath = path.resolve(outputPath);

  if (fs.existsSync(outputDirPath)) {
    fs.rmSync(outputDirPath, { recursive: true });
  }

  console.log("Creating output folders");
  console.log("Output path:", outputPath);
  createFolder(outputPath, { recursive: true });
  console.log("Resizing images");
  const images = getImagesFromFolder(inputPath);
  console.log("Found", images.length, "images");

  const sizes = [
    {
      type: "1x",
      width: 480,
      height: 320,
    },
    {
      type: "2x",
      width: 640,
      height: 427,
    },
    {
      type: "3x",
      width: 960,
      height: 640,
    },
    {
      type: "4x",
      width: 1280,
      height: 853,
    },
  ];
  for (const imagePath of images) {
    console.log("Resizing", imagePath);
    const subFolderPath = path.dirname(path.relative(inputPath, imagePath));
    const outputFolder = path.join(outputPath, subFolderPath);

    fs.mkdirSync(outputFolder, { recursive: true });

    const image = sharp(imagePath);
    const outputExt = format === "webp" ? ".webp" : ".jpg";
    const metadata = await image.metadata();
    const { width, height } = metadata;
    const isLandscape = width > height;
    const isPortrait = width < height;

    if (isLandscape) {
      await image
        .webp({ quality, effort })
        .resize({ width: widthResize, height: heightResize, fit: "cover" })
        .toFile(
          path.join(outputFolder, path.basename(imagePath, path.extname(imagePath)) + outputExt)
        );
      sizes.forEach(async ({ height, width, type }) => {
        const folder = path.join(outputFolder, type);
        createFolder(folder, { recursive: true });
        const file = path.join(
          folder,
          path.basename(imagePath, path.extname(imagePath)) + outputExt
        );

        await image.webp({ quality, effort }).resize({ width, height, fit: "cover" }).toFile(file);
      });
    } else if (isPortrait) {
      await image
        .webp({ quality, effort })
        .resize({ width: heightResize, height: widthResize, fit: "cover" })
        .toFile(
          path.join(outputFolder, path.basename(imagePath, path.extname(imagePath)) + outputExt)
        );
      sizes.forEach(async ({ height, width, type }) => {
        const folder = path.join(outputFolder, type);
        createFolder(folder, { recursive: true });
        const file = path.join(
          folder,
          path.basename(imagePath, path.extname(imagePath)) + outputExt
        );
        await image
          .webp({ quality, effort })
          .resize({ width: height, height: width, fit: "cover" })
          .toFile(file);
      });
    } else {
      await image
        .webp({ quality, effort })
        .resize({ width: widthResize, height: widthResize, fit: "cover" })
        .toFile(
          path.join(outputFolder, path.basename(imagePath, path.extname(imagePath)) + outputExt)
        );
      sizes.forEach(async ({ type, width }) => {
        const folder = path.join(outputFolder, type);
        createFolder(folder, { recursive: true });
        const file = path.join(
          folder,
          path.basename(imagePath, path.extname(imagePath)) + outputExt
        );
        await image
          .webp({ quality, effort })
          .resize({ width, height: width, fit: "cover" })
          .toFile(file);
      });
    }
    console.log("Resized", imagePath);
  }
  console.log("Finished image resizing");
  console.log("Output path:", outputPath);
  console.log("Total images:", images.length);
}

const inputPath = process.cwd() + "/.images";
const outputPath = process.cwd() + "/.images___output";

resize(inputPath, outputPath, "webp", 100, 6, 1536, 1152);
