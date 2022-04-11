import {rest } from 'msw';

export const handlers = [
    rest.get('http://localhost:8000/api/bibleverse-list', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([{description: 'Test1'}])
        )
    })
   
]