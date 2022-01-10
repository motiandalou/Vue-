module.exports = {
    configureWebpack: {
        devServer: {
            // mock编写接口的地方
            before(app) {
                // 模拟 一个登录接口
                const tokenStr = 'vbsuiavb'
                app.get('/api/login', (req, res) => {
                    const { username, password } = req.query
                    if (username == 'admin' && password == '123456' ||
                        username == 'admin2' && password == '123456'
                    ) {
                        //后端返回给前端登录成功的数据:
                        res.json({
                            code: 1,
                            message: '登录成功',
                            token: tokenStr + 'username' + username
                        })
                    } else {
                        //后端返回给前端登录失败的数据:
                        res.json({
                            code: 0,
                            message: '登录失败'
                        })
                    }
                })
                //后端返回前端动态的菜单:
                app.get('/api/menu', (req, res) => {
                    res.json({
                        "status": "ok",
                        "data": [{
                            "id": 1,
                            "name": "用户管理",
                            "child": [{
                                "id": 1,
                                "name": "用户列表",
                                "path": "/home/users"
                            }]
                        }, {
                            "id": 2,
                            "name": "员工管理",
                            "child": [{
                                "id": 2,
                                "name": "员工列表",
                                "path": "/home/rote"
                            },]
                        }, {
                            "id": 3,
                            "name": "商品管理",
                            "child": [{
                                "id": 4,
                                "name": "商品列表",
                                "path": "/home/product"
                            }, {
                                "id": 5,
                                "name": "分类参数",
                                "path": "/home/users"
                            }, {
                                "id": 6,
                                "name": "商品分类",
                                "path": "/home/productType"
                            }]
                        }, {
                            "id": 4,
                            "name": "订单管理",
                            "child": []
                        }, {
                            "id": 5,
                            "name": "数据统计",
                            "child": []
                        }]
                    })
                })
            }
        }

    },
    lintOnSave: false
}