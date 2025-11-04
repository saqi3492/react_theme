import TrainingHeader from './TrainingHeader';
import TrainingTable from './TrainingTable';

const Training = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TrainingHeader />
      <TrainingTable />
    </div>
  );
};

export default Training;
