import Task from "../Models/users_tasks.model.js";
export const addTask = async (req, res) => {
    const { taskName, deadline, email2 } = req.body;
    const task = new Task({
        taskName,
        deadline,
        email: email2
    });
    await task.save();
    res.json({
        message: "Task Added",
        task
    });

};
export const getTasks = async (req, res) => {

    const { email } = req.params;

    const tasks = await Task.find({ email });

    res.json(tasks);

};
export const deleteTask = async (req, res) => {

    const { id } = req.params;

    const task = await Task.findOne({
        _id: id
    });

    if (task==null) {
        return res.json({
            message: "Task Not Found"
        });
    }

    await Task.deleteOne({
        _id: id
    });

    res.json({
        message: "Task Deleted Successfully"
    });

};
export const updateTask = async (req, res) => {

    const { id } = req.params;
    const { taskName, taskDeadline } = req.body;

    const task = await Task.findOne({
        _id: id
    });

    if (task == null) {
        return res.json({
            message: "Task Not Found"
        });
    }

    await Task.updateOne(
        {
            _id: id
        },
        {
            $set: {
                taskName,
                deadline:taskDeadline
            }
        }
    );

    res.json({
        message: "Task Updated Successfully"
    });

};