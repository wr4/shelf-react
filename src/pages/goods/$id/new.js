import React, { useState, useEffect } from 'react'
import GoodsEdit from '../../../componentes/goodsEdit'

const NewPage = (props) => {
    const id = parseInt(props.match.params.id)

    const handleSubmit = (values) => {
        fetch(`http://ethles.com/api/goods`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
    }

    const [goodsInfo, setGoodsInfo] = useState({})

    useEffect(() => {
        fetch(`http://ethles.com/api/goods/${id}`)
            .then(res => res.json())
            .then(data => {
                setGoodsInfo(data.data);
                if (data.data.related_type !== 1) {
                    alert('非法')
                }

            })
    }, [])


    return (
        <div>
            <GoodsEdit field={goodsInfo} handleSubmit={handleSubmit} reg={true} />
        </div>
    )
}

export default NewPage;