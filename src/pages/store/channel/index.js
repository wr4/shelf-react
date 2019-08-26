import React, { useState, useEffect } from 'react'
import GoodsTable from '../../../componentes/goodsTable'
import { type2num } from '../../../utils/helper'

const Channel = (props) => {
    const pageType = type2num(props.location.pathname.split('/').pop())
    const [channelGoods, setChannelGoods] = useState([])
    const [pagination, setPagination] = useState({ total: 0, pageSize: 8, current: 1 })

    useEffect(() => {
        fetch(`http://ethles.com/api/count/goods?related_type=${pageType}`)
            .then(res => res.json())
            .then(n => setPagination(pre => {
                pre.total = n
                return pre
            }))
            .then(() => {
                fetch(`http://ethles.com/api/goods?related_type=${pageType}&limit=${pagination.pageSize}&offset=${0}&field=id,subject,body,related_type`)
                    .then(res => res.json())
                    .then(data => setChannelGoods(data))
            }).then(() => {
            }).catch(err => {
                console.error(err)
            })

    }, [])

    const handleTableChange = (newPagination, filters, sorter) => {
        setPagination(pre => {
            pre.current = newPagination.current
            return pre
        })

        fetch(`http://ethles.com/api/goods?related_type=${pageType}&limit=${pagination.pageSize}&offset=${pagination.current >= 1 ? (pagination.current - 1) * pagination.pageSize : 0}&field=id,subject,body,related_type`)
            .then(res => res.json())
            .then(data => setChannelGoods(data)).catch(err => {
                console.error(err)
            })

    }

    return (
        <GoodsTable data={channelGoods} pagination={pagination} handleTableChange={handleTableChange} />
    )
}

export default Channel
