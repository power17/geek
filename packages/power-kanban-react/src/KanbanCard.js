/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';

export const kanbanCardStyle = css`
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
export const kanbanCardTitleSyle = css`
  min-height: 3rem;
`;
export const kanbanCardStatus = css`
  text-align: right;
  font-size: 0.8rem;
  color: #333;
`;
export const KanbanCard = ({ title, status, onDragStart }) => {
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
