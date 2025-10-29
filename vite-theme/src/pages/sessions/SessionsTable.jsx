import { useEffect, useState } from 'react';
import { fetchSessions } from './SessionsApiCalls';
import { AgGridReact } from 'ag-grid-react';
import { defaultColDef, sessionsColDefs } from '@/utils/constants';
import ActionRenderer from './ActionRenderer';
import { useSelector } from 'react-redux';

const renderers = { ActionRenderer };

const SessionsTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const sessions = useSelector(state => state.Session.sessions);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await fetchSessions();
      setIsLoading(false);
    })();
  }, []);

  return (
    <div style={{ flex: 1 }}>
      <AgGridReact
        loading={isLoading}
        rowData={sessions}
        columnDefs={sessionsColDefs}
        defaultColDef={defaultColDef}
        components={renderers}
      />
    </div>
  );
};

export default SessionsTable;
