module.exports = {
    configureWebpack: {
        devServer: {
            // mock编写接口的地方
            before(app) {
                // 模拟 一个登录接口
                const tokenStr = 'dhclass'
                app.get('/api/login', (req, res) => {
                    const { username, password } = req.query
                    if (username == 'admin' && password == '123456' ||
                        username == 'admin2' && password == '123456'
                    ) {
                        res.json({
                            code: 1,
                            message: '登录成功',
                            token: tokenStr + 'username' + username
                        })
                    } else {
                        res.json({
                            code: 0,
                            message: '登录失败'
                        })
                    }
                })
            }
        }
        
    },
    lintOnSave: false
}