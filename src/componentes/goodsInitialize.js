import React, { useEffect, useState } from 'react'
import { Modal, Tag, AutoComplete, Input } from 'antd';
const { Option, OptGroup } = AutoComplete;



const GoodsInitialize = (props) => {

  const [nameInfos, setNameInfos] = useState([])
  const [channelNames, setChannelNames] = useState([])
  const [schoolNames, setSchoolNames] = useState([])
  const [groupNames, setGroupNames] = useState([])
  const [selectedChannel, setSelectedChannel] = useState([])
  const [selectedGroup, setSelectedGroup] = useState([])

  const fetchName = () => {
    fetch(`http://ethles.com/api/goods/category`)
      .then(res => res.json())
      .then(data => {
        setNameInfos(data);
        setGroupNames(data.filter(cur => cur.group_name && true));
      })
      .then( 
        fetch(`http://ethles.com/api/name/school`)
          .then(res => res.json())
          .then(data => setSchoolNames(
            data.map(cur => {
              return cur;
            })
          ))
      )
      .then( 
        fetch(`http://ethles.com/api/name/channel`)
          .then(res => res.json())
          .then(data => setChannelNames(
            data.map(cur => {
              return cur;
            })
          ))
      ).catch(err => {
        console.error(err)
      })
  }

  useEffect(() => {
    fetchName()
  }, [])


  const options = (
    [
      <OptGroup key={'channel'} label={'渠道'}>
        {channelNames
          .map((cur) => {
            return (
              <Option key={`channel:${cur.id}:${cur.name}`} value={`channel:${cur.id}:${cur.name}`}>
                {`${cur.name}`}
              </Option>
            )
          })
        }
      </OptGroup>
      ,
      <OptGroup key={'school'} label={'学校'}>
        {schoolNames
          .map((cur) => {
            return (
              <Option key={`school:${cur.id}:${cur.name}`} value={`school:${cur.id}:${cur.name}`}>
                {`${cur.name}`}
              </Option>
            )
          })
        }
      </OptGroup>
      ,
      <OptGroup key={'group'} label={'班级'}>
        {groupNames
          .map(cur => {
            return (
              <Option key={`group:${cur.group_id}:${cur.school_name}-${cur.group_name}`} value={`group:${cur.group_id}:${cur.school_name}:${cur.group_name}`}>
                {`${cur.school_name}-${cur.group_name}`}
              </Option>
            )
          })
        }
      </OptGroup>
    ]
  )

  const handleChannelClose = (id) => {
    setSelectedChannel(selectedChannel.filter(cur => cur.id !== id))
  }

  const handleGroupClose = (id) => {
    setSelectedGroup(selectedGroup.filter(cur => cur.id !== id))
  }

  const renderChannelTags = () => {
    return selectedChannel.map(cur => {
      return <Tag closable onClose={(e) => { e.preventDefault(); handleChannelClose(cur.id) }} key={cur.id} color="volcano">{cur.name}</Tag>
    })
  }

  const renderGroupTags = () => {
    return selectedGroup.map((cur, idx) => {
      return <Tag closable onClose={(e) => { e.preventDefault(); handleGroupClose(cur.id) }} key={cur.id} color="green">{cur.name}</Tag>
    })
  }

  const handleOnSelect = (value, option) => {
    const s = value.split(':')
    switch (s[0]) {
      case 'channel':
        if (selectedChannel.some(e => e.id === s[1])) {
          return;
        }
        setSelectedChannel([...selectedChannel, {
          id: s[1],
          name: s[2],
        }])
        break;

      case 'school':
        const allClass = nameInfos.filter(cur => cur.school_id === parseInt(s[1]))
        let waitAdd = [];
        allClass.forEach((cur) => {
          if (selectedGroup.some(e => e.id === cur.group_id)) {
            return;
          }
          waitAdd.push({
            id: cur.group_id,
            name: `${cur.school_name}-${cur.group_name}`,
          })
        })
        setSelectedGroup([...selectedGroup, ...waitAdd])
        break;

      case 'group':
        if (selectedGroup.some(e => e.id === parseInt(s[1]))) {
          return;
        }
        setSelectedGroup([...selectedGroup, {
          id: s[1],
          name: `${s[2]}-${s[3]}`,
        }])
        break;

      default:
        break;
    }

  }

  const handleOnOk = () => {
    console.log('submit')
    let channelList = []
    let groupList = []
    for (const sc of selectedChannel) {
      channelList.push(sc.id)
    }
    for (const sc of selectedGroup) {
      groupList.push(sc.id)
    }

    console.log(`channelList is ${channelList}`)
    console.log(`groupList is ${groupList}`)

    const channelListString = channelList.join(',')
    const groupListString = groupList.join(',')



    for (const g of props.cartGoods) {
      console.log(g)
      fetch(`http://ethles.com/api/goods/batch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          template_id: g.id,
          channel: channelListString,
          group: groupListString
        })
      }).catch(err => {
        console.error(err)
      })
    }

    setTimeout()

  }


  return (
    <Modal
      title={null}
      visible={props.visible}
      onCancel={() => { setSelectedChannel([]); setSelectedGroup([]); props.handleOnCancel() }}
      cancelText='取消'
      okText='提交'
      onOk={() => { handleOnOk(); setSelectedChannel([]); setSelectedGroup([]); }}
    >
      <>
        <AutoComplete
          dataSource={options}
          style={{ width: 300, marginBottom: 10 }}
          placeholder="输入名称"
          onSelect={handleOnSelect}

        >
          <Input.Search />
        </AutoComplete>
        <br />
        {selectedChannel.length ? '已选渠道：' : ''}
        <br />
        {renderChannelTags()}
        <br />
        {selectedGroup.length ? '已选班级：' : ''}
        <br />
        {renderGroupTags()}
      </>
    </Modal>
  )
}
export default GoodsInitialize;