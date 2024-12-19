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
                "count": 69,
                "problemlists": [
                    {
                        "id": 92,
                        "title": "捶反而此外在惟独圆礼帽可",
                        "is_star": true,
                        "user_info": {
                            "id": 35,
                            "username": "季建华",
                            "avatar": "https://avatars.githubusercontent.com/u/37509958"
                        },
                        "problem_count": 71,
                        "pass_count": 60,
                        "star_count": 25
                    },
                    {
                        "id": 42,
                        "title": "吞倘若喔耶在喔耶",
                        "is_star": false,
                        "user_info": {
                            "id": 100,
                            "username": "析奕辰",
                            "avatar": "https://avatars.githubusercontent.com/u/54099049"
                        },
                        "problem_count": 70,
                        "pass_count": 54,
                        "star_count": 65
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
                problemlists: [{
                    "id": 45,
                    "title": "尽管虽然扔年度只要全滑撑挖",
                    "is_star": true,
                    "user_info": {
                        "id": 35,
                        "username": "季建华",
                        "avatar": "https://avatars.githubusercontent.com/u/37509958"
                    },
                    "problem_count": 58,
                    "pass_count": 10,
                    "star_count": 43
                }
                ]
            }
        }
    }
}
)
