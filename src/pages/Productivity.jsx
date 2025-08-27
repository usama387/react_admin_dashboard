import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar } from "@/components/ui/calendar";
import { Trash2, Plus, Folder, FileText } from "lucide-react";
import { addTask, deleteTask, toggleTask } from "@/features/taskSlice";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  hover: { scale: 1.02, boxShadow: "0 8px 20px rgba(220, 38, 38, 0.2)", transition: { duration: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  hover: { backgroundColor: "rgba(239, 68, 68, 0.05)", transition: { duration: 0.2 } },
};

export function Productivity() {
  const [newTask, setNewTask] = useState("");
  const [date, setDate] = useState(new Date());
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const mockFiles = [
    {
      name: "Documents",
      type: "folder",
      children: [
        { name: "Resume.pdf", type: "file" },
        { name: "Proposal.docx", type: "file" },
      ],
    },
    {
      name: "Images",
      type: "folder",
      children: [
        { name: "Logo.png", type: "file" },
        { name: "Screenshot.jpg", type: "file" },
      ],
    },
    { name: "Data.csv", type: "file" },
  ];

  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch(addTask(newTask));
      setNewTask("");
    }
  };

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-red-50 to-red-100 min-h-screen">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="md:col-span-1"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-red-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-red-600">Tasks</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Manage your to-do list
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => dispatch(toggleTask(task.id))}
                        className="border-red-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                      />
                      <span className={`text-base ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                        {task.text}
                      </span>
                    </div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => dispatch(deleteTask(task.id))}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50/80"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </motion.div>
                  </motion.div>
                ))}
                <div className="flex items-center space-x-2 mt-4">
                  <Input
                    placeholder="Add new task..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="text-base border-red-200 focus:ring-2 focus:ring-red-300"
                  />
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={handleAddTask}
                      className="bg-red-500 text-white hover:bg-red-600"
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="md:col-span-1"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-red-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-red-600">File Manager</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Mockup of your files and folders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {mockFiles.map((item, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    {item.type === "folder" ? (
                      <AccordionTrigger className="text-base text-red-600 hover:text-red-700">
                        <div className="flex items-center space-x-2">
                          <Folder className="h-5 w-5 text-red-500" />
                          <span>{item.name}</span>
                        </div>
                      </AccordionTrigger>
                    ) : (
                      <div className="flex items-center space-x-2 py-2 text-base text-foreground">
                        <FileText className="h-5 w-5 text-red-500" />
                        <span>{item.name}</span>
                      </div>
                    )}
                    {item.type === "folder" && (
                      <AccordionContent>
                        {item.children.map((child, childIndex) => (
                          <div key={childIndex} className="flex items-center space-x-2 py-1 pl-4 text-base text-foreground">
                            <FileText className="h-4 w-4 text-red-400" />
                            <span>{child.name}</span>
                          </div>
                        ))}
                      </AccordionContent>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="md:col-span-1"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-red-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-red-600">Calendar</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                View and select dates
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border border-red-200"
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default Productivity;