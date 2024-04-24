import { Select } from "antd";
import { Option } from "antd/es/mentions";

interface SelectSearch {
  data: Array<{id: number; name: string}>;
  value: number;
  setter: (value: number) => void;
  properties: React.ReactNode;
}

export const SelectSearch = ({data, setter, value}: SelectSearch) => {
  return (
    <Select onChange={(value) => setter(value)} value={value} >
      {data.map((item) => (
        <Option key={(item.id).toString()} value={item.name}>
          {item.name}
        </Option>
      ))}
    </Select>
  );
};
