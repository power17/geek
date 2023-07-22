import './App.css';
import React, { useState } from 'react';

function App() {
  const [todoList, setTodoList] = useState([
    { title: '开发任务-1', status: '22-05-22 18:15' },
    { title: '开发任务-3', status: '22-05-22 18:15' },
    { title: '开发任务-5', status: '22-05-22 18:15' },
    { title: '测试任务-3', status: '22-05-22 18:15' },
  ]);
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

  const KanbanNewCard = ({ onsubmit }) => {
    const [title, setTitle] = useState('');
    const handleChange = (e) => {
      setTitle(e.target.value);
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        onsubmit(title);
      }
    };
    return (
      <li className="kanban-card">
        <h3>添加新卡片</h3>
        <div className="card-title">
          <input type="text" onChange={handleChange} onKeyDown={handleKeyDown} />
        </div>
      </li>
    );
  };
  const [showAdd, setShowAdd] = useState(false);
  // let showAdd = false;
  const handleAdd = () => {
    setShowAdd(true);
    // showAdd = true;
  };
  const handleSubmit = (title) => {
    console.log(title);
    setTodoList((currentList) => [{ title, status: new Date().toString() }, ...currentList]);

    // setShowAdd(false);
    // showAdd = false;
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>我的看板</h1>
      </header>
      <main className="kanban-board">
        <section className="kanban-column column-todo">
          <h2>
            待处理{' '}
            <button disabled={showAdd} onClick={handleAdd}>
              &#8853; 添加新卡片
            </button>
          </h2>
          <ul>
            {showAdd && <KanbanNewCard onsubmit={handleSubmit} />}
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
