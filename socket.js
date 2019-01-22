const koa = require("koa");
const app = new koa();
const server = require("http").createServer(app.callback());
const io = require("socket.io")(server);

const Router = require("koa-router");
const router = new Router();

// 客户端id 存储数组
let userArray = [];

router.get("/", ctx => {
  ctx.body = "hello world";
});
app.use(router.routes()).use(router.allowedMethods());

io.on("connect", clientSocket => {
  console.log("客户端连入，id为", clientSocket.id);
  let linkTo;
  // 将客户端id存进数组
  userArray.push(clientSocket.id);
  // 向所有客户端广播用户列表更新
  io.sockets.emit("member", userArray);
  clientSocket.on("msg", data => {
    console.log("服务器收到msg", data);
    // 将消息发送给指定用户
    if (io.sockets.connected[linkTo]) {
      io.sockets.connected[linkTo].emit("userMsg", data);
    }
  });
  // 监听用户聊天对象选择
  clientSocket.on("link", data => {
    linkTo = data;
    console.log("linkTo变为", linkTo);
  });
  clientSocket.on("disconnect", () => {
    console.log(clientSocket.id + "客户端断开");
    for (let i = 0; i < userArray.length; i++) {
      if (userArray[i] == clientSocket.id) {
        userArray.splice(i, 1);
      }
    }
    // 向所有客户端广播用户列表更新
    io.sockets.emit("member", userArray);
  });
});

server.listen(3000, () => {
  console.log("socket.io服务器启动于http://127.0.0.1:3000/");
});
