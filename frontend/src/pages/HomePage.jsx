import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";
const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTasksCount, setActiveTasksCount] = useState(0);
  const [completeTasksCount, setCompleteTasksCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);

  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);

      setTaskBuffer(res.data.tasks);
      setActiveTasksCount(res.data.activeCount);
      setCompleteTasksCount(res.data.completeCount);
    } catch (error) {
      console.log(error);
      toast.error("loi khi truy suat task");
    }
  };
  const handleTaskChange = () => {
    fetchTasks();
  };
  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const filterTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "complete";
      default:
        return true;
    }
  });

  const visibleTasks = filterTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );

  if (visibleTasks.length == 0) {
    handlePrev();
  }
  const totalPages = Math.ceil(filterTasks.length / visibleTaskLimit);

  return (
    <div className="min-h-screen w-full relative">
      {/* Peachy Mint Dream Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `  radial-gradient(
          circle at top right,
          rgba(56, 193, 182, 0.5),
          transparent 70%
        )`,
        }}
      />
      {/* Your Content/Components */}
      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl -6 mx-auto space-y-6">
          <Header />

          <AddTask handleNewTaskAdded={handleTaskChange} />

          <StatsAndFilters
            filter={filter}
            setFilter={setFilter}
            completedTasksCount={completeTasksCount}
            activeTasksCount={activeTasksCount}
          />

          <TaskList
            filterTasks={visibleTasks}
            filter={filter}
            handleTaskChange={handleTaskChange}
          />

          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>
          <Footer
            activeTasksCount={activeTasksCount}
            completedTasksCount={completeTasksCount}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
