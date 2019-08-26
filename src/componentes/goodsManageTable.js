import React, { useState } from 'react'
import { Table, Input, Icon, Tag, AutoComplete } from 'antd';
import Link from 'umi/link'

const GoodsManageTable = (props) => {

    const [searchText, setSearchText] = useState('')

    const [selectedName, setSelectedName] = useState({ school: '', group: '', channel: '' })


    let searchInput;

    // const getColumnSearchProps = (dataIndex) => ({
    //     filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    //         <div style={{ padding: 8 }}>
    //             <Input
    //                 ref={node => {
    //                     searchInput = node;
    //                 }}
    //                 placeholder={`Search ${dataIndex}`}
    //                 value={selectedKeys[0]}
    //                 onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
    //                 onPressEnter={() => handleSearch(selectedKeys, confirm)}
    //                 style={{ width: 188, marginBottom: 8, display: 'block' }}
    //             />
    //             <Button
    //                 type="primary"
    //                 onClick={() => handleSearch(selectedKeys, confirm)}
    //                 icon="search"
    //                 size="small"
    //                 style={{ width: 90, marginRight: 8 }}>Search
    //             </Button>
    //             <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>Reset
    //             </Button>
    //         </div>
    //     ),
    //     filterIcon: filtered => (
    //         <Icon type="search" />
    //     ),
    //     onFilter: (value, record) =>
    //         record[dataIndex]
    //             .toString()
    //             .toLowerCase()
    //             .includes(value.toLowerCase()),
    //     onFilterDropdownVisibleChange: visible => {
    //         if (visible) {
    //             setTimeout(() => searchInput.select());
    //         }
    //     },
    //     render: text => (
    //         <p>{text}</p>
    //     ),
    // });

    // const handleSearch = (selectedKeys, confirm) => {
    //     confirm();
    //     setSearchText(selectedKeys[0]);
    // };

    // const handleReset = clearFilters => {
    //     clearFilters();
    //     setSearchText('')
    // };


    const handleClickAvailable = (id, available) => {
        fetch(`http://ethles.com/api/goods/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ available: available }),
        }
        )
            .then(res => {
                if (res.status >= 200 && res.status < 300) {
                    return res;
                } else {
                    const error = new Error(res.statusText);
                    error.res = res;
                    throw error;
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.data === 0) {
                    //
                }
            })
            .catch(err => {
                console.error(err)
            })
    }

    const columns = [
        {
            title: '商品标题',
            dataIndex: 'subject',
            key: 'subject',
            width: '15%',
            // ...getColumnSearchProps('subject'),
        },
        {
            title: '商品描述',
            dataIndex: 'body',
            key: 'body',
            width: '30%',
            // ...getColumnSearchProps('body'),
        },
        {
            title: props.type === 2 ? '渠道' : '班级',
            width: '15%',
            render: (dumb = undefined, record) => {
                if (props.type === 2) {
                    return (
                        <>
                            <Tag>
                                {record.channel_name}
                            </Tag>

                        </>
                    )
                } else if (props.type === 3) { // props.type === 3 
                    return (
                        <>
                            <Tag>{record.school_name ? `${record.school_name}-${record.group_name}` : `未指定`}

                            </Tag>

                        </>
                    )
                }

            }
        },
        {
            title: '操作',
            width: '15%',
            dataIndex: 'related_type',
            render: (related_type, record) => (
                <span>
                    <Link to={`/goods/${record.id}/edit`} ><Icon type="edit" theme="twoTone" /></Link>

                    <a href="javascript:;" onClick={() => handleClickAvailable(record.id, record.available ^ 1)}>{record.available === 1 ? <Icon style={{ marginLeft: 10 }} type="down-square" theme="twoTone" /> : <Icon style={{ marginLeft: 10 }} type="up-square" theme="twoTone" />}</a>
                </span>
            )
        },

    ];

    const handleBlur = () => {
        if (props.type) { //从商品模版界面进来才有相应（暂时）
            if (selectedName.channel !== '') {
                //更新规则：渠道
                props.UpdateDataByChannelFilter(selectedName.channel)
            } else {
                //更新规则：学校+班级
                props.UpdateDataByGroupFilter(selectedName.school, selectedName.group)
            }
        }

    }

    const handlechangeChannel = (value) => {
        setSelectedName(pre => {
            pre.channel = value
            return pre
        })
    }

    const handleChangeGroup = (value) => {
        setSelectedName(pre => {
            pre.group = value
            return pre
        })
    }

    const handleChangeSchool = (value) => {
        setSelectedName(pre => {
            pre.school = value
            return pre
        })
    }

    const genFilter = () => {
        if (props.type === 2) {
            return (
                <>
                    <AutoComplete
                        style={{ width: 200, marginRight: 10 }}
                        dataSource={props.channelNames}
                        placeholder="渠道"
                        filterOption={(inputValue, option) =>
                            option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                        onChange={handlechangeChannel}
                        onBlur={handleBlur}

                    >
                        <Input suffix={<Icon type="down" />} />
                    </AutoComplete>
                </>
            )
        } else { //props.type === 3
            return (
                <>
                    <AutoComplete
                        style={{ width: 200, marginRight: 10 }}
                        dataSource={props.schoolNames}
                        placeholder="学校"
                        filterOption={(inputValue, option) =>
                            option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                        onChange={handleChangeSchool}
                    //onBlur={handleBlur} TODO
                    ><Input suffix={<Icon type="down" />} />
                    </AutoComplete>
                    <AutoComplete
                        style={{ width: 200, marginRight: 10 }}
                        dataSource={props.groupNames}
                        placeholder="班级"
                        filterOption={(inputValue, option) =>
                            option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                        onChange={handleChangeGroup}
                        onBlur={handleBlur}
                    ><Input suffix={<Icon type="down" />} />
                    </AutoComplete>
                </>
            )
        }
    }

    return (
        <>

            <div style={{ marginBottom: 15 }}>
                {genFilter()}
            </div>
            <Table
                columns={columns}
                dataSource={props.data}
                rowKey={'id'}
                pagination={props.pagination}
                onChange={props.handleTableChange}
                loading={false}
            />
        </>);
}

export default GoodsManageTable;