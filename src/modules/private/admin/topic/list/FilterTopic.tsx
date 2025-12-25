import styled from 'styled-components';
import {useMemo } from 'react';
import { get } from 'lodash';
import { Col, Form, Input, Row, Select, Image } from 'antd';
import { useAllBook } from '@/hooks/useBookQuery';
import { removeVietnameseTones } from '@/utils/func/removeVietnameseTones';
import SearchIcon from '@/assets/icons/search.svg';
import { convertPixelToRem } from '@/utils/func/convertRem';
interface FilterTopicProps {
  filter: {
    search?: string;
    bookId?: string;
  };
  handleFilter: (values: { search?: string; bookId?: string }) => void;
}
const FilterUser = (props: FilterTopicProps) => {
  const { handleFilter, filter } = props;
  const { data: bookData } = useAllBook();

  const dataBookConvert = useMemo(() => {
    const result = get(bookData, 'data', []);
    const convertOption = result?.map((i: any) => {
      return {
        label: i.name,
        value: i._id || i.id,
      };
    });
    return convertOption;
  }, [bookData]);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const filteredObj: any = Object.fromEntries(
      Object.entries(values).filter(([_, value]) => value !== undefined && value !== null && value !== ''),
    );
  
    handleFilter({
      ...filteredObj,
    });
  };
  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>, key: string) => {
    const val = e.currentTarget.value;
    const values = form.getFieldsValue();
    handleFilter({
      ...values,
      [key]: val,
    });
  };
  return (
    <>
      <Wrapper>
        <Form
          form={form}
          initialValues={filter}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={30}>
            <Col xs={24} sm={24} md={24} lg={8} xl={6} xxl={6} span={6}>
              <Form.Item name={'search'}>
                <RowForm>
                  <Input
                    placeholder="Tên chủ đề"
                    onPressEnter={(e) => {
                      handleEnterPress(e, 'search');
                    }}
                  />
                </RowForm>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={8} xl={6} xxl={6} span={6}>
              <Form.Item name="bookId">
                <RowForm>
                  <Select
                    style={{ width: '100%' }}
                    options={dataBookConvert}
                    placeholder="Sách"
                    filterOption={(input, option) => {
                      if (typeof option?.label === 'string') {
                        const label = removeVietnameseTones(option.label).toLowerCase();
                        const search = removeVietnameseTones(input).toLowerCase();
                        return label.includes(search);
                      }
                      return false;
                    }}
                    onChange={(e) => {
                      form.setFieldValue('bookId', e);
                    }}
                  />
                </RowForm>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={8} xl={4} xxl={4} span={4}>
              <RowForm>
                <BoxFind>
                  <BtnFind
                    onClick={() => {
                      form.submit();
                    }}
                  >
                    <Image
                      style={{ marginLeft: '10px', width: '18px', height: '18px' }}
                      preview={false}
                      src={SearchIcon}
                    />
                    <TextFind>Tìm</TextFind>
                  </BtnFind>
                </BoxFind>
              </RowForm>
            </Col>
          </Row>
        </Form>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  background: ${(p) => p.theme.book.$background};
  box-shadow: 0 0 ${convertPixelToRem(10)} 0 rgba(0, 0, 0, 0.1);
  padding: ${convertPixelToRem(30)} ${convertPixelToRem(30)} 0 ${convertPixelToRem(30)};
  .ant-select-selection-item {
    font-size: ${convertPixelToRem(14)} !important;
  }
`;
const RowForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${convertPixelToRem(10)};
  .ant-picker {
    width: 100%;
  }
`;
const TextFind = styled.div`
  width: calc(100% - ${convertPixelToRem(30)});
  text-align: center;
`;
const BoxFind = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ${convertPixelToRem(2)} ${convertPixelToRem(8)} ${convertPixelToRem(2)} ${convertPixelToRem(4)};
  gap: ${convertPixelToRem(10)};
`;
const BtnFind = styled.div`
  width: ${convertPixelToRem(112)};
  border-radius: ${convertPixelToRem(8)};
  height: ${convertPixelToRem(31)};
  align-items: center;
  justify-content: flex-start;
  display: flex;
  background: ${(p) => p.theme.$tw_sky_600};
  color: ${(p) => p.theme.topic.title_color};
  gap: ${convertPixelToRem(10)};
  cursor: pointer;
`;
export default FilterUser;
