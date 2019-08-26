import React, { useState, useEffect } from 'react'
import GoodsManageTable from '../../../../componentes/goodsManageTable'
import { type2num } from '../../../../utils/helper'

const RelateGroup = (props) => {
    const pageTypeName = props.location.pathname.split('/').pop()
    const pageType = type2num(pageTypeName)
    const id = parseInt(props.match.params.id)
    const [pagination, setPagination] = useState({ total: 0, pageSize: 8, current: 1 })
    const [relateGoods, setRelateGoods] = useState([])
    const [groupNames, setGroupNames] = useState([])
    const [relatedID, setRelatedID] = useState(-1)
    const findRelatedID = (arr, schoolname, groupname) => {
        const res = arr.find((cur) => cur.school_name === schoolname && cur.group_name === groupname)
        if (res) {
            return res.group_id
        } else {
            return -1;
        }


    }

    //传入的 name 必须已存在
    const UpdateDataByGroupFilter = (schoolname, groupname) => {
        setRelatedID(findRelatedID(groupNames, schoolname, groupname))

    }

    useEffect(() => {
        //先获取筛选渠道后的数据
        fetch(`http://ethles.com/api/goods/group?template_id=${id}&related_id=${relatedID}&limit=${pagination.pageSize}&offset=${0}`)
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
            .then(() => {
                //然后把分页信息也更新一下
                fetch(`http://ethles.com/api/goods/group/count?template_id=${id}&related_id=${relatedID}`)
                    .then(res => res.json())
                    .then(n => setPagination(pre => {
                        pre.total = n
                        pre.current = 1
                        return pre
                    }))
            })
    }, [relatedID])

    const fetchData = () => {

    }

    useEffect(() => {
        // fetch table data
        fetch(`http://ethles.com/api/goods/group/count?template_id=${id}`)
            .then(res => res.json())
            .then(n => setPagination(pre => {
                pre.total = n
                return pre
            }))
            .then(() => {
                fetch(`http://ethles.com/api/goods/group?limit=${pagination.pageSize}&offset=${0}&template_id=${id}`)
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

        // fetch search data
        fetch(`http://ethles.com/api/name/group?template_id=${id}`)
            .then(res => res.json())
            .then(data => {
                return data;

            })
            .then(data => setGroupNames(data));
    }, [])

    const handleTableChange = (newPagination, filters, sorter) => {
        setPagination(pre => {
            pre.current = newPagination.current
            return pre
        })

        const relatedIDStr = relatedID === -1 ? `&related_id=${relatedID}` : '';

        fetch(`http://ethles.com/api/goods/group?limit=${pagination.pageSize}&offset=${pagination.current >= 1 ? (pagination.current - 1) * pagination.pageSize : 0}&template_id=${id}${relatedIDStr}`)
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

    const genDistinctSchoolName = (arr) => {
        const set = new Set(arr.map(cur => cur.school_name))
        return [...set]
    }

    const genDistinctGroupName = (arr) => {
        const set = new Set(arr.map(cur => cur.group_name))
        return [...set]
    }

    return (
        <GoodsManageTable data={relateGoods} type={pageType} pagination={pagination} handleTableChange={handleTableChange} schoolNames={genDistinctSchoolName(groupNames)} groupNames={genDistinctGroupName(groupNames)} UpdateDataByGroupFilter={UpdateDataByGroupFilter} />
    )
}

export default RelateGroup
