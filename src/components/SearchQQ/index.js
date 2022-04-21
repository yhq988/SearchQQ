import React, {useState} from 'react'
import './index.css'

function Search() {
  const [qqinfo, setInfo] = useState({})
  const [loading, setLoading] = useState(false)
  const [timer, setTimer] =useState(null)

  const fetchQQinfo=(qq)=> {
    fetch(`https://api.uomg.com/api/qq.info?qq=${qq}`).then(res=> {
      res.json().then(rep => {
        setInfo(rep)
        setLoading(false)
      }).catch(e => {
        setInfo({code: 'jsonErr', msg: '请求失败'})
        setLoading(false)
      })
    }).catch(ee => {
      setInfo({code: 'fetchErr', msg: '请求失败'})
      setLoading(false)
    })
  }

  const textChange=(event)=> {
    clearTimeout(timer)
    setLoading(true)
    setInfo({code: -1})
    let qq = event.target.value
    let newtimer = setTimeout(()=> {
      console.log(qq, 'set')
      fetchQQinfo(qq)
    },800)
    setTimer(newtimer)
  }

  return (
    <div>
      <h3>QQ号查询</h3>
      qq:<input data-testid='input-qq' type="text" onChange={textChange} />
      <br />
      {
        qqinfo.code && <div className='search-card-wrap'>
          <div data-testid='loading' className={`loading ${loading ? '': 'hidden'}`}>努力查询中...</div>
          {
            qqinfo.code === 1 ? <React.Fragment>
              <img className='img' src={qqinfo.qlogo} alt='logo' />
              <div>
                <p>{qqinfo.name}</p>
                <p>{qqinfo.qq}</p>
              </div>
            </React.Fragment> : <p>{qqinfo.msg}</p>
          }
          
        </div>
      }
    </div>
  )
}

export default Search;