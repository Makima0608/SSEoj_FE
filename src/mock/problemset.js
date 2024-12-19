import Mock from 'mockjs'

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
                    "problem_id": 1002,
                    "problem_name": "A+B",
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
