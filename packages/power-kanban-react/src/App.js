import './App.css';
import React from 'react';

function App() {
  const todoList = [
    { title: '开发任务-1', status: '22-05-22 18:15' },
    { title: '开发任务-3', status: '22-05-22 18:15' },
    { title: '开发任务-5', status: '22-05-22 18:15' },
    { title: '测试任务-3', status: '22-05-22 18:15' },
  ];
  const ongoingList = [
    { title: '开发任务-4', status: '22-05-22 18:15' },
    { title: '开发任务-6', status: '22-05-22 18:15' },
    { title: '测试任务-2', status: '22-05-22 18:15' },
  ];
  const doneList = [
    { title: '开发任务-2', status: '22-05-22 18:15' },
    { title: '测试任务-1', status: '22-05-22 18:15' },
  ];
  const KanbanCard = ({ title, status }) => (
    <li className="kanban-card">
      <div className="card-title">{title}</div>
      <div className="card-status">{status}</div>
    </li>
  );
  return (
    <div className="App">
      <header className="App-header">
        <h1>我的看板</h1>
      </header>
      <main className="kanban-board">
        <section className="kanban-column column-todo">
          <h2>待处理</h2>
          <ul>
            {todoList.map((props, index) => (
              <KanbanCard {...props} key={index}></KanbanCard>
            ))}
          </ul>
        </section>

        <section className="kanban-column column-ongoing">
          <h2>进行中</h2>
          <ul>
            {ongoingList.map((props, index) => (
              <KanbanCard {...props} key={index}></KanbanCard>
            ))}
          </ul>
        </section>
        <section className="kanban-column column-done">
          <h2>已完成</h2>
          <ul>
            {doneList.map((props, index) => (
              <KanbanCard {...props} key={index}></KanbanCard>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
