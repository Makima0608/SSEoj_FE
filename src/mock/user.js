import Mock from "mockjs";

Mock.mock(/\/api\/user\/(\d+)\/info/, 'get', (options) => {
    console.log(options.url)
    const id = options.url.match(/\/api\/user\/(\d+)\/info/)[1]
    if (id == 1) {
        return {
            err: null,
            data: {
                "id": id,
                "username": "KLmon",
                "avatar": "base64",
                "profile": "这个人很懒",
                "subscribers_count": 70,
                "subscribing_count": 45,
                "is_subscribe": false
            }
        }
    }
    else if (id == 2)
        return {
            err: null,
            data: {
                "id": id,
                "username": "G3rY",
                "avatar": "base64",
                "profile": "这个人很勤快很勤快很勤快很勤快很勤快很勤快很勤快很勤快很勤快",
                "subscribers_count": 23,
                "subscribing_count": 33,
                "is_subscribe": true
            }
        }
    else
        return {
            err: null,
            data: {
                "id": id,
                "username": "Chitanda",
                "avatar": "base64",
                "profile": "这个人很勤快",
                "subscribers_count": 666666,
                "subscribing_count": 888888,
                "is_subscribe": true
            }
        }
})

Mock.mock(/\/api\/user\/subscribe\//, 'post', (options) => {
    console.log(options.body)
    return {
        err: null,
        data: 'success'
    }
})


Mock.mock(/\/api\/user\/(\d+)\/practice\//, 'get', (options) => {
    console.log(options.url)
    return {
        err: null,
        data: {
          practices:[
            {
              "id": 88,
              "name": "树浩晨",
              "pass_status": false,
              "tags": [
                  24,
                  6,
                  59
              ],
              "difficulty": 25,
              "pass_count": 22,
              "attempt_count": 11
            },
            {
              "id": 11,
              "name": "树浩晨",
              "pass_status": false,
              "tags": [
                  24,
                  6,
                  59
              ],
              "difficulty": 25,
              "pass_count": 22,
              "attempt_count": 11
            },
          ]
        }

    }
})

Mock.mock(/\/api\/user\/(\d+)\/default_problemlist\//, 'get', (options) => {
    // console.log(options.body)
    return {
        err: null,
        data:{
          problems: [
            {
                "pass_status": false,
                "id": 59,
                "name": "单于呈轩",
                "tags": [
                    52,
                    12
                ],
                "difficulty": 5,
                "pass_count": 33,
                "attempt_count": 85
            },
            {
                "pass_status": true,
                "id": 35,
                "name": "浦若汐",
                "tags": [
                    5,
                    73,
                    82
                ],
                "difficulty": 2,
                "pass_count": 9,
                "attempt_count": 40
            }
          ],
        }
    }
})

Mock.mock(/\/api\/user\/user_name_change\//, 'put', ()=>{
    return {
        err: null,
        data: 'success'
    }
})

Mock.mock(/\/api\/user\/profile_change\//, 'put', ()=>{
    return {
        err: null,
        data: 'success'
    }
})

Mock.mock(/\/api\/user\/avatar_change\//, 'put', ()=>{
    return {
        err: null,
        data: 'success'
    }
})

Mock.mock(/\/api\/user\/password_change\//, 'put', ()=>{
    return {
        err: null,
        data: 'success'
    }
})

Mock.mock(/\/api\/user\/password_forget\//, 'put', ()=>{
    return {
        err: null,
        data: 'success'
    }
})

Mock.mock(/\/api\/identity\/send_email\//, 'post', ()=>{
    return {
        err: null,
        data: 'success'
    }
})

Mock.mock(/\/api\/user\/(\d+)\/create_problemlist\//, 'get', () => {
    const data = [
        {
            "id": 15,
            "title": "好啊噢捏当反而干脆逐步也许每当哎呀1414141414141415252525252525",
            "problem_count": 13,
            "type": true
        },
        {
            "id": 63,
            "title": "哎当只要抿操作画穿过哪个搡",
            "problem_count": 86,
            "type": false
        },
        {
            "id": 43,
            "title": "关于与此同时统统并且一同划拨到一边敲拨",
            "problem_count": 80,
            "type": true
        },
        {
            "id": 42,
            "title": "关于与此同时统统并且一同划拨到一边敲拨",
            "problem_count": 80,
            "type": true
        },
        {
            "id": 41,
            "title": "关于与此同时统统并且一同划拨到一边敲拨",
            "problem_count": 80,
            "type": true
        }
    ]
    return {
        err: null,
        data: data
    }
})