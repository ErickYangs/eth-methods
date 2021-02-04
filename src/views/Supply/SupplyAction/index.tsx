import { FC, useEffect, useState } from "react";
import { Card, Row, Col, Button, message } from "antd";
import { approveAction, approveCheck, tokenDemo1, sendETHTransaction, findAbiParamter, tokenDemo2 } from "../../../utils/tools";
import AbiJson from '../../../utils/CErc20Delegator.json'
import { getAmount } from "../../../utils/count";
import { supplyAbi, withDrawAbi } from "../../../utils/abi";

type Props = {
  address?: string
}

const SupplyAction: FC<Props> = ({ address }) => {
  const [allowance, setAllowance] = useState<string>('')
  const [approveResult, setApproveResult] = useState<string>('')
  const [approveLoading, setApproveLoading] = useState<boolean>(false)
  const [supplyLoading, setSupplyLoading] = useState<boolean>(false)
  const [supplyResult, setSupplyResult] = useState<string>('')
  const [withdrawLoading, setWithdrawLoading] = useState<boolean>(false)
  const [withdrawResult, setWithdrawResult] = useState<string>('')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // console.log('address', address)
    if (address) {
      approveCheck(address, tokenDemo1.OToken, tokenDemo1.FToken).then(res => {
        // console.log('res', res)
        if (res.flag) {
          setAllowance(res.balance)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  const handlerApprove = async () => {
    try {
      setApproveLoading(true)
      let result = await approveAction(address, tokenDemo1.OToken, tokenDemo1.FToken)
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

  const handlerSupply = async () => {
    try {
      setSupplyLoading(true)
      let result = await sendETHTransaction(address, tokenDemo1.FToken, JSON.parse(supplyAbi), [getAmount(0.1, tokenDemo1.float)])
      console.log(result)
      setSupplyResult(JSON.stringify(result))
      setSupplyLoading(false)
    } catch (e) {
      setSupplyLoading(false)
      console.log(e)
    }
  }
  const handlerWithdraw = async () => {
    try {
      setWithdrawLoading(true)
      let result = await sendETHTransaction(address, tokenDemo1.FToken, JSON.parse(withDrawAbi), [getAmount(0.1, tokenDemo1.float)])
      console.log(result)
      setSupplyResult(JSON.stringify(result))
      setWithdrawLoading(false)
    } catch (e) {
      setWithdrawLoading(false)
      console.log(e)
    }
  }

  return <Card title="Supply">
    <Row>
      <Col span={12}>
        <Card size="small" title="supply">
          <Row>
            <Col span={12}>
              <Button loading={approveLoading} onClick={handlerApprove} type="primary">Approve</Button>
              <p>allowance: {allowance}</p>
              <p>
                {approveResult}
              </p>
            </Col>
            <Col span={12}>
              <Button type="primary" onClick={handlerSupply} loading={supplyLoading}>Action</Button>
              <p>
                result: {supplyResult}
              </p>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={12}>
        <Card size="small" title="withdraw">
          <Button type="primary" loading={withdrawLoading} onClick={handlerWithdraw}>Action</Button>
          <p>
            result: {withdrawResult}
          </p>
        </Card>
      </Col>
    </Row>
  </Card>
}

export default SupplyAction;
