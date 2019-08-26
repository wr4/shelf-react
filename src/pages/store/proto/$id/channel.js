import React, { useState, useEffect } from 'react'
import GoodsManageTable from '../../../../componentes/goodsManageTable'
import { Typography } from 'antd'
import { type2num } from '../../../../utils/helper'

const RelateChannel = (props) => {
    const pageTypeName = props.location.pathname.split('/').pop()
    const pageType = type2num(pageTypeName)
    const id = parseInt(props.match.params.id)
    const [pagination, setPagination] = useState({ total: 0, pageSize: 8, current: 1 })
    const [relateGoods, setRelateGoods] = useState([])

    const [relatedID, setRelatedID] = useState(-1)
    const [channelNames, setChannelNames] = useState([])

    const findRelatedID = (arr, name) => {
        const res = arr.find((cur) => cur.name === name)
        if (res) {
            return res.id
        } else {
            return -1;
        }
    }

    const UpdateDataByChannelFilter = (name) => {
        setRelatedID(findRelatedID(channelNames, name))

    }

    useEffect(() => {
        fetch(`http://ethles.com/api/goods/channel?template_id=${id}&related_id=${relatedID}&limit=${pagination.pageSize}&offset=${0}`)
            .then(res => res.json())
            .then(arr => {
                return arr.map(data => {
                    data.channel_name = data.sigma_account_us_user.name
                    delete data.sigma_account_us_user
                    return data
                })
            })
            .then(data => setRelateGoods(data))
            .then(() => {
                fetch(`http://ethles.com/api/goods/channel/count?template_id=${id}&related_id=${relatedID}`)
                    .then(res => res.json())
                    .then(n => setPagination(pre => {
                        pre.total = n
                        pre.current = 1
                        return pre
                    }))
            })
    }, [relatedID])

    useEffect(() => {

        fetch(`http://ethles.com/api/goods/channel/count?template_id=${id}`)
            .then(res => res.json())
            .then(n => setPagination(pre => {
                pre.total = n
                return pre
            }))
            .then(() => {
                fetch(`http://ethles.com/api/goods/channel?limit=${pagination.pageSize}&offset=${0}&template_id=${id}`)
                    .then(res => res.json())
                    .then(arr => {
                        return arr.map(data => {
                            data.channel_name = data.sigma_account_us_user.name
                            delete data.sigma_account_us_user
                            return data
                        })
                    })
                    .then(data => setRelateGoods(data))
            })

        fetch(`http://ethles.com/api/name/channel?template_id=${id}`)
            .then(res => res.json())
            .then(data => setChannelNames(data))

    }, [])

    const handleTableChange = (newPagination, filters, sorter) => {
        setPagination(pre => {
            pre.current = newPagination.current
            return pre
        })
        const relatedIDStr = relatedID === -1 ? `&related_id=${relatedID}` : '';

        fetch(`/ api / mall / goods / channel ? limit = ${pagination.pageSize}& offset=${pagination.current >= 1 ? (pagination.current - 1) * pagination.pageSize : 0}${relatedIDStr}`)
            .then(res => res.json())
            .then(arr => {
                return arr.map(data => {
                    data.channel_name = data.sigma_account_us_user.name
                    delete data.sigma_account_us_user
                    return data
                }
                )

            })
            .then(data => setRelateGoods(data))

    }

    return (
        <>

            <GoodsManageTable data={relateGoods} type={pageType} pagination={pagination} handleTableChange={handleTableChange} channelNames={channelNames.map(element => element.name)} UpdateDataByChannelFilter={UpdateDataByChannelFilter} />
        </>
    )
}

export default RelateChannel
