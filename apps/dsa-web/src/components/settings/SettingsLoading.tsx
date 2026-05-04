import type React from 'react';
import { Skeleton, Card } from 'antd';

export const SettingsLoading: React.FC = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index}>
          <Skeleton active paragraph={{ rows: 1 }} />
        </Card>
      ))}
    </div>
  );
};
