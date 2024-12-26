import Mock from 'mockjs'

Mock.mock(/\api\/post\/(\d+)\/comments/, 'get', (options) => {
    console.log("Mock Intercepted Request:", options.url);

    const query = options.url.split('?')[1];
    const params = new URLSearchParams(query);
    const page = params.get('page_num');
    const page_size = params.get('page_size');
    console.log({ page, page_size })
    // if (page == 1) {
    //     return {
    //         err: null,
    //         data: {
    //             count: 100,
    //             comments: [
    //               {
    //                 "comment_id": "37",
    //                 "user_id": 14,
    //                 "user_name": "钭沐辰",
    //                 "avatar": "https://avatars.githubusercontent.com/u/42298206",
    //                 "like_status": "id et sint ut sit",
    //                 "comment_content": "officia aliqua laboris occaecat adipisicing",
    //                 "like_count": 13,
    //                 "create_time": "2025-07-28",
    //                 "reply_to_id": "67",
    //                 "reply_to_name": "念敏",
    //                 "under_comment_id":"1"
    //             },
    //             {
    //                 "comment_id": "23",
    //                 "user_id": 21,
    //                 "user_name": "艾治文",
    //                 "avatar": "https://avatars.githubusercontent.com/u/22323861",
    //                 "like_status": "sunt",
    //                 "comment_content": "pariatur occaecat laboris ex",
    //                 "like_count": 96,
    //                 "create_time": "2024-12-18",
    //                 "reply_to_id": "36",
    //                 "reply_to_name": "别艳",
    //                 "under_comment_id":"1"
    //             },
    //             {
    //                 "comment_id": "24",
    //                 "user_id": 34,
    //                 "user_name": "能艺涵",
    //                 "avatar": "https://avatars.githubusercontent.com/u/54125787",
    //                 "like_status": "quis commodo sint",
    //                 "comment_content": "non irure commodo",
    //                 "like_count": 87,
    //                 "create_time": "2024-07-14",
    //                 "reply_to_id": "32",
    //                 "reply_to_name": "檀一诺",
    //                 "under_comment_id":"1"
    //             }
    //           ]
    //         }
    //     }
    // }
    // else if (page == 2) {
    //     return {
    //         err: null,
    //         data: {
    //             count: 100,
    //             comments: [
    //               {
    //                 "comment_id": "37",
    //                 "user_id": 14,
    //                 "user_name": "钭沐辰",
    //                 "avatar": "https://avatars.githubusercontent.com/u/42298206",
    //                 "like_status": "id et sint ut sit",
    //                 "comment_content": "officia aliqua laboris occaecat adipisicing",
    //                 "like_count": 13,
    //                 "create_time": "2025-07-28",
    //                 "reply_to_id": "",
    //                 "reply_to_name": "",
    //                 "under_comment_id":""
    //             },
    //           ]
    //         }
    //     }
    // }
    return {
              err: null,
              data: {
                  count: 100,
                  comments: [
                    {
                      "comment_id": "37",
                      "user_id": 14,
                      "user_name": "钭沐辰",
                      "avatar": "https://avatars.githubusercontent.com/u/42298206",
                      "like_status": "id et sint ut sit",
                      "comment_content": "officia aliqua laboris occaecat adipisicing",
                      "like_count": 13,
                      "create_time": "2025-07-28",
                      "reply_to_id": "",
                      "reply_to_name": "",
                      "under_comment_id":""
                  },
                  {
                    "comment_id": "22",
                    "user_id": 10,
                    "user_name": "makima",
                    "avatar": "https://avatars.githubusercontent.com/u/42298206",
                    "like_status": "id et sint ut sit",
                    "comment_content": "officia aliqua laboris occaecat adipisicingofficia aliqua laboris occaecat adipisicingofficia aliqua laboris occaecat adipisicingofficia aliqua laboris occaecat adipisicingofficia aliqua laboris occaecat adipisicingofficia aliqua laboris occaecat adipisicingofficia aliqua laboris occaecat adipisicingofficia aliqua laboris occaecat adipisicingofficia aliqua laboris occaecat adipisicingofficia aliqua laboris occaecat adipisicingofficia aliqua laboris occaecat adipisicingofficia aliqua laboris occaecat adipisicingofficia aliqua laboris occaecat adipisicing",
                    "like_count": 13,
                    "create_time": "2025-07-27",
                    "reply_to_id": "14",
                    "reply_to_name": "钭沐辰",
                    "under_comment_id":"37"
                  },
                  {
                    "comment_id": "2",
                    "user_id": 10,
                    "user_name": "sbsbsbsb",
                    "avatar": "https://avatars.githubusercontent.com/u/42298206",
                    "like_status": "id et sint ut sit",
                    "comment_content": "officia aliqua laboris occaecat adipisicing",
                    "like_count": 13,
                    "create_time": "2025-07-28",
                    "reply_to_id": "22",
                    "reply_to_name": "makima",
                    "under_comment_id":"37"
                  },
                  {
                    "comment_id": "111",
                    "user_id": 111,
                    "user_name": "IVE",
                    "avatar": "https://avatars.githubusercontent.com/u/42298206",
                    "like_status": "id et sint ut sit",
                    "comment_content": "officia aliqua laboris occaecat adipisicing",
                    "like_count": 13,
                    "create_time": "2025-07-12",
                    "reply_to_id": "",
                    "reply_to_name": "",
                    "under_comment_id":""
                  },
                  {
                    "comment_id": "111",
                    "user_id": 111,
                    "user_name": "IVE_LOVE",
                    "avatar": "https://avatars.githubusercontent.com/u/42298206",
                    "like_status": "id et sint ut sit",
                    "comment_content": "officia aliqua laboris occaecat adipisicing",
                    "like_count": 13,
                    "create_time": "2025-07-02",
                    "reply_to_id": "111",
                    "reply_to_name": "IVE",
                    "under_comment_id":"111"
                  },
                ]
              }
          }
}
)
