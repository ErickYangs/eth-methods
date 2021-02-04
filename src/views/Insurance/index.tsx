import {FC} from "react";
import {Card} from "antd";
import InsuranceAction from "./InsuranceAction";

type Props = {
  address?: string
}

const InsuranceLay: FC<Props> = ({address}) => {
  return <Card title="Insurance Action">
    <InsuranceAction address={address} />
  </Card>
}

export default InsuranceLay;
