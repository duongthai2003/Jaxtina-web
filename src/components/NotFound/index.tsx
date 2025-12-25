import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import Button from '@/components/Login/Button'
import { PATHS } from '@/routers/path'
import { convertPixelToRem } from '@/utils/func/convertRem'

const NotFound = () => {
  const navigate = useNavigate()

  const handleBackHome = () => {
    navigate(PATHS.public.home())
  }

  return (
    <Wrapper>
      <Content>
        <ErrorCode>404</ErrorCode>
        <Title>Không tìm thấy trang</Title>
        <Description>
          Xin lỗi, chúng tôi không tìm thấy trang mà bạn cần!
        </Description>
        <Button title="Về trang chủ" onClick={handleBackHome} />
      </Content>
    </Wrapper>
  )
}

export default NotFound

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.$bg_white || props.theme.$tw_white};
  padding: ${convertPixelToRem(24)};
  transition: background-color 0.3s ease;
`

const Content = styled.div`
  max-width: ${convertPixelToRem(480)};
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${convertPixelToRem(16)};
`

const ErrorCode = styled.h1`
  font-size: ${convertPixelToRem(96)};
  font-weight: 700;
  margin: 0;
  color: ${(props) => props.theme.$tw_stone_700 || props.theme.$tw_black};
  transition: color 0.3s ease;
`

const Title = styled.h2`
  font-size: ${convertPixelToRem(28)};
  margin: 0;
  color: ${(props) => props.theme.$tw_stone_600 || props.theme.$tw_black};
  transition: color 0.3s ease;
`

const Description = styled.p`
  font-size: ${convertPixelToRem(16)};
  margin: 0;
  color: ${(props) => props.theme.$tw_gray_400 || props.theme.$tw_stone_400};
  transition: color 0.3s ease;
`
