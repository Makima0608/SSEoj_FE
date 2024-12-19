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
                total: 100,
                problems: [
                    {
                        "status": true,
                        "problem_id": 1001,
                        "problem_name": "你好，世界",
                        "tags": [
                            "hash-table",
                            "math",
                            "dp"
                        ],
                        "pass_rate": 66.6,
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
                total: 100,
                problems: [{
                    "status": true,
                    "problem_id": 1002,
                    "problem_name": "A+B",
                    "tags": [
                        "递归",
                        "链表"
                    ],
                    "pass_rate": 88.8,
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
