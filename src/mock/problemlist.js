import Mock from 'mockjs'

Mock.mock(/\/api\/problemlist\//, 'get', (options) => {
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
                "problemlists": [
                    {
                        "id": 69,
                        "title": "舞在勇敢舞",
                        "creator": "ad mollit sed sit",
                        "problem_count": 52,
                        "pass_count": 35,
                        "star_count": 75
                    },
                    {
                        "id": 58,
                        "title": "嗯最清楚关于每好啊",
                        "creator": "magna et tempor ad dolor",
                        "problem_count": 85,
                        "pass_count": 45,
                        "star_count": 5
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
                problemlists: [{
                    "id": 45,
                    "title": "尽管虽然扔年度只要全滑撑挖",
                    "creator": "Duis fugiat id",
                    "problem_count": 58,
                    "pass_count": 71,
                    "star_count": 43
                }
                ]
            }
        }
    }
}
)
