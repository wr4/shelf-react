import { Row, Col, Menu, Dropdown, Icon } from 'antd';
import GoodsSearch from '../componentes/goodsSearch'
import { useState } from 'react';
const Header = (props) => {

    const menu = (
        <Menu onClick={({ key }) => { }}>
            <Menu.Item key="1">注销</Menu.Item>
        </Menu>
    );

    const handleSearch = (value) => {
        fetch(`http://ethles.com/api/fuzzy/goods?subject=${value}&offset=0&limit=5`)
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    window.location.href = (`${window.location.origin}/goods/${data[0].id}/edit`)
                }

            }).catch(err => {
                console.error(err)
            })
    }

    const [fuzzySet, setFuzzySet] = useState([])

    const handleChange = (value) => {
        fetch(`http://ethles.com/api/fuzzy/goods?subject=${value}&offset=0&limit=5`)
            .then(res => res.json())
            .then(data => setFuzzySet(data)).catch(err => {
                console.error(err)
            }).catch(err => {
                console.error(err)
            })
    }

    const dataSourceSet = new Set(fuzzySet.map(curr => curr.subject))
    const dataSource = Array.from(dataSourceSet)
    return (

        < div >
            <Row type="flex" justify="end">
                <Col span={3}>
                    <GoodsSearch handleSearch={handleSearch} handleChange={handleChange} dataSource={dataSource} />
                </Col>
                <Col span={4}>
                    <Dropdown overlay={menu}>
                        <p className="ant-dropdown-link" style={{ float: 'right', paddingRight: 20 }}>
                            <Icon type="user" />&nbsp;{props.user.username}&nbsp;<Icon type="down" />
                        </p>
                    </Dropdown>
                </Col>
            </Row>
        </div >
    )
}

export default Header