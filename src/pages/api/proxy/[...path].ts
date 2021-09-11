import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import { IncomingMessage, ServerResponse } from 'http';
import httpProxy from 'http-proxy';
import Cookies from 'cookies';
import { URL } from 'url';
import { KEY_TOKEN_COOKIE } from '@/constants';

const ServerError = (
  err: any,
  _: NextApiRequest | IncomingMessage,
  res: NextApiResponse | ServerResponse,
  selfHandleResponse: boolean
) => {
  if (selfHandleResponse) {
    res.writeHead(500, {
      'Content-Type': 'text/plain',
    });

    res.end(
      'Something went wrong. And we are reporting a custom error message.'
    );
  }

  console.error(JSON.stringify(err, null, 2));

  return Promise.resolve();
};

const API_URL = process.env.API_URL!;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const proxy = httpProxy.createProxyServer();

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>(resolve => {
    const pathname = new URL(req.url!, BASE_URL).pathname;

    const selfHandleResponse = !!pathname?.match(/\/login|\/register/)?.length;

    const cookies = new Cookies(req, res);

    const token = cookies.get(KEY_TOKEN_COOKIE);

    req.url = req.url!.replace(/^\/api\/proxy/, '');

    const lang = req.headers.referer?.match(/\/ar\/|\/ar$/)?.length
      ? 'ar'
      : 'en';

    req.headers.cookie = '';

    req.headers['accept-language'] = lang;
    if (token) req.headers['authorization'] = `Bearer ${token}`;

    process.env.NODE_ENV === 'development' &&
      console.log(
        '\nsending request:',
        JSON.stringify(
          {
            domain: API_URL,
            url: req.url,
            auth: !!req.headers['authorization'],
            lang: req.headers['accept-language'],
          },
          null,
          2
        )
      );

    proxy
      .once('proxyRes', (proxyRes, _req, _res) => {
        const req = _req as NextApiRequest;
        const res = _res as NextApiResponse;
        if (selfHandleResponse) {
          let responseBody = '';
          proxyRes.on('data', (chunk: string) => {
            responseBody += chunk;
          });

          proxyRes.on('end', () => {
            try {
              const cookies = new Cookies(req, res);

              const result: any = JSON.parse(responseBody);

              if (typeof result.token === 'undefined') {
                cookies.set(KEY_TOKEN_COOKIE, undefined);

                res.status(proxyRes.statusCode ?? 400).json(result);
              } else {
                const { user, token } = result;

                cookies.set(KEY_TOKEN_COOKIE, token, {
                  httpOnly: true,
                  sameSite: 'lax', // CSRF protection
                });

                res.status(proxyRes.statusCode ?? 200).json({
                  user,
                  token: '',
                });
              }

              return resolve();
            } catch (err) {
              return ServerError(err, req, res, selfHandleResponse);
            }
          });
        } else {
          return resolve();
        }
      })
      .once('error', (err, req, res) =>
        ServerError(err, req, res, selfHandleResponse)
      )
      .web(req, res, {
        target: API_URL,
        selfHandleResponse,
        changeOrigin: true,
      });
  });
};

export const config: PageConfig = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default handler;
