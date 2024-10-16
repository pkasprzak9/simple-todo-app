import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import styles from "./Hero.module.scss";
import { ArrowUp, ArrowDown } from "react-bootstrap-icons";

export default function Hero() {
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState({
    text: "",
    isDone: false
  });

  const handleInputChange = (e) => {
    setTask(prev => ({ ...prev, text: e.target.value }));
  };

  const handleAddTask = () => {
    const taskToAdd = document.getElementById("taskInput").value;
    if (taskToAdd.trim() !== "") {
      setTaskList(t => [...t, { text: taskToAdd, isDone: false }].sort((a, b) => a.isDone - b.isDone));
      setTask({ text: "", isDone: false });
    }
  };

  const handleRemoveTask = (index) => {
    const filteredTaskList = taskList.filter((_, i) => i !== index);
    setTaskList(filteredTaskList);
  };

  const moveTaskUp = index => {
    if (index > 0 && !taskList[index].isDone && !taskList[index - 1].isDone) {
      const tempList = [...taskList];
      [tempList[index - 1], tempList[index]] = [tempList[index], tempList[index - 1]];
      setTaskList(tempList);
    }
  };

  const moveTaskDown = index => {
    if (index < taskList.length - 1 && !taskList[index].isDone && !taskList[index + 1].isDone) {
      const tempList = [...taskList];
      [tempList[index + 1], tempList[index]] = [tempList[index], tempList[index + 1]];
      setTaskList(tempList);
    }
  };

  const handleDoneTask = index => {
    taskList[index].isDone = true;
    const tempList = [...taskList];
    const taskToMove = tempList.splice(index, 1)[0];
    tempList.push(taskToMove);
    setTaskList(tempList);
  };

  return (
    <Container fluid="lg" className="mt-5 p-4 bg-light rounded shadow">
      <div className="text-center mb-4">
        <div className="d-flex flex-wrap align-items-stretch justify-content-center gap-3">
          <input
            type="text"
            id="taskInput"
            className="p-2 rounded border border-primary"
            value={task.text}
            onChange={handleInputChange}
            placeholder="Enter Task"
          />
          <Button variant="success" onClick={handleAddTask}>ADD TASK</Button>
        </div>
      </div>
      <ol className={`${styles.list} mt-4 d-flex flex-column justify-content-center`}>
        {taskList.map((task, index) => (
          <li
            key={index}
            className={`d-flex align-items-center justify-content-between w-100 border rounded p-3 mb-3 ${styles.listItem} ${task.isDone ? styles.done : ''}`}
            style={{ backgroundColor: '#f8f9fa' }}
          >
            <span className={`${styles.listText}`}>{task.text}</span>
            <div className="buttons d-flex align-items-center gap-2">
              {!task.isDone && (
                <Button variant="outline-success" className={`${styles.btnDone}`} onClick={() => handleDoneTask(index)}>
                  DONE
                </Button>
              )}
              <Button variant="outline-danger" className={`${styles.btnDelete}`} onClick={() => handleRemoveTask(index)}>
                DELETE
              </Button>
              {!task.isDone && (
                <Button variant="outline-primary" onClick={() => moveTaskUp(index)}>
                  <ArrowUp />
                </Button>
              )}
              {!task.isDone && (
                <Button variant="outline-primary" onClick={() => moveTaskDown(index)}>
                  <ArrowDown />
                </Button>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Container>
  );
}
