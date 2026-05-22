const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../client/dist')));

const JWT_SECRET = process.env.JWT_SECRET || 'saas_dev_secret_change_in_prod';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/saas';

mongoose.connect(MONGODB_URI).then(() => console.log('MongoDB connected')).catch(console.error);

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  plan: { type: String, default: 'free', enum: ['free', 'pro', 'enterprise'] },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', UserSchema);

const TaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  priority: { type: String, default: 'medium', enum: ['low', 'medium', 'high'] },
  createdAt: { type: Date, default: Date.now }
});
const Task = mongoose.model('Task', TaskSchema);

function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, plan: user.plan } });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password))
      return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, plan: user.plan } });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/auth/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

app.get('/api/tasks', auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(tasks);
});

app.post('/api/tasks', auth, async (req, res) => {
  const { title, priority } = req.body;
  if (!title) return res.status(400).json({ error: 'Title required' });
  const task = await Task.create({ userId: req.user.id, title, priority: priority || 'medium' });
  res.json(task);
});

app.patch('/api/tasks/:id', auth, async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

app.delete('/api/tasks/:id', auth, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ success: true });
});

app.get('/api/dashboard/stats', auth, async (req, res) => {
  const total = await Task.countDocuments({ userId: req.user.id });
  const completed = await Task.countDocuments({ userId: req.user.id, completed: true });
  const high = await Task.countDocuments({ userId: req.user.id, priority: 'high', completed: false });
  res.json({ total, completed, pending: total - completed, highPriority: high });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`SaaS server running on port ${PORT}`));
