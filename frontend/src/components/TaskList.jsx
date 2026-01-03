import React from "react";
import TaskCard from "./TaskCard";
import TaskEmptyState from "./TaskEmptyState";

const TaskList = ({ filterTasks, filter, handleTaskChange }) => {
  if (!filterTasks || filterTasks.length === 0)
    return <TaskEmptyState filter={filter} />;
  return (
    <div className="space-y-3">
      {filterTasks.map((task, index) => (
        <TaskCard
          key={task._id ?? index}
          task={task}
          index={index}
          handleTaskChange={handleTaskChange}
        />
      ))}
    </div>
  );
};

export default TaskList;
