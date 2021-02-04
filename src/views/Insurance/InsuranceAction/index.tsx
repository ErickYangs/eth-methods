import {FC, useEffect, useState} from "react";
import {Button, Card, Col, message, Row} from "antd";
import {
  approveAction,
  approveCheck,
  pWing,
  findAbiParamter,
  sendETHTransaction,
  tokenDemo1
} from "../../../utils/tools";
import AbiJson from '../../../utils/IErc20Delegator.json'
import {insureAbi, supplyAbi} from "../../../utils/abi";
import {getAmount} from "../../../utils/count";
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

  const handlerApprove = async () => {
    try {
      setApproveLoading(true)
      let result = await approveAction(address, pWing.OToken, pWing.IToken, pWing.float)
      setApproveLoading(false)
      console.log('result', result)
      setApproveResult(JSON.stringify(result));
      if (result.tx.transactionHash) {
        message.success('Approve 成功')
      } else {
        message.error('Approve 失败')
      }
    } catch (e) {
      setApproveLoading(false)
      console.log(e)
    }
  }
  const handlerInsure = async () => {
    try {
      setInsureLoading(true)
      let result = await sendETHTransaction(address, pWing.IToken, JSON.parse(insureAbi), [getAmount(0.1, pWing.float)])
      setInsureLoading(false)
      setInsureResult(JSON.stringify(result))
    } catch (e) {
      setInsureLoading(false)
      console.log(e)
    }
  }
  const handlerSurrender = () => {}

  useEffect(() => {
    console.log('address', address)
    if (address) {
      approveCheck(address, pWing.OToken, pWing.IToken, pWing.float).then(res => {
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
              <Button type="primary" onClick={handlerApprove} loading={approveLoading}>Approve</Button>
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
