const getUrl = url => `${process.env.VUE_APP_BASE_URL_API}/activity${url}`

module.exports = app => {
  // 1.活动列表
  app.post(getUrl('/list'), ({ query, body }, res) => {
    const list = Array(45)
      .fill(1)
      .map((item, index) => ({
        activityId: index + 1,
        activityName: `活动${index + 1}`,
        activityPlatform: (index & 1) === 0 ? '支付宝' : '微信',
        activityDate: (index & 1) === 0 ? '2021-04-10' : '2021-04-20',
        activitytags: (index & 1) === 0 ? ['团队建设', '气氛组'] : ['happy']
      }))
    setTimeout(() => {
      res.json({
        code: 200,
        errMsg: '',
        data: {
          total: list.length,
          list
        }
      })
    }, 1000)
  })
}
