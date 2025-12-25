import { Col, Form, Input, Row, Image } from 'antd';
import SearchIcon from '@/assets/icons/search.svg';
import { BoxFind, BtnFind, RowForm, TextFind, WrapperFilter } from '../style/styleBook';

interface FilterBookProps {
  filter: {
    search?: string;
    id?: string;
  };
  handleFilter: (values: { search?: string; id?: string }) => void;
}
const FilterUser = (props: FilterBookProps) => {
  const { handleFilter, filter } = props;
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
      <WrapperFilter>
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
                    placeholder="Tên/ Mã"
                    onPressEnter={(e) => {
                      handleEnterPress(e, 'search');
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
      </WrapperFilter>
    </>
  );
};

export default FilterUser;
