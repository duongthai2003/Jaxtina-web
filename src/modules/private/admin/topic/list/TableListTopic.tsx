import { useState } from 'react';
import { Pagination, PaginationProps, Table, Tooltip, Modal, message } from 'antd';
import { get } from 'lodash';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
import styled from 'styled-components';
import dayjs from 'dayjs';
import LoadingPage from '@/components/Loading';
import { useDeleteTopic, useGetTopicsPaging } from '@/hooks/useTopic';
import { convertPixelToRem } from '@/utils/func/convertRem';
import { BaseTag } from '@/utils/baseTagHTML';
import { PATHS } from '@/routers/path';
import { themes } from '@/configs/theme';
import { IFilterTopic } from '@/utils/type';
import { FORMAT_DATE, LIMIT, ONE, SKIP } from '@/utils/constants';
import { queryKeys } from '@/utils/query';
import { useQueryClient } from '@tanstack/react-query';
import FilterUser from './FilterTopic';

const TableListTopic = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<IFilterTopic>({
    page: SKIP,
    limit: LIMIT,
    search: '',
    bookId: undefined,
    sort:'asc'
  });
  const [page, setPage] = useState(ONE);

  const { data: dataTopic, isLoading } = useGetTopicsPaging(
    filter.page,
    filter.limit,
    filter.search,
    filter.bookId
  );
  const { deleteTopic, status: deleteStatus } = useDeleteTopic();

  const handleDelete = (record: any) => {
    const name = record?.name || '';
    const id = record?._id;
    if (!id) return;

    Modal.confirm({
      title: 'Xóa chủ đề',
      content: `Bạn có chắc chắn muốn xóa chủ đề ${name} ?`,
      okText: 'Xóa',
      okButtonProps: { danger: true, loading: deleteStatus === 'pending' },
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          await deleteTopic(id);
          message.success('Xóa chủ đề thành công');
          queryClient.invalidateQueries({ queryKey: [queryKeys.private.manager.topic_pagination], exact: false });
        } catch (error: any) {
          message.error(error?.response?.data?.message || 'Xóa chủ đề thất bại');
          throw error;
        }
      },
    });
  };


  const columns: ColumnsType<any> = [
    {
      title: 'Tên chủ đề',
      dataIndex: 'name',
      align: 'left',
      render(value: any) {
        return (
          <BoxColumn>
            <Text>{value}</Text>
          </BoxColumn>
        );
      },
      width: '10%',
    },
    {
        title: 'Mã chủ đề',
        dataIndex: 'code',
        align: 'left',
        render(value: any) {
          return (
            <BoxColumn>
              <Text>{value}</Text>
            </BoxColumn>
          );
        },
        width: '10%',
    },
    {
        title: 'Tên sách',
        dataIndex: 'bookName',
        align: 'left',
        render(value: any) {
          return (
            <BoxColumn>
              <Text>{value}</Text>
            </BoxColumn>
          );
        },
        width: '10%',
    },
    {
        title: 'Mô tả',
        dataIndex: 'description',
        align: 'left',
        render(value: any) {
          return (
            <BoxColumn>
              <Text>{value}</Text>
            </BoxColumn>
          );
        },
        width: '10%',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      align: 'left',
      width: '15%',
      render(value: any) {
        const str = dayjs(value).format(FORMAT_DATE.DATE);

        return (
          <BoxColumn>
            <Text>{str ? str : '-'}</Text>
          </BoxColumn>
        );
      },
    },
    {
      title: 'Hành động',
      dataIndex: '_id',
      align: 'left',
      width: '15%',
      render: (_, record: any) => {
        const id = record?._id;
        return (
          <BoxRow>
            <BoxAction>
              <Tooltip title="Sửa" placement="top">
                <EditOutlined
                  onClick={() => {
                    navigate(PATHS.private.admin.topic.detail(id));
                  }}
                  style={{ color: themes.$tw_sky_600, cursor: 'pointer', fontSize: '20px' }}
                >
                  Sửa
                </EditOutlined>
              </Tooltip>
              <Tooltip title="Xóa" placement="top">
                <DeleteOutlined
                  onClick={() => {
                    handleDelete(record);
                  }}
                  style={{ color: themes.$tw_red_600, cursor: 'pointer', fontSize: '20px' }}
                >
                 Xóa
                </DeleteOutlined>
              </Tooltip>
            </BoxAction>
          </BoxRow>
        );
      },
    },
  ];
  const onPageChange: PaginationProps['onChange'] = (current) => {
    setPage(current);
    setFilter({ ...filter, page: current });
  };
  const handleFilter = (values: any) => {
    setPage(ONE);

    setFilter((prev: any) => {
      return { ...prev, ...values, page: ONE };
    });
  };
  return (
    <Wrapper>
      <FilterUser filter={filter} handleFilter={handleFilter} />

      <WrapperTable>
        <Table
          rowKey={'_id'}
          columns={columns}
          showHeader={true}
          dataSource={get(dataTopic, 'data', [])}
          pagination={false}
          loading={{
            indicator: (
              <BaseTag.div>
                <LoadingPage />
              </BaseTag.div>
            ),
            spinning: isLoading,
          }}
          className="admins-table"
        />
        {dataTopic && dataTopic.data && dataTopic.data.length > 0 && (
          <Pagination
            current={page}
            pageSize={get(dataTopic, 'limit', LIMIT)}
            total={get(dataTopic, 'total', 0)}
            onChange={onPageChange}
            showSizeChanger={false}
            style={{ display: 'flex', justifyContent: 'center' }}
          />
        )}
      </WrapperTable>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  background: ${(p) => p.theme.topic.table_bg};
  .ant-pagination-options {
    display: none !important;
  }
  .ant-pagination .ant-pagination-item {
    border: none;
  }
  .ant-pagination {
    background: ${(p) => p.theme.topic.table_bg};
    margin: 0 !important;
    padding: ${convertPixelToRem(20)} 0;
  }
`;
const WrapperTable = styled.div`
  .ant-table-content {
    table {
      /* height: ${convertPixelToRem(700)}; */
    }
  }
  .ant-table-wrapper {
    background: ${(p) => p.theme.topic.table_bg};

    scrollbar-color: ${(p) => p.theme.topic.table_border} ${(p) => p.theme.topic.table_bg};
    &::-webkit-scrollbar {
      height: ${convertPixelToRem(8)};
      width: ${convertPixelToRem(8)};
      background: ${(p) => p.theme.topic.table_bg};
    }
    &::-webkit-scrollbar-track {
      background: ${(p) => p.theme.topic.table_bg};
    }
    &::-webkit-scrollbar-thumb {
      background: ${(p) => p.theme.topic.table_border};
      border-radius: ${convertPixelToRem(4)};
    }

    .ant-table-container,
    .ant-table-content,
    .ant-table-body {
      background: ${(p) => p.theme.topic.table_bg};
    }

    .ant-spin {
      height: ${convertPixelToRem(700)};
      max-height: ${convertPixelToRem(700)};
    }
  }
  .ant-table {
    background: ${(p) => p.theme.topic.table_bg};
  }
  .ant-table-thead > tr > th {
    background: ${(p) => p.theme.topic.table_header_bg} !important;
    color: ${(p) => p.theme.topic.table_text};
    border-color: ${(p) => p.theme.topic.table_border};
  }
  .ant-table-tbody > tr > td {
    background: ${(p) => p.theme.topic.table_bg};
    color: ${(p) => p.theme.topic.table_text_secondary};
    border-color: ${(p) => p.theme.topic.table_border};
  }
  .ant-table-tbody > tr:hover > td {
    background: ${(p) => p.theme.topic.table_row_hover} !important;
  }
  .ant-table-placeholder {
    background: ${(p) => p.theme.topic.table_empty_bg};
  }
`;
const Text = styled.div`
  font-size: ${convertPixelToRem(15)};
  font-weight: 400;
  line-height: ${convertPixelToRem(18)};
  letter-spacing: ${convertPixelToRem(0.8)};
  color: ${(p) => p.theme.topic.table_text_secondary};
`;
const BoxAction = styled.div`
  display: flex;
  gap: ${convertPixelToRem(10)};
`;
const BoxColumn = styled.div`
  display: flex;
  flex-direction: column;
`;
const BoxRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${convertPixelToRem(10)};
  align-items: center;
`;

export default TableListTopic;
