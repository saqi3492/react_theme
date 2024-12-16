import { useEffect } from 'react';
import { fetchSessionData } from './SessionsApiCalls';
import SessionsTable from './SessionsTable';
import SessionHeader from './SessionHeader';
import { useSelector } from 'react-redux';

const Sessions = () => {
  const rowData = useSelector(state => state.Session.sessions);

  useEffect(() => {
    fetchSessionData();
  }, []);

  return (
    <>
      <SessionHeader />
      <SessionsTable rowData={rowData} />
    </>
  );
};

export default Sessions;
