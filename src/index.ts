import { Route } from '@origami/core-lib';
import { Server } from '@origami/core-server';
import * as path from 'path';
export interface SPAOptions {
    fallback: string;
}

module.exports = (server: Server, options: SPAOptions) => {
    const r = new Route('*')
        .position('post-render')
        .use(async (req, res, next) => {
            const body =
                res.locals.content.get() ||
                // @ts-ignore Support legacy code
                res.body ||
                // @ts-ignore Support legacy code
                res.text ||
                // @ts-ignore Support legacy code
                res.data ||
                // @ts-ignore Support legacy code
                res.responseCode;

            if (!res.headersSent && !body) {
                res.sendFile(path.resolve(process.cwd(), options.fallback));
            } else next();
        });

    server.useRouter(r);
};
