import SessionsTable from './SessionsTable';
import SessionHeader from './SessionHeader';

const Sessions = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <SessionHeader />
      <SessionsTable />
    </div>
  );
};

export default Sessions;
