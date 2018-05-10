import * as path from 'path';
import Server, {Route} from 'origami-core-server';

export interface SPAOptions {
    fallback: string;
}

module.exports = (server: Server, options: SPAOptions) => {
    const r = new Route('*')
        .position('post-render')
        .use(async (req, res, next) => {
            const body = res.body || res.text || res.data;
            if (!res.headersSent && !body) res.sendFile(path.resolve(process.cwd(), options.fallback));
            else next();
        });

    server.useRouter(r);
};
