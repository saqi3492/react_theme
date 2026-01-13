import { fetchTraining } from './TrainingApiCalls';
import { AgGridReact } from 'ag-grid-react';
import { defaultColDef, TrainingColDefs } from '@/utils/constants';
import ActionRenderer from './ActionRenderer.jsx';
import { useQuery } from '@tanstack/react-query';

const renderers = { ActionRenderer };

const TrainingTable = () => {
  const { data: Trainings = [], isLoading } = useQuery({
    queryKey: ['trainings'],
    queryFn: () => fetchTraining(),
  });

  return (
    <div style={{ flex: 1 }}>
      <AgGridReact
        loading={isLoading}
        rowData={Trainings}
        columnDefs={TrainingColDefs}
        defaultColDef={defaultColDef}
        components={renderers}
      />
    </div>
  );
};

export default TrainingTable;
