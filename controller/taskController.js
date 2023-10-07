const Task = require("../Model/task");
const Errorhandle = require("../middlewares/error");
exports.createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    await Task.create({ title, description, user: req.user });
  
    res.status(201).json({
      messeage: "created",
    });
    
  } catch (error) {
    next(error)
    
  }
};

//GET ALL TASK

  exports.allUserTask = async (req, res, next) => {
    try {
      const id = req.user._id;
      const task = await Task.find({ user: id });
      res.status(201).json({
        messeage: "success",
        task,
      });
      
    } catch (error) {
      next(error)
      
    }
  };
  


//UPDATE TASK

exports.updateUser = async(req, res, next) => {
  try {
    
    const id = req.params.id;
    const task = await Task.findById(id)
    if(!task) return next(new Errorhandle("invalid email and password",401))
  
   task.isComplite = !task.isComplite;
    await task.save()
    res.status(201).json({
        messeage: "updated",
      });
  } catch (error) {
    next(error)
  }
};
//DELETE TASK
exports.deleteUser = async(req, res, next) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id)
  
    if(!task) return next(new Errorhandle("id not found", 401))
  
    task.deleteOne();
    res.status(201).json({
      messeage: "deleted",
    });
    
  } catch (error) {
    next(error)
    
  }
};
