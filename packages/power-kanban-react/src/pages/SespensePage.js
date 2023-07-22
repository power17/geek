import { useState, Suspense, React, useId } from 'react';
import User from '../components/User';
import Num from '../components/Num';
import { fetchData } from '../utils';
import ErrorBoundaryPage from './ErrorBoundaryPage';

const initialResource = fetchData();

export default function SuspensePage() {
  const [resource, setResource] = useState(initialResource);
  const id = useId();

  return (
    <div>
      <h3>SuspensePage - {id}</h3>
      <ErrorBoundaryPage fallback={<h1>网络出错了</h1>}>
        <Suspense fallback={<h1>loading - user</h1>}>
          <User resource={resource} />
        </Suspense>
      </ErrorBoundaryPage>

      <Suspense fallback={<h1>loading-num</h1>}>
        <Num resource={resource} />
      </Suspense>

      <button onClick={() => setResource(fetchData())}>refresh</button>
    </div>
  );
}
