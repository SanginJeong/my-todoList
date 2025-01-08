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

scheduleController.getGroupedByMonthSchedule = async (req,res) => {
  try {
    const {userId} = req;
    if(!userId){
      throw new Error("토큰이 유효하지 않습니다.");
    }
    const allSchedules = await Schedule.find({userId});
    
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "June",
      "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const groupedSchedules = allSchedules?.reduce((acc, currentSchedule) => {
        const yearAndMonth = dayjs(currentSchedule.date).format("YYYY-MM");
        const existingGroup = acc.find((group) => group.date === yearAndMonth);
        const year = dayjs(yearAndMonth).get('year');
        const month = monthNames[dayjs(yearAndMonth).get('month')];
        
        if (existingGroup) {
          existingGroup.scheduleList.push(currentSchedule);
        } else {
          acc.push({ date: yearAndMonth, year, month, scheduleList: [currentSchedule]});
        }
      
        return acc;
      }, []);
      
      res.status(200).json({status:"Ok", groupedSchedules});
  } catch (error) {
      res.status(400).json({status:"Fail", message: error.message})
  }
}

scheduleController.updateSchedule = async (req,res) => {
  try {
    const {id} = req.params;
    if(!id){
      throw new Error("해당 게시물을 찾을 수 없습니다.");
    }
    
    const {title, date} = req.body;
    if(!title) {
      throw new Error("제목을 입력하세요.");
    }

    if(!date) {
      throw new Error("날짜를 입력하세요.");
    }

    const updatedSchedule = await Schedule.updateOne({_id: id}, {title, date: dayjs(date).format('YYYY-MM-DD')});
    res.status(200).json({status:"Ok", updatedSchedule})
  } catch (error) {
    res.status(400).json({status:"Fail", message: error.message});
  }
}

scheduleController.updateScheduleIsDone = async (req,res) => {
  try {
    const {id} = req.params;
    if(!id){
      throw new Error("해당 게시물을 찾을 수 없습니다.");
    }
    const onClickedSchedule = await Schedule.findById(id);
    const updatedSchedule = await Schedule.updateOne({_id: id}, {isDone : !onClickedSchedule.isDone})
    res.status(200).json({status:"Ok", updatedSchedule});
  } catch (error) {
    res.status(400).json({status:"Fail", message: error.message})
  }
}

scheduleController.deleteSchedule = async (req,res) => {
  try {
    const {id} = req.params;

    if(!id) {
      throw new Error("해당 게시물을 찾을 수 없습니다.");
    }
    const deletedScheduleList = await Schedule.deleteOne({_id: id});
    
    res.status(200).json({status:"Ok", deletedScheduleList});
    
  } catch (error) {
    res.status(400).json({status:"Fail", message: error.message});
  }
}

module.exports = scheduleController;


