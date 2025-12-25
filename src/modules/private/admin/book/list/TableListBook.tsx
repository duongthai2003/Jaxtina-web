import { useState } from 'react';
import { message, Modal, Pagination, PaginationProps, Table, Tooltip } from 'antd';
import { get } from 'lodash';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import LoadingPage from '@/components/Loading';
import { BaseTag } from '@/utils/baseTagHTML';
import { PATHS } from '@/routers/path';
import { themes } from '@/configs/theme';
import { FORMAT_DATE, LIMIT, ONE, SKIP } from '@/utils/constants';
import { BoxAction, BoxColumn, BoxRow, Text, Wrapper, WrapperTable } from '../style/styleBook';
import FilterBook from './FilterBook'
import { IFilterBook } from '@/modules/private/user/book/type';
import { useAllBookPagination, useDeleteBook } from '@/hooks/useBookQuery';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/utils/query';

const TableListBook = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient()
  const [filter, setFilter] = useState<IFilterBook>({
    page: SKIP,
    limit: LIMIT,
    search: '',
    bookId: undefined,
    sort:'asc'
  });
  const {deleteBook, status: deleteStatus} = useDeleteBook()
  const handleDelete = (record: any) => {
    const name = record?.name || '';
    const id = record?._id;
    if (!id) return;
    Modal.confirm({
      title: "Xóa sách",
      content: `Bạn có chắc chắn muốn xóa sách ${name} ?`,
      okText: 'Xóa',
      okButtonProps: {danger: true, loading: deleteStatus === 'pending'},
      cancelText: 'Hủy',
      onOk: async() => {
        try {
          await deleteBook(id);
          message.success('Xóa sách thành công');
          queryClient.invalidateQueries({queryKey: [queryKeys.private.manager.book_pagination], exact: false})
        } catch (error: any) {
          message.error(error?.response?.data?.message || 'Xóa sách thất bại')
          throw error;
        }
      }
    })
  }
  const [page, setPage] = useState(ONE);

  const { data: dataBook, isLoading } = useAllBookPagination(
    filter.page,
    filter.limit,
    filter.search,
    filter.bookId
  );


  const columns: ColumnsType<any> = [
    {
      title: 'Tên sách',
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
        title: 'Mã sách',
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
                    navigate(PATHS.private.admin.book.bookDetail(id));
                  }}
                  style={{ color: themes.$tw_sky_600, cursor: 'pointer', fontSize: '20px' }}
                >
                  Sửa
                </EditOutlined>
              </Tooltip>
              <Tooltip title="Xóa" placement="top">
                <DeleteOutlined
                  onClick={() => {
                    handleDelete(record)
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
      <FilterBook filter={filter} handleFilter={handleFilter} />

      <WrapperTable>
        <Table
          rowKey={'_id'}
          columns={columns}
          showHeader={true}
          dataSource={get(dataBook, 'data', [])}
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
        {dataBook && dataBook.data && dataBook.data.length > 0 && (
          <Pagination
            current={page}
            pageSize={get(dataBook, 'limit', LIMIT)}
            total={get(dataBook, 'total', 0)}
            onChange={onPageChange}
            showSizeChanger={false}
            style={{ display: 'flex', justifyContent: 'center' }}
          />
        )}
      </WrapperTable>
    </Wrapper>
  );
};

export default TableListBook