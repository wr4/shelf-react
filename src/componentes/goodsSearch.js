import { AutoComplete, Input } from 'antd';

const GoodsSearch = (props) => {

  return (
    <AutoComplete
      dataSource={props.dataSource}
      style={{ width: 200 }}
      onChange={props.handleChange}
      placeholder="输入商品名称"
    >
      <Input.Search onSearch={props.handleSearch} />
    </AutoComplete>
  );

}

export default GoodsSearch;
