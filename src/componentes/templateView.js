import React from 'react'
import { List, Avatar, Row, Col, Button, Icon, Badge } from 'antd';

export default function (props) {
  console.log(props.sub1)
  return (
    <div style={{ paddingLeft: 10 }}>
      <Row>
        <Col span={6}>

          <List
            header={<><Icon type="flag" /> 当前活动模版</>}
            itemLayout="horizontal"
            dataSource={props.templates}
            style={{ background: 'white' }}
            bordered
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<Button type={'link'} onClick={() => { props.onClickTemplateName(item.proto_id) }} style={{ color: 'black' }}>{item.proto_name}</Button>}
                  description={item.proto_description}
                />
              </List.Item>
            )}
          />
        </Col>
        <Col span={1}></Col>
        {props.sub1 && props.sub1.length > 0 ? <Col span={6}>
          <List
            header={<><Icon type="link" /> 关联列表</>}
            itemLayout="horizontal"
            dataSource={props.sub1}
            bordered
            style={{ background: 'white' }}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<Button type={'link'} onClick={() => {
                    //只有存在二级列表的页面才可以点击，所以目前只有group页面可以点击。
                    if (props.onClickSub1Name) {
                      props.onClickSub1Name(item.school_id) //直接传递group特有的属性
                    }

                  }} style={{ color: 'black' }}>{item.available ? <Badge status="success" /> : <Badge status="default" />}{item.name}</Button>}
                />
                {item.available ? <Button type={'link'} icon='down-square' onClick={() => {
                  props.onClickSub1Btn(item.template_id, item.related_id)

                }}></Button> : <Button type={'link'} icon='up-square' onClick={() => {
                  props.onClickSub1Btn(item.template_id, item.related_id)
                }}></Button>}
              </List.Item>
            )}
          />
        </Col> : null}
        <Col span={1}></Col>
        {props.sub2 && props.sub2.length > 0 ? <Col span={6}>
          <List
            header={<><Icon type="link" /> 关联子列表</>}
            itemLayout="horizontal"
            dataSource={props.sub2}
            style={{ background: 'white' }}
            bordered
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<Button type={'link'} style={{ color: 'black' }}>{item.available ? <Badge status="success" /> : <Badge status="default" />}{item.name2}</Button>}
                  description={item.proto_description}
                />
                {item.available ? <Button type={'link'} icon='down-square' onClick={() => {
                  props.onClickSub2Btn(item.template_id, item.related_id)
                }}></Button> : <Button type={'link'} icon='up-square' onClick={() => {
                  props.onClickSub2Btn(item.template_id, item.related_id)
                }}></Button>}
              </List.Item>
            )}
          />
        </Col> : null}
      </Row>

    </div>
  );
}
