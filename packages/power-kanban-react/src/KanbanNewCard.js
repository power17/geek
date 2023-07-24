/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect, useRef } from 'react';
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

export const KanbanNewCard = ({ onsubmit }) => {
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
