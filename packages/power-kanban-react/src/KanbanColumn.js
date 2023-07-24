/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

export const KanbanColumn = ({ children, className, title, bgColor, setIsDragSource = () => {}, setIsDragTarget = () => {}, onDrop }) => {
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
      css={css`
        ${kanbanColumnStyles}
        background-color: ${bgColor};
      `}>
      <h2>{title}</h2>
      <ul>{children}</ul>
    </section>
  );
};
