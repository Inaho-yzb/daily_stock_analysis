import type React from 'react';
import { Pagination as AntdPagination } from 'antd';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  if (totalPages <= 1) return null;

  return (
    <AntdPagination
      current={currentPage}
      total={totalPages * 10}
      pageSize={10}
      onChange={onPageChange}
      className={className}
      showSizeChanger={false}
    />
  );
};
