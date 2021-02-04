import {FC, useEffect, useState} from "react";
import {Button, Card, Col, Row} from "antd";
import {approveCheck, pWing} from "../../../utils/tools";

type Props = {
  address?: string
}

const InsuranceAction: FC<Props> = ({address}) => {
  const [allowance, setAllowance] = useState<string>('')
  const [approveResult, setApproveResult] = useState<string>('')
  const [approveLoading, setApproveLoading] = useState<boolean>(false)
  const [insureLoading, setInsureLoading] = useState<boolean>(false)
  const [insureResult, setInsureResult] = useState<string>('')
  const [surrenderLoading, setSurrenderLoading] = useState<boolean>(false)
  const [surrenderResult, setSurrenderResult] = useState<string>('')

  const handlerInsure = () => {}
  const handlerSurrender = () => {}

  useEffect(() => {
    // console.log('address', address)
    if (address) {
      approveCheck(address, pWing.OToken, pWing.FToken, pWing.float).then(res => {
        // console.log('res', res)
        if (res.flag) {
          setAllowance(res.balance)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  return <Card title="Insurance">
    <Row>
      <Col span={12}>
        <Card size="small" title="insure">
          <Row>
            <Col span={12}>
              <Button type="primary" loading={approveLoading}>Approve</Button>
              <p>allowance: {allowance}</p>
              <p>
                {approveResult}
              </p>
            </Col>
            <Col span={12}>
              <Button type="primary" onClick={handlerInsure} loading={insureLoading}>Action</Button>
              <p>
                result: {insureResult}
              </p>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={12}>
        <Card size="small" title="surrender">
          <Button type="primary" loading={surrenderLoading} onClick={handlerSurrender}>Action</Button>
          <p>
            result: {surrenderResult}
          </p>
        </Card>
      </Col>
    </Row>
  </Card>
}

export default InsuranceAction;
