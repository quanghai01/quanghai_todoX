import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import api from "@/lib/axios";

const AddTask = ({ handleNewTaskAdded }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const addTask = async () => {
    if (newTaskTitle.trim()) {
      try {
        await api.post("/tasks", {
          title: newTaskTitle,
        });
        toast.success("Nhiệm vụ đã được thêm thành công!");
        handleNewTaskAdded();
      } catch (error) {
        console.log("Loi them nhiem vu", error);
        toast.error("Loi them nhiem vu");
      }

      setNewTaskTitle("");
    } else {
      toast.error("Bạn cần nhập nội dung nhiệm vụ.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };
  return (
    <>
      <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            type="text"
            placeholder="Thêm công việc gì? "
            className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:ring-primary/20"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button
            variant="gradient"
            size="xl"
            className="px-6 h-auto"
            onClick={addTask}
            disabled={!newTaskTitle.trim()}
          >
            <Plus size={5} />
            Thêm
          </Button>
        </div>
      </Card>
    </>
  );
};

export default AddTask;
