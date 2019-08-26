import { Menu, Icon } from 'antd';
import Link from 'umi/link';

const stylesLogo = {
    height: '20px',
    margin: '36px 10px 36px 36px',
}

function Sider(props) {

    return (
        <div>
            <img className="logo" alt="logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAEMUlEQVRYR82Zb2hbVRTAfzdN0qQ1Y8laO9bZdevmWphKmZOJiEplW9exop/84JeBijgFxda/THQMBT+IoKDocNh2WGmHtji3D6JD0s1/CFZWm9oZXa3YWTc7cWv+9cp9S9q89L281zTp8r7ee+753XPOvfec8wRZPinlaqAVaAFuBCqA0mwyNsYiwCQwCBwF+oQQv5vJCaMBKeUq4EVgD+C0oXQxU+LAIaVPCPFH5kLzAKWUu4EuwLcYrTnI/gvcL4ToT5fVAUopHwNeBxw5KMiHyAzwuBDijdRis4BJy310FeFSTArynpQlNcBkzA0vhVtlIgqJaYR7WTaLK3fXq5hMAb4DPJgPH2VbIz7ay/TJZyD2H64N91F6+2sgDM+pWuZdIcRDInmVhAt9WmOhw0SC7cpfs3vw7OjGWX2H2Z7U6V6rAPcCbxbSekZwSp+n6SDOWnXFmn6PKsBPgeZCAZrBOfwNeFuPIUqy3vvHFKC6xasLAWgKt3wD3p29CO+1VmrHFeC01fN16YdRzvd8jrPKT+WeXZRc47VamDzAKR0RBTgXtQZqI2f/JNT8JDIS00a9DWtY1/ECTr/5QxMLdREJPqU7EErWoVnuCMJbabnB2YvaClBZbuzZt3ULeurXUNdpDDkzOcil/maQ6r6d+xzLr0+61T6ckra04OXh3xjZ/TTM6BWaQUZ/fIvoN/vzAmcLUE2a7DzO+EvvzXOLBtmxD2dg7lVITHzL5U9UhnYlcnK1nG0XpyYuBDL+Sz+x0R4cvhrcjW0Ij992zGVOtHRxusBCIHMmyhBcEGA2d3sbalnfewBHqTtfbNo6CwbMBlnz6l7895q+rTmB5wRoBlkUgDNS4kimSH93f8b4/kPIaIzyzRtZ17Hv6rq4MzREX/gM7zftoNzl0lwWv3CR+OQUpXXVCEf+KwXbLlZwz50KarfbLVUrOXjXNgIej2FcfT8R5uT4KJVlPnbVNVLuyr1StQWYDpciWllWzstbb2NbTa0O8sw/53jlq77ZtHS1L0Dblp343NYJhtFuLQGHL5xne/8REhk5xUZ/gA+3t1Dh0Ss+Hh6kJ/S1TtdiIC0Bu38epm3gS53C+iTcigw4NenXqb84cEpZUJ8kVfsCtOdgSUvA8MUpmj7uJTqT0CCzwaV28cXZIbqGBuZ5LBdIWwnrd+cm+GBkmKqyMh7edBPL3NavhTmkn/YtLXZjUktYC5bynxgbovO0kSVtQ2opf0GLJjPI63wreP7WVlyOkmxPoFY0FbzsPDH2E52ng/NAHmm8m81Va7MBamWn6gEWvHA3gnzi5mY2VSj1ht+Vwl0NSSmXpPURHB/h8NAA0UScravW88ANdyKsWh9JQNWwXJLmUSwRZzoRx+c2fiaTttQ3j5KQqnFZnO23VAQUdQMzDbJ4W8BpkMXbRE8/8MXwG+J/OWjvDCuSlUQAAAAASUVORK5CYII=" style={stylesLogo} ></img>
            <span style={{ color: 'white', userSelect: 'none', WebkitUserSelect: 'none' }}>Sigma AI</span>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']} >
                <Menu.Item key="store/proto">
                    <Link to="/store/proto">
                        <Icon type="build" />
                        <span className="nav-text">添加商品</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/template/channel">
                    <Link to="/template/channel">
                        <Icon type="appstore" />
                        <span className="nav-text">渠道模版</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/template/group">
                    <Link to="/template/group">
                        <Icon type="appstore" />
                        <span className="nav-text">班级模版</span>
                    </Link>
                </Menu.Item>
                <Menu.SubMenu key="sub2" title={<>商品</>}>

                    <Menu.Item key="store/group">
                        <Link to="/store/group">
                            <Icon type="unordered-list" />
                            <span className="nav-text">班级商品</span>
                        </Link>

                    </Menu.Item>
                    <Menu.Item key="store/channel">
                        <Link to="/store/channel">
                            <Icon type="unordered-list" />
                            <span className="nav-text">渠道商品</span>
                        </Link>
                    </Menu.Item>
                </Menu.SubMenu>

            </Menu>
        </div >
    )
}
export default Sider