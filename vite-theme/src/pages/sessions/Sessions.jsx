import SessionsTable from './SessionsTable';
import SessionHeader from './SessionHeader';
import PaperBox from '@/components/PaperBox';

const Sessions = () => {
  return (
    <PaperBox sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <SessionHeader />
      <SessionsTable />
    </PaperBox>
  );
};

export default Sessions;
