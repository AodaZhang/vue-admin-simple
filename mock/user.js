const getUrl = url => `${process.env.VUE_APP_BASE_URL_USER}${url}`

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
      res.json({ token })
    }, 1000)
  })

  // 2.用户登出
  app.post(getUrl('/logout'), ({ query, body }, res) => {
    setTimeout(() => {
      res.json({})
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
      info: {
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
        roles: ['admin'],
        actionMap: {
          table: ['add', 'del']
        }
      },
      editorToken: {
        roles: ['editor'],
        actionMap: {
          table: ['add', 'del']
        }
      },
      viewerToken: {
        roles: ['viewer'],
        actionMap: {}
      }
    }
    res.json({
      permission: permissionMap[token]
    })
  })
}
