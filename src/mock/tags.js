import Mock from "mockjs";

Mock.mock(/\/api\/tags\//, 'get', () => {
    const data = [
        {
            id: 1,
            name: '链表',
            parent: null,
        },
        {
            id: 2,
            name: '数组',
            parent: null,
        },
        {
            id: 3,
            name: '双向链表',
            parent: 1,
        },
        {
            id: 4,
            name: '哈希表',
            parent: 2,
        }
    ]
    return {
        err: null,
        data: data
    }
})