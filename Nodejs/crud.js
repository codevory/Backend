const http = require("http");
const fs = require("fs");

let likesCount = 0;

// const server = http.createServer((req, res) => {
//   if (req.method === "POST") {
//     let message = "";

//     req.on("data", (chunk) => {
//       message += chunk;
//     });

//     req.on("end", () => {
//       console.log("New message : ", message);
//       res.writeHead(200, { "content-type": "text/plain" });
//       res.end("Message Recieved 🎊");
//       fs.writeFileSync("./messages.txt", message, (err) => {
//         if (err) throw err;
//         console.log("The file has been saved!");
//       });
//     });
//   } else {
//     res.writeHead(404, { "content-type": "text/plain" });
//     res.end("Go back to terminal");
//   }
// });

// server.listen(2820, () => {
//   console.log("server started : localhost:2820");
// });

let userName = "";
let mood = "";
const server = http.createServer((req, res) => {
  if (req.method === "PUT") {
    let newName = "";

    req.on("data", (chunk) => {
      newName += chunk;
    });

    req.on("end", () => {
      console.log("old userName : ", userName);
      fs.writeFileSync("./users.txt", newName);
      userName = newName;
      console.log("Updated name : ", userName);

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Username updated!");
    });
  } else if (req.method === "PATCH") {
    let patchName = "";

    req.on("data", (chunk) => {
      patchName += chunk;
    });

    req.on("end", () => {
      console.log("old userName : ", userName);
      userName += patchName;
      fs.writeFileSync("./users.txt", userName);
      console.log("username patched! : ", userName);

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Username updated!");
    });
  } else if (req.method === "DELETE") {
    console.log(userName, " : Deleted!");
    userName = null;
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("UserName : Deleted!");
  } else if (req.method.toUpperCase() === "SETMOOD") {
    let tempMood = "";
    req.on("data", (chunk) => {
      tempMood += chunk;
    });

    req.on("end", () => {
      mood = tempMood;
      console.log("Mood :", mood);
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Mood set Successfull! 💭");
    });
  } else {
    res.writeHead(405); // 405 means "Method Not Allowed"
    res.end("I don't know that method! 🤕");
  }
});

server.listen(2820, () => {
  console.log("Server running at : http://localhost:2820");
});
