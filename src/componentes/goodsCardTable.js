import React, { useState } from 'react'
import { Card, Button, Modal, Icon, List } from 'antd';


const GoodsCardTable = (props) => {

  const [visible, setVisible] = useState(false)
  const [popGoodsInfo, setPopGoodsInfo] = useState({})

  const handleOk = e => {
    setVisible(false)
  };

  const handleCancel = e => {
    setVisible(false)
  };

  const genCard = (goods) => {

    const handleClickTitle = (value) => {
      setPopGoodsInfo(goods)
      setVisible(true)
    }

    const cardTitle = (
      <Button onClick={handleClickTitle} type="link" style={{ color: 'black' }}>{goods.subject}</Button>
    )

    const cardExtras = (
      <>
        <Button type="link" shape="circle" icon="plus" size='small' onClick={() => { props.handleClickAdd(goods) }} />
      </>
    )

    return (
      <Card title={cardTitle} extra={cardExtras} style={{ marginBottom: 30, width: 300, height: 180 }}>
        {goods.body}
        <br />
        <Icon type="dollar" theme="twoTone" style={{ marginRight: 6 }} />{goods.origin_price} 元
        <Icon type="dashboard" theme="twoTone" style={{ marginLeft: 10, marginRight: 6 }} />{goods.duration / 24 / 60 / 60} 天
        </Card>
    )
  }

  return (
    <>
      <List
        grid={{ gutter: 8, column: 3 }}
        dataSource={props.goods}
        renderItem={item => (
          <List.Item>
            {genCard(item)}
          </List.Item>
        )}
      />

      <Modal
        visible={visible}
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        序号：{popGoodsInfo.id}
        <br />
        标题：{popGoodsInfo.subject}
        <br />
        内容：{popGoodsInfo.body}
        <br />
        原价：{popGoodsInfo.origin_price}
        <br />
        时长：{popGoodsInfo.duration}
        <hr />
        我是备注，我是备注，我是备注，我是备注，我是备注，我是备注，
        我是备注，我是备注，我是备注，我是备注，我是备注，我是备注，
        我是备注，我是备注，我是备注，我是备注，我是备注，我是备注。

      </Modal>
    </>
  )
}

export default GoodsCardTable