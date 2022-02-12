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
                //后端返回:用户管理--用户列表(公司内部所有的员工)
                //模拟用户列表接口信息+分页
                var userlist = [
                    {
                        "id": 20,
                        "UserName": "zs20",
                        "Password": "123456",
                        "CreateTime": "0001/1/1 星期一 0:00:00",
                        "RoleName": "员工",
                        "Mobile": "18888888888",
                        "Email": "405328555@qq.com",
                        "MgState": "yes"
                    }, {
                        "id": 19,
                        "UserName": "zs19",
                        "Password": "123456",
                        "CreateTime": "0001/1/1 星期一 0:00:00",
                        "RoleName": "员工",
                        "Mobile": "18888888888",
                        "Email": "405328555@qq.com",
                        "MgState": "yes"
                    }, {
                        "id": 18,
                        "UserName": "zs18",
                        "Password": "123456",
                        "CreateTime": "0001/1/1 星期一 0:00:00",
                        "RoleName": "员工",
                        "Mobile": "18888888888",
                        "Email": "405328555@qq.com",
                        "MgState": "yes"
                    }, {
                        "id": 17,
                        "UserName": "zs17",
                        "Password": "555555",
                        "CreateTime": "0001/1/1 星期一 0:00:00",
                        "RoleName": "员工",
                        "Mobile": "13312311231",
                        "Email": "55@qq.com",
                        "MgState": "yes"
                    }, {
                        "id": 16,
                        "UserName": "zs16",
                        "Password": "333333",
                        "CreateTime": "0001/1/1 星期一 0:00:00",
                        "RoleName": "员工",
                        "Mobile": "13388888888",
                        "Email": "33@qq.com",
                        "MgState": "yes"
                    }, {
                        "id": 15,
                        "UserName": "zs15",
                        "Password": "222222",
                        "CreateTime": "0001/1/1 星期一 0:00:00",
                        "RoleName": "员工",
                        "Mobile": "13845644564",
                        "Email": "22@qq.com",
                        "MgState": "yes"
                    }, {
                        "id": 14,
                        "UserName": "zs14",
                        "Password": "123456",
                        "CreateTime": "0001/1/1 星期一 0:00:00",
                        "RoleName": "员工",
                        "Mobile": "17621901054",
                        "Email": "1768195615@qq.com",
                        "MgState": "yes"
                    }, {
                        "id": 13,
                        "UserName": "zs13",
                        "Password": "12345",
                        "CreateTime": "0001/1/1 星期一 0:00:00",
                        "RoleName": "员工",
                        "Mobile": "13812341235",
                        "Email": "888888@qq.com",
                        "MgState": "yes"
                    }, {
                        "id": 12,
                        "UserName": "zs12",
                        "Password": "12345",
                        "CreateTime": "0001/1/1 星期一 0:00:00",
                        "RoleName": "员工",
                        "Mobile": "13812341888",
                        "Email": "288888@qq.com",
                        "MgState": "yes"
                    }, {
                        "id": 11,
                        "UserName": "zs11",
                        "Password": "123456",
                        "CreateTime": "0001/1/1 星期一 0:00:00",
                        "RoleName": "员工",
                        "Mobile": "13602221234",
                        "Email": "223456@qq.com",
                        "MgState": "no"
                    }, {
                        "id": 10,
                        "UserName": "zs1",
                        "Password": "123456",
                        "CreateTime": "0001/1/1 星期一 0:00:00",
                        "RoleName": "员工",
                        "Mobile": "18888888888",
                        "Email": "405328555@qq.com",
                        "MgState": "yes"
                    }, {
                        "id": 9,
                        "UserName": "zs2",
                        "Password": "123456",
                        "CreateTime": "0001/1/1 星期一 0:00:00",
                        "RoleName": "员工",
                        "Mobile": "18888888888",
                        "Email": "405328555@qq.com",
                        "MgState": "yes"
                    }, {
                        "id": 8,
                        "UserName": "zs3",
                        "Password": "123456",
                        "CreateTime": "0001/1/1 星期一 0:00:00",
                        "RoleName": "员工",
                        "Mobile": "18888888888",
                        "Email": "405328555@qq.com",
                        "MgState": "yes"
                    }, {
                        "id": 7,
                        "UserName": "zs4",
                        "Password": "555555",
                        "CreateTime": "0001/1/1 星期一 0:00:00",
                        "RoleName": "员工",
                        "Mobile": "13312311231",
                        "Email": "55@qq.com",
                        "MgState": "yes"
                    }, {
                        "id": 6,
                        "UserName": "zs5",
                        "Password": "333333",
                        "CreateTime": "0001/1/1 星期一 0:00:00",
                        "RoleName": "员工",
                        "Mobile": "13388888888",
                        "Email": "33@qq.com",
                        "MgState": "yes"
                    }, {
                        "id": 5,
                        "UserName": "zs6",
                        "Password": "222222",
                        "CreateTime": "0001/1/1 星期一 0:00:00",
                        "RoleName": "员工",
                        "Mobile": "13845644564",
                        "Email": "22@qq.com",
                        "MgState": "yes"
                    }, {
                        "id": 4,
                        "UserName": "zs7",
                        "Password": "123456",
                        "CreateTime": "0001/1/1 星期一 0:00:00",
                        "RoleName": "员工",
                        "Mobile": "17621901054",
                        "Email": "1768195615@qq.com",
                        "MgState": "yes"
                    }, {
                        "id": 3,
                        "UserName": "zs8",
                        "Password": "12345",
                        "CreateTime": "0001/1/1 星期一 0:00:00",
                        "RoleName": "员工",
                        "Mobile": "13812341235",
                        "Email": "888888@qq.com",
                        "MgState": "yes"
                    }, {
                        "id": 2,
                        "UserName": "zs9",
                        "Password": "12345",
                        "CreateTime": "0001/1/1 星期一 0:00:00",
                        "RoleName": "员工",
                        "Mobile": "13812341888",
                        "Email": "288888@qq.com",
                        "MgState": "yes"
                    }, {
                        "id": 1,
                        "UserName": "zs10",
                        "Password": "123456",
                        "CreateTime": "0001/1/1 星期一 0:00:00",
                        "RoleName": "主管",
                        "Mobile": "13602221234",
                        "Email": "223456@qq.com",
                        "MgState": "no"
                    }]
                app.get('/api/users', (req, res) => {
                    //解构赋值:获取前端传过来的参数:
                    const { query, pagenum, pagesize } = req.query
                    var total = userlist.length
                    //注意：(parseInt(pagenum) + 1) 两个数相加时，
                    //一定要通过parseInt(pagenum)把传过来的参数转换成int类型,一般前端传给后端的都是字符串.
                    var newDataList = userlist.slice((parseInt(pagenum) - 1) * pagesize, pagenum * pagesize)
                    //后端返回:
                    res.json({
                        'status': 'ok',
                        'total': total,
                        'data': newDataList
                    })
                })
                //每条数据的状态:
                //修改用户状态的接口
                app.get('/api/userUpdate', (req, res) => {
                    //前端传数据:每条数据传过来的状态:
                    const { id, MgState } = req.query
                    var newState = ''
                    if (userlist) {
                        var user = userlist.filter(u => u.id == id)
                        user.MgState = MgState
                        newState = user.MgState
                    }
                    //后端返回:
                    res.json({
                        "code": '200',
                        'newState': newState
                    })
                })
                //增删改查--查
                app.get('/api/userSearch', (req, res) => {
                    const { query } = req.query
                    var newDataList = []
                    if (query != '') {
                        newDataList = userlist.filter(u => u.UserName == query)
                    }
                    res.json({
                        'status': 'ok',
                        'data': newDataList
                    })
                })
                //增删改查--增:向数据库增加数据,然后返回最新数据
                app.get('/api/adduser', (req, res) => {
                    const { username, password, email, mobile, pagenum, pagesize } = req.query
                    var id = userlist[0].id
                    var adduser = {
                        "id": id + 1,
                        "UserName": username,
                        "Password": password,
                        "CreateTime": "0001/1/1 星期一 0:00:00",
                        "RoleName": "",
                        "Mobile": mobile,
                        "Email": email,
                        "MgState": true
                    }
                    userlist.unshift(adduser)

                    total = userlist.length
                    var newDataList = []

                    newDataList = userlist.slice((parseInt(pagenum) - 1) * pagesize, pagenum * pagesize)
                    //向前端反馈的数据
                    res.json({
                        'total': total,
                        'data': newDataList
                    })
                })

                //增删改查--改:向数据库修改数据,然后返回最新数据
                app.get('/api/updateuser', (req, res) => {
                    const { id, username, password, email, mobile, pagenum, pagesize } = req.query

                    userlist.filter(u => u.id == id).forEach(element => {
                        element.UserName = username
                        element.Email = email
                        element.Mobile = mobile
                    })

                    var total = userlist.length

                    newDataList = userlist.slice((parseInt(pagenum) - 1) * pagesize, pagenum * pagesize)

                    res.json({
                        'status': 'ok',
                        'total': total,
                        'data': newDataList
                    })
                })

                //增删改查--删:向数据库删除数据,然后返回最新数据
                app.get('/api/deleteuser', (req, res) => {
                    const { id, pagenum, pagesize } = req.query
                    if (userlist) {
                        for (var i = 0; i < userlist.length; i++) {
                            if (userlist[i].id == id)
                                //前端传入删除数据的唯一标识--id,后端删除数据,然后再将新数据传给前端
                                userlist.splice(i, 1)
                        }
                    }

                    var total = userlist.length

                    newDataList = userlist.slice((parseInt(pagenum) - 1) * pagesize, pagenum * pagesize)

                    res.json({
                        'status': 'ok',
                        'total': total,
                        'data': newDataList
                    })
                })
            }
        }

    },
    // 设置是否在开发环境下每次保存代码时都启用 eslint验证。
    // false：关闭每次保存都进行检测
    // true：开启每次保存都进行检测，效果与warning一样
    // ‘warning’：开启每次保存都进行检测，lint 错误将显示到控制台命令行，而且编译并不会失败。
    // ‘error’：开启每次保存都进行检测，lint 错误将显示到浏览器页面上，且编译失败。
    // ‘default’：同’error’
    lintOnSave: false
}