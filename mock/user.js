const getUrl = url => `${process.env.VUE_APP_BASE_URL_API}/user${url}`

module.exports = app => {
  // 1.用户登陆
  app.post(getUrl('/login'), ({ query, body }, res) => {
    const { username, password } = body
    let token = ''
    if (username === 'admin' && password === '12345') {
      token = 'adminToken'
    } else if (username === 'editor' && password === '12345') {
      token = 'editorToken'
    } else if (username === 'viewer' && password === '12345') {
      token = 'viewerToken'
    }
    setTimeout(() => {
      res.json({
        code: token ? 200 : 0,
        errMsg: token ? '' : '账户或密码错误，请重新输入',
        data: token
      })
    }, 1000)
  })

  // 2.用户登出
  app.post(getUrl('/logout'), ({ query, body }, res) => {
    setTimeout(() => {
      res.json({
        code: 200,
        errMsg: '',
        data: null
      })
    }, 1000)
  })

  // 3.用户信息
  app.get(getUrl('/info'), (req, res) => {
    const token = req.get('token')
    const nameMap = {
      adminToken: 'admin',
      editorToken: 'editor',
      viewerToken: 'viewer'
    }
    res.json({
      code: 200,
      errMsg: '',
      data: {
        name: nameMap[token],
        avatar:
          'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
      }
    })
  })

  // 4.用户权限
  app.get(getUrl('/permission'), (req, res) => {
    const token = req.get('token')
    const permissionMap = {
      adminToken: {
        role: 'admin',
        actionMap: {
          table: ['add', 'del']
        }
      },
      editorToken: {
        role: 'editor',
        actionMap: {
          table: ['add', 'del']
        }
      },
      viewerToken: {
        role: 'viewer',
        actionMap: {}
      }
    }
    res.json({
      code: 200,
      errMsg: '',
      data: permissionMap[token]
    })
  })
}
