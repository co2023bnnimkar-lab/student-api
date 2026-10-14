const express = require('express');
const c = require('../controllers/studentController');

const router = express.Router();

router.get('/', c.getStudents);
router.get('/:id', c.getStudent);
router.post('/', c.createStudent);
router.put('/:id', c.updateStudent);
router.delete('/:id', c.deleteStudent);

module.exports = router;
