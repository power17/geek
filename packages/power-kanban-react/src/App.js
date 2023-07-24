/** @jsxImportSource @emotion/react */
import './App.css';
import { css } from '@emotion/react';
import React, { useState, useEffect, useRef } from 'react';

const COLUMN_KEY_TODO = 'todo';
const COLUMN_KEY_ONGOING = 'ongoing';
const COLUMN_KEY_DONE = 'done';

const DATA_STORE_KEY = 'kanban-data-store';

const KanbanColumn = ({ children, className, title, bgColor, setIsDragSource = () => {}, setIsDragTarget = () => {}, onDrop }) => {
  // const combinedClassName = `kanban-column ${className}`;
  return (
    <section
      onDragStart={() => {
        setIsDragSource(true);
      }}
      onDragOver={(evt) => {
        console.log('over');
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'move';
        setIsDragTarget(true);
      }}
      onDragLeave={(evt) => {
        console.log('leave');
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'none';
        setIsDragTarget(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDrop && onDrop(e);
      }}
      onDragEnd={(evt) => {
        console.log('dragEnd');
        evt.preventDefault();
        setIsDragSource(false);
        setIsDragTarget(false);
      }}
      className={className}
      css={css`
        flex: 1 1;
        display: flex;
        flex-direction: column;
        border: 1px solid gray;
        border-radius: 1rem;
        background-color: ${bgColor};
        & > ul {
          flex: 1;
          flex-basis: 0;
          margin: 1rem;
          padding: 0;
          overflow: auto;
        }
        & > h2 {
          margin: 0.6rem 1rem;
          padding-bottom: 0.6rem;
          border-bottom: 1px solid gray;
          & > button {
            float: right;
            margin-top: 0.2rem;
            padding: 0.2rem 0.5rem;
            border: 0;
            border-radius: 1rem;
            height: 1.8rem;
            line-height: 1rem;
            font-size: 1rem;
          }
        }
      `}>
      <h2>{title}</h2>
      <ul>{children}</ul>
    </section>
  );
};
const kanbanCardStyle = css`
  margin-bottom: 1rem;
  padding: 0.6rem 1rem;
  border: 1px solid gray;
  border-radius: 1rem;
  list-style: none;
  background-color: rgba(255, 255, 255, 0.4);
  text-align: left;
  &:hover {
    box-shadow: 0 0.2rem 0.2rem rgba(0, 0, 0, 0.2), inset 0 1px #fff;
  }
`;
const kanbanCardTitleSyle = css`
  min-height: 3rem;
`;
const kanbanCardStatus = css`
  text-align: right;
  font-size: 0.8rem;
  color: #333;
`;
const KanbanNewCard = ({ onsubmit }) => {
  const inputElem = useRef(null);
  const [title, setTitle] = useState('');
  useEffect(() => {
    inputElem.current.focus();
  }, []);
  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onsubmit(title);
    }
  };
  return (
    <li css={kanbanCardStyle}>
      <h3
        css={css`
          ${kanbanCardTitleSyle}
          & > input[type="text"] {
            width: 80%;
          }
        `}>
        添加新卡片
      </h3>
      <div className="card-title">
        <input ref={inputElem} type="text" onChange={handleChange} onKeyDown={handleKeyDown} />
      </div>
    </li>
  );
};
const KanbanCard = ({ title, status, onDragStart }) => {
  const MINUTE = 60 * 1000;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const UPDATE_INTERVAL = MINUTE;

  const [displayTime, setDisplayTime] = useState(status);
  const handleDragstart = (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', title);
    // 设置drageItem
    onDragStart && onDragStart(e);
  };
  useEffect(() => {
    const updateDisplayTime = () => {
      const timePassed = new Date() - new Date(status);
      let relativeTime = '刚刚';
      if (MINUTE <= timePassed && timePassed < HOUR) {
        relativeTime = `${Math.ceil(timePassed / MINUTE)} 分钟前`;
      } else if (HOUR <= timePassed && timePassed < DAY) {
        relativeTime = `${Math.ceil(timePassed / HOUR)} 小时前`;
      } else if (DAY <= timePassed) {
        relativeTime = `${Math.ceil(timePassed / DAY)} 天前`;
      }
      setDisplayTime(relativeTime);
    };
    const intervalId = setInterval(updateDisplayTime, UPDATE_INTERVAL);
    updateDisplayTime();
    return function cleanup() {
      clearInterval(intervalId);
    };
  }, [status]);
  return (
    <li css={kanbanCardStyle} draggable onDragStart={handleDragstart}>
      <div css={kanbanCardTitleSyle}>{title}</div>
      <div css={kanbanCardStatus} title={status}>
        {displayTime}
      </div>
    </li>
  );
};

const KanbanBoard = ({ children }) => (
  <main
    css={css`
      flex: 10;
      display: flex;
      flex-direction: row;
      gap: 1rem;
      margin: 0 1rem 1rem;
    `}>
    {children}
  </main>
);

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

    // setShowAdd(false);
    // showAdd = false;
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
    console.log('drop');
    console.log(dragItem, dragSource, dragTarget);
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
