const dayjs = require('dayjs');
const Schedule = require('../model/Schedule');
const scheduleController = {};

scheduleController.appendSchedule = async (req,res) => {
  try {
    const {title, date} = req.body;
    if(!title) {
      throw new Error("제목을 입력하세요.");
    }
    if(!date) {
      throw new Error("날짜를 선택하세요.");
    }

    
    const { userId }= req;    
    const newSchedule = new Schedule({userId, title, date, isDone:false})
    await newSchedule.save();
    res.status(200).json({status:"Ok", newSchedule});
  } catch (error) {
    res.status(400).json({status:"Fail", message: error.message});
  }
}
scheduleController.getSchedule = async (req,res) => {
  try {
    const { userId } = req;
    const allSchedules = await Schedule.find({userId});

    const today = dayjs().format('YYYY-MM-DD');
    
    const todaySchedules = allSchedules.filter((schedule)=>{
      const scheduleDate = dayjs(schedule.date).format('YYYY-MM-DD');
      return scheduleDate === today
    })
    
    const thisWeekSchedules = Array.from({ length: 6 }, (_, i) => {
      const today = dayjs();
      const day = today.add(i + 1, 'day').format('YYYY-MM-DD'); 

      const daySchedules = allSchedules.filter((schedule) => {
        const scheduleDate = dayjs(schedule.date).format('YYYY-MM-DD');
        return scheduleDate === day;
      });
      return {
        date: day,
        schedules: daySchedules
      };
    });

    res.status(200).json({status:"Ok", allSchedules, todaySchedules, thisWeekSchedules});
  } catch (error) {
    res.status(400).json({status:"Fail", message:error.message})
  }
}

scheduleController.updateSchedule = async (req,res) => {

}


scheduleController.deleteSchedule = async (req,res) => {
  try {
    const {id} = req.params;
    if(id) {
      throw new Error("해당 게시물을 찾을 수 없습니다.");
    }
    const deletedScheduleList = await Schedule.deleteOne({_id: id});
    
    res.status(200).json({status:"Ok", deletedScheduleList});
    
  } catch (error) {
    res.status(400).json({status:"Fail", message: error.message});
  }
}

module.exports = scheduleController;


