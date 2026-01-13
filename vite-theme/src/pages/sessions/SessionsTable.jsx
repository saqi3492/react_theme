import { useEffect } from 'react';
import { fetchSessions } from './SessionsApiCalls';
import { AgGridReact } from 'ag-grid-react';
import { defaultColDef, sessionsColDefs } from '@/utils/constants';
import ActionRenderer from './ActionRenderer';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setSessionsAction } from '@/store/reducers/sessionSlice';
import { useQuery } from '@tanstack/react-query';

const renderers = { ActionRenderer };

const SessionsTable = () => {
  const dispatch = useDispatch();
  const searchText = useSelector(state => state.Session.searchSessionText);
  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ['sessions', searchText],
    queryFn: () => fetchSessions(searchText),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    dispatch(setSessionsAction(sessions));
  }, [dispatch, sessions]);

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
