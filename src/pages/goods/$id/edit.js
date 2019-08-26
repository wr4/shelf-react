import React, { useState, useEffect } from 'react'
import GoodsEdit from '../../../componentes/goodsEdit'

const GoodsPage = (props) => {
    const id = parseInt(props.match.params.id)

    const handleSubmit = (values) => {
        fetch(`http://ethles.com/api/goods/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        }).catch(err => {
            console.error(err)
        })
    }

    const [goodsInfo, setGoodsInfo] = useState({})

    useEffect(() => {
        fetch(`http://ethles.com/api/goods/${id}`)
            .then(res => res.json())
            .then(data => setGoodsInfo(data.data)).catch(err => {
                console.error(err)
            })
    }, [])


    return (
        <div>
            <GoodsEdit field={goodsInfo} handleSubmit={handleSubmit} reg={false} />
        </div>
    )
}

export default GoodsPage;