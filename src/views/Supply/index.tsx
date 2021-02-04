import {FC} from "react";
import {Card} from "antd";
import SupplyAction from "./SupplyAction";
type Props = {
  address?: string
}
const SupplyLay: FC<Props> = ({address}) => {
  return <Card title="Supply Action">
    <SupplyAction address={address} />
  </Card>
}

export default SupplyLay;
