import { useNavigate } from "react-router-dom";
import { icons, images } from "@/assets";
import { EX } from "@/modules/public/courses/exercise/style";
import { PATHS } from "@/routers/path";
import { BaseTag } from "@/utils/baseTagHTML";
import { Instruct, InstructTitle, InstructTitleImg, Wrapper } from "../practiceByGame/gameConnectWord/style"
import { InstructImg } from "../practiceByGame/gameFlipCard/style"
import Listening from "./Listening"

const ListenPractice = () => {
    const navigate = useNavigate()
    // const {id} =useParams()

    return (<Wrapper>
        <EX.header>
            <BaseTag.p>Thực hành nghe và nói</BaseTag.p>
            <EX.headerClose onClick={() => navigate(PATHS.private.user.comTopic())}>
                <EX.headerCloseIcon size={24} />
            </EX.headerClose>
        </EX.header>
        <EX.content>
            <Instruct>
            <InstructImg src={images.jaxDang6} alt="instruction" />
            <InstructTitle>
                <BaseTag.p>Nhớ chạm vào các từ được gạch chân để xem nghĩa tiếng Việt là gì nha!</BaseTag.p>
                <InstructTitleImg src={icons.messVector} alt="" />
            </InstructTitle>
        </Instruct>
        <Listening/>
        </EX.content>
        <EX.footer>
            <EX.buttonCancel title="Trở lại" />
            <EX.buttonSubmit title="Kiểm tra" />
        </EX.footer>
    </Wrapper>)
}
export default ListenPractice