import { useAppSelector } from '@/store/store';
import { ThreeDots } from 'react-loader-spinner';

export const TimTimLoader = () => {
  const beatLoader = useAppSelector(state => state.alerts.beatLoader);

  return beatLoader ? (
    <div className="fixed left-0 right-0 top-16 z-50 flex justify-center bg-background/80 py-4 backdrop-blur-sm">
      <ThreeDots
        visible={true}
        height="60"
        width="60"
        color="#2563eb"
        radius="9"
        ariaLabel="three-dots-loading"
      />
    </div>
  ) : null;
};

export default TimTimLoader;
