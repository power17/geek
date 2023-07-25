/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { KanbanCard } from './KanbanCard';
import { KanbanNewCard } from './KanbanNewCard';
const kanbanColumnStyles = css`
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
`;
export const KanbanColumn = ({
  cartList = [],
  className,
  canAddNew = false,
  onAdd,
  title,
  bgColor,
  setIsDragSource = () => {},
  setIsDragTarget = () => {},
  setDragItem,
  onDrop,
}) => {
  const [showAdd, setShowAdd] = useState(false);
  const handleAdd = () => {
    setShowAdd(true);
  };
  const handleSubmit = (newCard) => {
    onAdd && onAdd(newCard);
    // setShowAdd(false);
  };
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
      css={css`
        ${kanbanColumnStyles}
        background-color: ${bgColor};
      `}>
      <h2>
        {title}
        {canAddNew && (
          <button onClick={handleAdd} disabled={showAdd}>
            &#8853;添加新卡片
          </button>
        )}
      </h2>
      <ul>
        {canAddNew && showAdd && <KanbanNewCard onsubmit={handleSubmit}></KanbanNewCard>}
        {cartList.map((props, index) => (
          <KanbanCard
            onDragStart={() => {
              setDragItem && setDragItem(props);
            }}
            {...props}
            key={index}></KanbanCard>
        ))}
      </ul>
    </section>
  );
};
