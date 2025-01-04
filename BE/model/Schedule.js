const mongoose = require('mongoose');
const { Schema } = mongoose;

const scheduleSchema = Schema({
  userId : {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title : {
    type: String,
    required: true,
  },
  isDone : {
    type: Boolean,
    required: true,
  },
  date : {
    type: Date,
    required: true,
  }
}, {timestamps: true})

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;