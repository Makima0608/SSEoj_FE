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

Mock.mock(/\/api\/problem\/(\d+)\/solutions\/(\d+)\//, 'get', (options) => {
    console.log(options.url)
    const data = {
        "user_info": {
            "id": "111",
            "username": "素燕",
            "avatar": "https://avatars.githubusercontent.com/u/15032622"
        },
        "like_count": 62,
        "comment_count": "amet tempor ea consectetur",
        "create_time": "2024-02-19 17:04:56",
        "tags": [
            84,
            25
        ],
        "id": 26,
        "title": "嗯虽然遍及嗯军营画电器",
        "content": "dolore dolore qui sed"
    }
    return {
        err: null,
        data: data
    }
})

// 假设你的 API 路径是这样的，并且带有查询参数
// const apiPath = '/api/problemset';

// // 使用正则表达式来匹配 URL 和查询参数
// Mock.mock(RegExp(apiPath + ".*"), 'get', (options) => {
//     console.log('mock', options.url);
//     const query = options.url.split('?')[1];
//     const params = new URLSearchParams(query);
//     const page = params.get('page_num');
//     const page_size = params.get('page_size');
//     console.log({page, page_size})
//     return {
//         err: null,
//         data: {
//             total: null,
//             problems: null
//         },
//     };
// });
