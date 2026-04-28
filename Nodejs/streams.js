const { writeFileSync, createReadStream } = require("fs");

for (let i = 0; i < 5000; i++) {
  writeFileSync("./big.txt", `hello world ${i}\n`, { flag: "a" });
}

const stream = createReadStream("./big.txt");
stream.on("data", (data) => {
  console.log(data);
});
