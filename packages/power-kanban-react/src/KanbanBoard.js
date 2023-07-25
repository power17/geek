/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { KanbanColumn } from './KanbanColumn';
import { KanbanCard } from './KanbanCard';
import { KanbanNewCard } from './KanbanNewCard';

const COLUMN_KEY_TODO = 'todo';
const COLUMN_KEY_ONGOING = 'ongoing';
const COLUMN_KEY_DONE = 'done';

const COLUMN_BG_COLORS = {
  loading: '#e3e3e3',
  todo: '#C9AF97',
  ongoing: '#FFE799',
  done: '#FFE799',
};
const kanbanBoardStyles = css`
  flex: 10;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin: 0 1rem 1rem;
`;

export default function KanbanBoard({ isLoading, todoList, ongoingList, doneList, onAdd, onRemove }) {
  const [dragItem, setDragItem] = useState(null);
  const [dragSource, setDragSource] = useState(null);
  const [dragTarget, setDragTarget] = useState(null);
  const handleDrop = (evt) => {
    if (!dragItem || !dragSource || !dragTarget || dragSource === dragTarget) {
      return;
    }
    dragSource && onRemove(dragSource, dragItem);
    dragTarget && onAdd(dragTarget, dragItem);
  };

  return (
    <main css={kanbanBoardStyles}>
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
            setDragItem={setDragItem}
            cartList={todoList}
            onDrop={handleDrop}
            bgColor={COLUMN_BG_COLORS.todo}
            canAddNew
            onAdd={onAdd.bind(null, COLUMN_KEY_TODO)}
            title="待处理"></KanbanColumn>
          <KanbanColumn
            setDragItem={setDragItem}
            cartList={ongoingList}
            setIsDragSource={(isSrc) => {
              setDragSource(isSrc ? COLUMN_KEY_ONGOING : null);
            }}
            setIsDragTarget={(isTgt) => {
              console.log('target');
              setDragTarget(isTgt ? COLUMN_KEY_ONGOING : null);
            }}
            onDrop={handleDrop}
            bgColor={COLUMN_BG_COLORS.ongoing}
            title="处理中"></KanbanColumn>
          <KanbanColumn
            setDragItem={setDragItem}
            cartList={doneList}
            onDrop={handleDrop}
            setIsDragSource={(isSrc) => {
              setDragSource(isSrc ? COLUMN_KEY_DONE : null);
            }}
            setIsDragTarget={(isTgt) => {
              setDragTarget(isTgt ? COLUMN_KEY_DONE : null);
            }}
            bgColor={COLUMN_BG_COLORS.done}
            title="已完成"></KanbanColumn>
        </>
      )}
    </main>
  );
}
