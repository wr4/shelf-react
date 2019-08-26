import React from 'react'
import { Button, Icon, List, Badge } from 'antd';


const GoodsCart = (props) => {

  const header = (
    <div><Icon type="container" theme="twoTone" /> 已选模版<Badge count={props.goods.length} style={{ backgroundColor: '#fff', color: '#999', marginLeft: 2 }} /></div>
  )

  const footer = (
    <div><Button
      size='small'
      onClick={props.handleClickCreateBtn}
      disabled={props.goods.length > 0 ? false : true}
    >{props.goods.length > 1 ? '批量' : ''}创建商品</Button></div>
  )

  return (
    <>
      <List
        style={{ background: 'white' }}
        header={header}
        footer={footer}
        bordered
        dataSource={props.goods}
        renderItem={item => (
          <>
            <List.Item>
              <>{item.subject}</>
              <Button type='link' icon='delete' onClick={() => { props.handleClickDelete(item) }} style={{ position: 'absolute', right: 0 }}></Button>
            </List.Item>
          </>

        )}
      />
    </>
  )
}

export default GoodsCart;