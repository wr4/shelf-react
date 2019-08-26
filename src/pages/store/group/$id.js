import React, { useState, useEffect } from 'react'
import GoodsManageTable from '../../../componentes/goodsManageTable'
import { type2num } from '../../../utils/helper'

const RelateGroup = (props) => {
    const pageTypeName = props.location.pathname.split('/')[2]
    const pageType = type2num(pageTypeName)
    const id = parseInt(props.match.params.id)
    let related_id = 0;
    const [pagination, setPagination] = useState({ total: 0, pageSize: 8, current: 1 })
    const [relateGoods, setRelateGoods] = useState([])

    const fetchData = () => {

    }

    useEffect(() => {
        fetch(`http://ethles.com/api/goods/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.status === 404) {
                    throw Error('非法访问')
                }
                related_id = data.data.related_id
            })
            .then(() => {
                fetch(`http://ethles.com/api/goods/group/count?related_id=${related_id}`)
                    .then(res => res.json())
                    .then(n => setPagination(pre => {
                        pre.total = n
                        return pre
                    }))
                    .then(() => {
                        fetch(`http://ethles.com/api/goods/group?limit=${pagination.pageSize}&offset=${0}&related_id=${related_id}`)
                            .then(res => res.json())
                            .then(arr => {
                                return arr.map(data => {
                                    if (!data.sigma_account_ob_group) {
                                        return {
                                            group_name: '',
                                            school_name: '',
                                            id: data.id,
                                            available: data.available,
                                            subject: data.subject,
                                            body: data.body,
                                            relate_id: data.relate_id
                                        }
                                    } else {
                                        return {
                                            group_name: data.sigma_account_ob_group.name,
                                            school_name: data.sigma_account_ob_group.sigma_account_ob_school.name,
                                            id: data.id,
                                            available: data.available,
                                            subject: data.subject,
                                            body: data.body,
                                            relate_id: data.relate_id
                                        }
                                    }

                                })
                            })
                            .then(data => setRelateGoods(data))
                    })
            })


    }, [])

    const handleTableChange = (newPagination, filters, sorter) => {
        setPagination(pre => {
            pre.current = newPagination.current
            return pre
        })

        fetch(`http://ethles.com/api/goods/group?limit=${pagination.pageSize}&offset=${pagination.current >= 1 ? (pagination.current - 1) * pagination.pageSize : 0}&related_id=${related_id}`)
            .then(res => res.json())
            .then(arr => {
                return arr.map(data => {
                    if (!data.sigma_account_ob_group) {
                        return {
                            group_name: '',
                            school_name: '',
                            id: data.id,
                            available: data.available,
                            subject: data.subject,
                            body: data.body,
                            relate_id: data.relate_id
                        }
                    } else {
                        return {
                            group_name: data.sigma_account_ob_group.name,
                            school_name: data.sigma_account_ob_group.sigma_account_ob_school.name,
                            id: data.id,
                            available: data.available,
                            subject: data.subject,
                            body: data.body,
                            relate_id: data.relate_id
                        }
                    }

                })
            })
            .then(data => setRelateGoods(data))

    }

    return (
        <GoodsManageTable data={relateGoods} type={pageType} pagination={pagination} handleTableChange={handleTableChange} />
    )
}

export default RelateGroup
