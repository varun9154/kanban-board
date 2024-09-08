// pages/index.tsx
import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, "tasks"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksArray: any[] = [];
      querySnapshot.forEach((doc) => {
        tasksArray.push({ ...doc.data(), id: doc.id });
      });
      setTasks(tasksArray);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="kanban-board">
      <div className="column">
        <h2>TODO</h2>
        {tasks.filter(task => task.status === 'TODO').map(task => (
          <div key={task.id}>{task.name}</div>
        ))}
      </div>
      <div className="column">
        <h2>IN PROGRESS</h2>
        {tasks.filter(task => task.status === 'IN PROGRESS').map(task => (
          <div key={task.id}>{task.name}</div>
        ))}
      </div>
      <div className="column">
        <h2>COMPLETED</h2>
        {tasks.filter(task => task.status === 'COMPLETED').map(task => (
          <div key={task.id}>{task.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Home;
