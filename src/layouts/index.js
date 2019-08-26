import { useEffect, useState } from 'react';
import { Layout } from 'antd';
import Sider from './Sider'
import Header from './Header'
import Footer from './Footer'
function BasicLayout(props) {

  const [user, setUser] = useState({ isLogin: false, username: 0, id: 0 })
  useEffect(() => {
    fetch(`http://ethles.com/api/getLoginStatus`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (!data.data.isLogin) {
          window.location.href = `http://ethles.com/login?forward=http://ethles.com/#/`
        } else {
          fetch(`http://ethles.com/api/getOwn`, { credentials: "include" })
            .then(res => res.json())
            .then(data => {
              setUser({
                username: data.data.nickname,
                id: data.data.userId,
                isLogin: true,
              })
            })
        }
      }).catch(err => {
        console.error(err)
      })



  }, [])

  return (
    <Layout>
      <Layout.Sider
        style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, }}
        location={props.location}
      >
        <Sider />
      </Layout.Sider>
      <Layout style={{ marginLeft: 200, height: '100vh' }}>
        <Layout.Header style={{ background: '#fff', padding: 0 }} >
          <Header user={user} />
        </Layout.Header>
        <Layout.Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          {props.children}
        </Layout.Content >
        <Layout.Footer style={{ textAlign: 'center' }}>
          <Footer />
        </Layout.Footer>
      </Layout>
    </Layout >
  );
}

export default BasicLayout;
