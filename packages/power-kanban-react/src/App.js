/** @jsxImportSource @emotion/react */
import './App.css';
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import KanbanBoard from './KanbanBoard';
import { KanbanColumn } from './KanbanColumn';
import { KanbanCard } from './KanbanCard';
import { KanbanNewCard } from './KanbanNewCard';

const COLUMN_KEY_TODO = 'todo';
const COLUMN_KEY_ONGOING = 'ongoing';
const COLUMN_KEY_DONE = 'done';

const DATA_STORE_KEY = 'kanban-data-store';

function App() {
  const [todoList, setTodoList] = useState([
    { title: '开发任务-1', status: '22-05-22 18:15' },
    { title: '开发任务-3', status: '22-05-22 18:15' },
    { title: '开发任务-5', status: '22-05-22 18:15' },
    { title: '测试任务-3', status: '22-05-22 18:15' },
  ]);
  const [ongoingList, setOngoingList] = useState([
    { title: '开发任务-4', status: '22-05-22 18:15' },
    { title: '开发任务-6', status: '22-05-22 18:15' },
    { title: '测试任务-2', status: '22-05-22 18:15' },
  ]);
  const [doneList, setDoneList] = useState([
    { title: '开发任务-2', status: '22-05-22 18:15' },
    { title: '测试任务-1', status: '22-05-22 18:15' },
  ]);
  const KanbanHeader = () => {
    const handleSaveAll = () => {
      const data = JSON.stringify({ todoList, ongoingList, doneList });
      window.localStorage.setItem(DATA_STORE_KEY, data);
    };
    return (
      <header className="App-header">
        <h1>
          我的看板 <button onClick={handleSaveAll}>保存所有卡片</button>
        </h1>
      </header>
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
  };

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const data = window.localStorage.getItem(DATA_STORE_KEY);
    setTimeout(() => {
      if (data) {
        const kanbanColumnData = JSON.parse(data);
        setTodoList(kanbanColumnData.todoList);
        setOngoingList(kanbanColumnData.ongoingList);
        setDoneList(kanbanColumnData.doneList);
      }
      setIsLoading(false);
    }, 1000);
  }, []);
  const COLUMN_BG_COLORS = {
    loading: '#e3e3e3',
    todo: '#C9AF97',
    ongoing: '#FFE799',
    done: '#FFE799',
  };

  const [dragItem, setDragItem] = useState(null);
  const [dragSource, setDragSource] = useState(null);
  const [dragTarget, setDragTarget] = useState(null);
  const handleDrop = () => {
    if (!dragItem || !dragSource || !dragTarget || dragSource === dragTarget) {
      return;
    }
    const updaters = {
      [COLUMN_KEY_TODO]: setTodoList,
      [COLUMN_KEY_ONGOING]: setOngoingList,
      [COLUMN_KEY_DONE]: setDoneList,
    };
    if (dragSource) {
      updaters[dragSource]((currentStat) => currentStat.filter((item) => !Object.is(item, dragItem)));
    }
    if (dragTarget) {
      updaters[dragTarget]((currentStat) => [dragItem, ...currentStat]);
    }
  };

  return (
    <div className="App">
      <KanbanHeader></KanbanHeader>
      <KanbanBoard>
        {isLoading ? (
          <KanbanColumn title="读取中" bgColor={COLUMN_BG_COLORS.loading}></KanbanColumn>
        ) : (
          <>
            <KanbanColumn
              setIsDragSource={(isSrc) => {
                setDragSource(isSrc ? COLUMN_KEY_TODO : null);
              }}
              setIsDragTarget={(isTgt) => {
                setDragTarget(isTgt ? COLUMN_KEY_TODO : null);
              }}
              onDrop={handleDrop}
              bgColor={COLUMN_BG_COLORS.todo}
              title={
                <>
                  待处理
                  <button disabled={showAdd} onClick={handleAdd}>
                    &#8853; 添加新卡片
                  </button>
                </>
              }>
              {showAdd && <KanbanNewCard onsubmit={handleSubmit} />}
              {todoList.map((props, index) => (
                <KanbanCard
                  onDragStart={() => {
                    setDragItem(props);
                  }}
                  {...props}
                  key={index}></KanbanCard>
              ))}
            </KanbanColumn>
            <KanbanColumn
              setIsDragSource={(isSrc) => {
                setDragSource(isSrc ? COLUMN_KEY_ONGOING : null);
              }}
              setIsDragTarget={(isTgt) => {
                console.log('target');
                setDragTarget(isTgt ? COLUMN_KEY_ONGOING : null);
              }}
              onDrop={handleDrop}
              bgColor={COLUMN_BG_COLORS.ongoing}
              title="处理中">
              {ongoingList.map((props, index) => (
                <KanbanCard
                  onDragStart={() => {
                    setDragItem(props);
                  }}
                  {...props}
                  key={index}></KanbanCard>
              ))}
            </KanbanColumn>
            <KanbanColumn
              onDrop={handleDrop}
              setIsDragSource={(isSrc) => {
                setDragSource(isSrc ? COLUMN_KEY_DONE : null);
              }}
              setIsDragTarget={(isTgt) => {
                setDragTarget(isTgt ? COLUMN_KEY_DONE : null);
              }}
              bgColor={COLUMN_BG_COLORS.done}
              title="已完成">
              {doneList.map((props, index) => (
                <KanbanCard
                  onDragStart={() => {
                    setDragItem(props);
                  }}
                  {...props}
                  key={index}></KanbanCard>
              ))}
            </KanbanColumn>
          </>
        )}
      </KanbanBoard>
    </div>
  );
}

export default App;
