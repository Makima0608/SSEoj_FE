import Mock from 'mockjs'

// 获取题库
Mock.mock(/\/api\/problemset\//, 'get', (options) => {
    console.log(options.url)
    const query = options.url.split('?')[1];
    const params = new URLSearchParams(query);
    const page = params.get('page_num');
    const page_size = params.get('page_size');
    console.log({ page, page_size })
    if (page == 1) {
        return {
            err: null,
            data: {
                count: 100,
                problems: [
                    {
                        "status": true,
                        "id": 1001,
                        "name": "你好，世界",
                        "tags": [
                            1,
                            2,
                            3
                        ],
                        "pass_count": 550,
                        "attempt_count": 1000,
                        "difficulty": 5
                    },
                    {
                        "status": false,
                        "id": 1001,
                        "name": "你好，世界",
                        "tags": [
                            1,
                            2,
                            3
                        ],
                        "pass_count": 550,
                        "attempt_count": 1000,
                        "difficulty": 5
                    },
                    {
                        "status": true,
                        "id": 1001,
                        "name": "你好，世界",
                        "tags": [
                            1,
                            2,
                            3
                        ],
                        "pass_count": 550,
                        "attempt_count": 1000,
                        "difficulty": 5
                    },
                    {
                        "status": false,
                        "id": 1001,
                        "name": "你好，世界",
                        "tags": [
                            1,
                            2,
                            3
                        ],
                        "pass_count": 550,
                        "attempt_count": 1000,
                        "difficulty": 5
                    }
                ]
            }
        }
    }
    else if (page == 2) {
        return {
            err: null,
            data: {
                count: 100,
                problems: [{
                    "status": true,
                    "id": 1002,
                    "name": "A+B",
                    "tags": [
                        3,
                        4
                    ],
                    "pass_count": 666,
                    "attempt_count": 1000,
                    "difficulty": 3
                },
                ]
            }
        }
    }
}
)

// 提交题解
Mock.mock(/\/api\/solution\/create\//, 'post', (options) => {
    console.log(options)
    return {
        err: null,
        data: 'success'
    }
})

// 模拟获取详细题解
Mock.mock(/\/api\/problem\/(\d+)\/solutions\/(\d+)\//, 'get', (options) => {
    console.log(options.url)
    const data = {
        "user_info": {
            "id": 84,
            "username": "鲍梓妍",
            "avatar": "https://avatars.githubusercontent.com/u/37607428"
        },
        "like_count": 76,
        "comment_count": "deserunt",
        "create_time": "2024-12-21 05:04:12",
        "tags": [
            22
        ],
        "id": 38,
        "title": "血淋淋成年人关于搜呼遍及尽管同样地",
        "content": "adipisicing nulla do Lorem"
    }
    return {
        err: null,
        data: data
    }
})

