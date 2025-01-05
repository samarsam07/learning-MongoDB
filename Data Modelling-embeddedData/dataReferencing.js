const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  grade: String
});

const classRoomSchema = new mongoose.Schema({
  class: String,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);
const ClassRoom = mongoose.model('ClassRoom', classRoomSchema);

const createClassWithStudents = async () => {
  try {
    const student1 = await Student.create({ name: 'sam', age: 18, grade: 'A' });
    const student2 = await Student.create({ name: 'mugi', age: 17, grade: 'B' });
    const student3 = await Student.create({ name: 'sara', age: 18, grade: 'A' });

    const newClass = await ClassRoom.create({
      class: 'X',
      students: [student1._id, student2._id, student3._id]
    });

    console.log('Class with students created:', newClass);
  } catch (error) {
    console.error('Error creating class with students:', error);
  }
};

createClassWithStudents();