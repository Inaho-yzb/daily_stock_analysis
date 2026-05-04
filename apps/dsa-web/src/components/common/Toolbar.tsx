import type React from 'react';
import { Flex } from 'antd';

interface ToolbarProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}

export const Toolbar: React.FC<ToolbarProps> = ({ left, right, className }) => (
  <Flex justify="space-between" align="center" className={className}>
    <div>{left}</div>
    <div>{right}</div>
  </Flex>
);
