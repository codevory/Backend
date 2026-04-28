const fs = require("fs");
const path = require("path");
const os = require("os");

fs.readFile("./users.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data);
});

// const message = "Hello from Nodejs █ █ █";
// fs.writeFile(
//   "./users.txt",
//   message.replaceAll("█", "box"),
//   "utf-16le",
//   (err) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log("File written Successfully 🎉");
//   },
// );

const imageExtensions = new Set([
  ".pdf",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
]);

const files = [
  "8th-class-marksheet.pdf",
  "image1.png",
  "image2.png",
  "image3.png",
  "logo.svg",
  "inspect-spending.png",
  "8th-class-marksheet.pdf",
  "12th-class-marksheet-compressed.pdf",
];

// const dirFiles = path.resolve(__dirname, "Spendora", "Git Lessons");
// const firstImg = files.find((file) =>
//   imageExtensions.has(path.extname(file).toLowerCase()),
// );
// if (firstImg) {
//   console.log("Image found at : ", path.join(dirFiles, firstImg));
// } else {
//   console.log("File not found");
// }

// const imagesMatch = files.filter((file) =>
//   imageExtensions.has(path.extname(file).toLowerCase()),
// );
// if (imagesMatch.length > 0) {
//   for (const val of imagesMatch) {
//     console.log(val);
//     console.log(path.join(dirFiles, val));
//   }
// } else {
//   console.log("No image found");
// }

console.log(os.networkInterfaces());
console.log(os.platform());
console.log(os.userInfo());
console.log(os.version());
console.log("eol : ", os.EOL);
console.log(os.availableParallelism());
console.log(os.arch());
console.log("cpus : ", os.cpus());
console.log("     ");
console.log(os.freemem());
console.log(os.type());
console.log(os.tmpdir());
console.log(os.uptime());
