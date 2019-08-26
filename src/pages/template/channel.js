import React, { useState, useEffect } from 'react'
import TemplateView from '../../componentes/templateView'

export default function () {

  const [channelTemplates, setChannelTemplates] = useState([]);
  const [relateChannel, setRelateChannel] = useState([])

  const fetchChannelTemplates = () => {
    fetch(`http://ethles.com/api/goods/channel/template`)
      .then(res => res.json())
      .then(data => setChannelTemplates(data))
  }

  const onClickTemplateName = (templateID) => {
    fetch(`http://ethles.com/api/goods/template/channel?template_id=${templateID}`)
      .then(res => res.json())
      .then(data => setRelateChannel(data))
  }

  useEffect(() => {
    fetchChannelTemplates()
  }, [])

  const onClickSub1Btn = async (templateID, relatedID) => {
    const waitDel = [];
    await fetch(`http://ethles.com/api/goods?offset=0&limit=9999999&related_type=${2}&related_id=${relatedID}&template_id=${templateID}`)
      .then(res => res.json())
      .then(data => waitDel.push(...data))
      .then(() => {
        waitDel.forEach(async cur => {
          await fetch(`http://ethles.com/api/goods/${cur.id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ available: !cur.available }),
          }
          )
            .then(res => {
              if (res.status >= 200 && res.status < 300) {
                return res;
              } else {
                const error = new Error(res.statusText);
                error.res = res;
                throw error;
              }
            })
            .then(res => res.json())
            .then(data => {
              if (data.data === 0) {
                //
              }
            })
            .catch(e => {
              return false;
            })
        })
      }).then(() => {
        onClickTemplateName(templateID)
      })

  }

  return (
    <>
      <TemplateView
        templates={channelTemplates}
        onClickTemplateName={onClickTemplateName}
        onClickSub1Btn={onClickSub1Btn}
        sub1={relateChannel.map(cur => {
          cur.name = cur.channel_name;
          cur.related_id = cur.channel_id;
          return cur;
        })} />
    </>
  );
}
