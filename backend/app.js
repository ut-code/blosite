// app.js (または server.js)
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// コンテンツを保存するAPI
app.post('/api/saveContent', async (req, res) => {
  const { username, contentName, description, content, photo } = req.body;

  try {
    const newContent = await prisma.content.create({
      data: {
        username,
        contentName,
        description,
        content,
        photo,
      },
    });
    res.json(newContent);
  } catch (error) {
    res.status(500).json({ error: 'Error saving content' });
  }
});

// コンテンツを取得するAPI
app.get('/api/getContents', async (req, res) => {
  try {
    const contents = await prisma.content.findMany({
      orderBy: { createdAt: 'desc' }, // 作成日時でソート
    });
    res.json(contents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching contents' });
  }
});

// サーバーの起動
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
