const Student = require('../models/Student');

const FIELDS = ['studentId', 'name', 'email', 'department', 'semester', 'contact'];

function pick(body, skip = []) {
  const out = {};
  FIELDS.forEach((f) => {
    if (!skip.includes(f) && body[f] !== undefined && body[f] !== '') out[f] = body[f];
  });
  return out;
}

function handleError(res, err) {
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((e) => e.message).join(', ');
    return res.status(400).json({ success: false, message });
  }
  if (err.code === 11000) {
    return res.status(409).json({ success: false, message: 'Student ID already exists' });
  }
  console.error(err);
  return res.status(500).json({ success: false, message: 'Server error' });
}

// GET /api/students?q=term
exports.getStudents = async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    let filter = {};
    if (q) {
      const rx = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      filter = { $or: [{ studentId: rx }, { name: rx }, { email: rx }, { department: rx }] };
    }
    const data = await Student.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: data.length, data });
  } catch (err) { handleError(res, err); }
};

// GET /api/students/:id   (id = studentId, e.g. ST101)
exports.getStudent = async (req, res) => {
  try {
    const s = await Student.findOne({ studentId: req.params.id.toUpperCase() });
    if (!s) return res.status(404).json({ success: false, message: 'Student not found' });
    res.json({ success: true, data: s });
  } catch (err) { handleError(res, err); }
};

// POST /api/students
exports.createStudent = async (req, res) => {
  try {
    const s = await Student.create(pick(req.body));
    res.status(201).json({ success: true, message: 'Student added successfully', data: s });
  } catch (err) { handleError(res, err); }
};

// PUT /api/students/:id
exports.updateStudent = async (req, res) => {
  try {
    const s = await Student.findOneAndUpdate(
      { studentId: req.params.id.toUpperCase() },
      pick(req.body, ['studentId']),
      { new: true, runValidators: true }
    );
    if (!s) return res.status(404).json({ success: false, message: 'Student not found' });
    res.json({ success: true, message: 'Student updated successfully', data: s });
  } catch (err) { handleError(res, err); }
};

// DELETE /api/students/:id
exports.deleteStudent = async (req, res) => {
  try {
    const s = await Student.findOneAndDelete({ studentId: req.params.id.toUpperCase() });
    if (!s) return res.status(404).json({ success: false, message: 'Student not found' });
    res.json({ success: true, message: 'Student deleted successfully' });
  } catch (err) { handleError(res, err); }
};
