/** @jsxImportSource @emotion/react */
import './App.css';
import { css } from '@emotion/react';
import React, { useState, useEffect, useRef } from 'react';

function App() {
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
  const MINUTE = 60 * 1000;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const UPDATE_INTERVAL = MINUTE;
  const KanbanCard = ({ title, status }) => {
    const [displayTime, setDisplayTime] = useState(status);

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
      <li css={kanbanCardStyle}>
        <div css={kanbanCardTitleSyle}>{title}</div>
        <div css={kanbanCardStatus} title={status}>
          {displayTime}
        </div>
      </li>
    );
  };

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
  const KanbanColumn = ({ children, className, title }) => {
    // const combinedClassName = `kanban-column ${className}`;
    return (
      <section
        className={className}
        css={css`
          flex: 1 1;
          display: flex;
          flex-direction: column;
          border: 1px solid gray;
          border-radius: 1rem;
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
      <KanbanBoard>
        <KanbanColumn
          className="column-todo"
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
            <KanbanCard {...props} key={index}></KanbanCard>
          ))}
        </KanbanColumn>

        <KanbanColumn className="column-ongoing" title="处理中">
          {ongoingList.map((props, index) => (
            <KanbanCard {...props} key={index}></KanbanCard>
          ))}
        </KanbanColumn>
        <KanbanColumn className="column-done" title="已完成">
          {doneList.map((props, index) => (
            <KanbanCard {...props} key={index}></KanbanCard>
          ))}
        </KanbanColumn>
      </KanbanBoard>
    </div>
  );
}

export default App;
