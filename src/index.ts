import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/dishes", async (req, res) => {
  const dishes = await prisma.dish.findMany();
  res.json(dishes);
});

app.get("/menu", async (req, res) => {
  const dishes = await prisma.dish.findMany({
    where: { published: true },
  });
  res.json(dishes);
});

app.get(`/dish/:id`, async (req, res) => {
  const { id } = req.params;
  const dish = await prisma.dish.findUnique({
    where: { id: Number(id) },
  });
  res.json(dish);
});

app.post(`/dish`, async (req, res) => {
  const { title, description, price } = req.body;
  const result = await prisma.dish.create({
    data: {
      title,
      description,
      published: false,
      price,
    },
  });
  res.json(result);
});

app.put("/dish/publish/:id", async (req, res) => {
  const { id } = req.params;
  const dish = await prisma.dish.update({
    where: { id: Number(id) },
    data: { published: true },
  });
  res.json(dish);
});

app.delete(`/dish/:id`, async (req, res) => {
  const { id } = req.params;
  const dish = await prisma.dish.delete({
    where: { id: Number(id) },
  });
  res.json(dish);
});

app.listen(3000, () =>
  console.log("REST API server ready at: http://localhost:3000")
);
