import express from "express";
import cors from "cors";
import { userRouter } from "./router/userRouter";
import { PostController } from "./controller/PostController";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3003, () => {
  console.log(`Servidor rodando na porta ${3003}`);
});

app.use("/users", userRouter);

const postController = new PostController();

app.get("/posts", postController.getPosts);
app.post("/posts", postController.createPost);
app.put("/posts/:id", postController.updateUsers);
app.delete("/posts/:id", postController.deletePost);
