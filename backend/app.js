const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const multer = require('multer');

const app = express();
const prisma = new PrismaClient();
const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// コンテンツを保存するAPI
app.post('/api/saveContent', upload.none(),  async (req, res) => {
  const { username, contentName, description, content, photo } = req.body;
  console.log('Received content:', req.body);
  try {
    const newContent = await prisma.websites.create({
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
    console.error('Error saving content:', error);
    res.status(500).json({ error: 'Error saving content' });
  }
});

// コンテンツを更新するAPI
app.put('/api/updateContent', upload.none(), async (req, res) => {
  const { id, username, contentName, description, content, photo } = req.body;
  console.log('Received content:', req.body);

  if (!id) {
    return res.status(400).json({ error: 'ID is required to update content' });
  }

  try {
    const updatedContent = await prisma.websites.update({
      where: { id: parseInt(id) },
      data: {
        photo: photo,
      },
    });
    res.json(updatedContent);
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({ error: 'Error updating content' });
  }
});

// コンテンツを取得するAPI
app.get('/api/getContents', async (req, res) => {
  try {
    const contents = await prisma.websites.findMany({
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
