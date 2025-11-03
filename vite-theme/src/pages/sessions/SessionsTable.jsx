import { defaultColDef, sessionsColDefs } from '@/utils/constants';
import { useQuery } from '@tanstack/react-query';
import { AgGridReact } from 'ag-grid-react';
import { useSelector } from 'react-redux';
import ActionRenderer from './ActionRenderer';
import { fetchSessions } from './SessionsApiCalls';
const renderers = { ActionRenderer };

const SessionsTable = () => {
  const searchText = useSelector(state => state.Session.searchSessionText);
  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ['sessions', searchText],
    queryFn: () => fetchSessions(searchText),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

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
