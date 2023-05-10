import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const AddressInput = () => {
  const handleSearch = () => {
    // Implement your address search logic here
  };

  return (
    <Input
      type="text"
      placeholder="Enter an address"
      allowClear
      suffix={<Button icon={<SearchOutlined />} onClick={handleSearch} />}
    />
  );
};

export default AddressInput;
