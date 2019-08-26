import React, { useState } from 'react'
import { Table, Input, Button, Icon, Typography } from 'antd';
import Link from 'umi/link'

const GoodsTable = (props) => {

    const [searchText, setSearchText] = useState('')

    let searchInput;

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}>Search
                </Button>
                <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.select());
            }
        },
        render: text => (
            <p>{text}</p>
        ),
    });

    const handleSearch = (selectedKeys, confirm) => {
        confirm();
        setSearchText(selectedKeys[0]);
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('')
    };

    const genButton = (related_type, record) => {
        switch (related_type) {
            case 1:
                return (
                    <>
                        <Link to={`/store/proto/${record.id}/channel`} >
                            <Button size={'small'} key={2} style={{ backgroundColor: '#FDF2E9', bordercolor: '#FADECD' }}>
                                <Typography.Text style={{ color: '#E85F33', }}><Icon type="link" />渠道</Typography.Text>
                            </Button>
                        </Link>
                        &nbsp; &nbsp;
                        <Link to={`/store/proto/${record.id}/group`} >
                            <Button size={'small'} style={{ backgroundColor: '#E6F5FE', bordercolor: '#CFE9FD' }} key={3}>
                                <Typography.Text style={{ color: '#4594F7', }}><Icon type="link" />班级</Typography.Text>
                            </Button>
                        </Link>

                    </>
                )
                break;
            case 3:
                return (
                    <>
                        <Link to={`/store/group/${record.id}/`} >
                            <Button size={'small'} style={{ backgroundColor: '#E6F5FE', bordercolor: '#CFE9FD' }} key={3}>
                                <Typography.Text style={{ color: '#4594F7', }}><Icon type="link" />班级</Typography.Text>
                            </Button>
                        </Link>
                    </>
                )
            case 2:
                return (
                    <>
                        <Link to={`/store/channel/${record.id}`} >
                            <Button size={'small'} key={2} style={{ backgroundColor: '#FDF2E9', bordercolor: '#FADECD' }}>
                                <Typography.Text style={{ color: '#E85F33', }}><Icon type="link" />渠道</Typography.Text>
                            </Button>
                        </Link>
                    </>
                )
            default:
                break;
        }
    }

    const columns = [
        {
            title: '商品标题',
            dataIndex: 'subject',
            key: 'subject',
            width: '15%',
            ...getColumnSearchProps('subject'),
        },
        {
            title: '商品描述',
            dataIndex: 'body',
            key: 'body',
            width: '30%',
            ...getColumnSearchProps('body'),
        },
        {
            title: '商品关联',
            key: 'related_type',
            dataIndex: 'related_type',
            width: '15%',
            render: (related_type, record) => genButton(related_type, record)
        },
        {
            title: '操作',
            width: '15%',
            render: (dumb = undefined, record) => (
                <span>


                    <Link to={`/goods/${record.id}/edit`} ><Icon type="edit" theme="twoTone" /></Link>

                    {record.related_type === 1 ? (<Link to={`/goods/${record.id}/new`} ><Icon style={{ marginLeft: 10 }} type="plus-square" theme="twoTone" /></Link>) : <></>}
                </span>
            )
        },

    ];

    return <Table
        columns={columns}
        dataSource={props.data}
        rowKey={'id'}
        pagination={props.pagination}
        onChange={props.handleTableChange}
    />;
}

export default GoodsTable;