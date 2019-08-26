import React, { useState, useEffect } from 'react'
import { type2num } from '../../../utils/helper'
import GoodsCardTable from '../../../componentes/goodsCardTable';
import GooodsInitialize from '../../../componentes/goodsInitialize'
import GoodsCart from '../../../componentes/goodsCart'
import { Col, Row, Layout, Pagination } from 'antd';


const Proto = (props) => {
    const [pagination, setPagination] = useState({ total: 0, pageSize: 6, current: 1 })
    const [protoGoods, setProtoGoods] = useState([])
    const [cart, setCart] = useState([])
    const [panelVisible, setPanelVisible] = useState(false)
    const protoGoodsType = 1;

    const fetchGoodsCount = () => {
        fetch(`http://ethles.com/api/goods?count=true&related_type=${protoGoodsType}`)
            .then(res => res.json())
            .then(n => setPagination((pre) => {
                pre.total = n;
                return pre;
            }))
    }

    const fetchGoods = (limit, currentPage) => {
        fetch(`http://ethles.com/api/goods?related_type=${protoGoodsType}&limit=${limit}&offset=${currentPage >= 1 ? (currentPage - 1) * pagination.pageSize : 0}`)
            .then(res => res.json())
            .then(data => setProtoGoods(data))
    }

    const handleClickAdd = (goods) => {
        if (cart.some(g => g.id === goods.id)) {
            return
        }
        setCart([...cart, goods])
    }

    useEffect(() => {
        fetchGoodsCount();
        fetchGoods(pagination.pageSize, pagination.current);


    }, [])

    const handlePageChange = (currentPage, PageSize) => {
        fetchGoods(PageSize, currentPage)
    }

    const handleClickDelete = (goods) => {
        setCart(cart.filter((cur) => cur.id !== goods.id))

    }

    const handleClickCreateBtn = () => {
        setPanelVisible(true)
    }

    const handleOnCancel = () => {
        setPanelVisible(false)
    }

    



    return (
        <Layout>
            <Layout.Content>
                <GooodsInitialize visible={panelVisible} handleOnCancel={handleOnCancel} cartGoods={cart} />
                <Row>
                    <Col span={19}>
                        <GoodsCardTable goods={protoGoods} handleClickAdd={handleClickAdd} />
                    </Col>
                    <Col span={4}>
                        <GoodsCart goods={cart} handleClickDelete={handleClickDelete} handleClickCreateBtn={handleClickCreateBtn} />
                    </Col>

                </Row>
                <Row type="flex" justify="center">
                    <Col >
                        <Pagination defaultCurrent={pagination.current} total={pagination.total} pageSize={pagination.pageSize} onChange={handlePageChange} />
                    </Col>
                </Row>



            </Layout.Content>

        </Layout>

    )

}

export default Proto