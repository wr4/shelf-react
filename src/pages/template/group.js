import React, { useState, useEffect } from 'react'
import TemplateView from '../../componentes/templateView'

export default function () {

  const [groupTemplates, setGroupTemplates] = useState([]);
  const [relateGroup, setRelateGroup] = useState([])
  const [relateGroup2, setRelateGroup2] = useState([])
  const [schools, setSchools] = useState([])

  const fetchGroupTemplates = () => {
    fetch(`http://ethles.com/api/goods/group/template`)
      .then(res => res.json())
      .then(data => setGroupTemplates(data))
  }

  const onClickTemplateName = (templateID) => {
    setRelateGroup2([])
    fetch(`http://ethles.com/api/goods/template/group?template_id=${templateID}`)
      .then(res => res.json())
      .then(data => {
        setRelateGroup(data)

        let unqieSchoolNames = [];
        setSchools(data.filter(cur => {
          if (unqieSchoolNames.indexOf(cur.school_name) === -1) {
            unqieSchoolNames.push(cur.school_name)
            return true;
          } else {
            return false;
          }
        }))
      })

  }

  const onClickSub1Name = (schoolID) => {
    setRelateGroup2(relateGroup.filter(cur => {
      return cur.school_id === schoolID
    }))
  }

  useEffect(() => {
    fetchGroupTemplates()
  }, [])

  const onClickSub2Btn = async (templateID, relatedID, givenAvailableBefore = -1) => {
    if (!relatedID) {
      console.log(`invalid data2 :${relatedID}`)
    }
    const waitDel = [];
    await fetch(`http://ethles.com/api/goods?offset=0&limit=9999999&related_type=${3}&related_id=${relatedID}&template_id=${templateID}`)
      .then(res => res.json())
      .then(data => waitDel.push(...data))
      .then(() => {
        if (waitDel.length > 0) {
          let availableBefore;
          if (givenAvailableBefore === -1) {
            availableBefore = waitDel[0].available
          } else {
            availableBefore = givenAvailableBefore === 1
          }

          waitDel.forEach(async cur => {
            await fetch(`http://ethles.com/api/goods/${cur.id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ available: !availableBefore }),
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
                  return true;
                }
              })
              .catch(e => {
                return false;
              })
          })

        }

      })
      .then(() => {
        //
      })
  }

  const onClickSub1Btn = (templateID, relatedID) => {
    const aGoods = relateGroup.find(cur => {
      if (cur.group_id === relatedID && cur.template_id === templateID) {
        return true;
      } else {
        return false;
      }
    })
    if (aGoods) {
      const schoolID = aGoods.school_id;
      const availableBefore = aGoods.available;
      relateGroup.forEach(cur => {
        if (cur.template_id === templateID && cur.school_id === schoolID) {
          onClickSub2Btn(templateID, cur.group_id, availableBefore);
        }
      })
    }
    onClickTemplateName(templateID)
  }

  return (
    <>
      <TemplateView
        templates={groupTemplates}
        onClickTemplateName={onClickTemplateName}
        sub1={schools.map(cur => {
          cur.name = cur.school_name;
          cur.related_id = cur.group_id;
          return cur;
        })}
        onClickSub1Name={onClickSub1Name}
        onClickSub1Btn={onClickSub1Btn}
        onClickSub2Btn={onClickSub2Btn}
        sub2={relateGroup2.map(cur => {
          cur.name2 = cur.group_name;
          cur.related_id = cur.group_id;
          return cur;
        })}
      />

    </>
  );
}
