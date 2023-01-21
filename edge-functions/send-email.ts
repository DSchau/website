import type { Config, Context } from 'https://edge.netlify.com/'

function sendEmail(req: Request, context: Context) {
  console.log(context.ip);
  return Response.json({ hello: "world" });
}

export default sendEmail

export const config: Config = { path: '/api/send-email' };
