import handler from "../dist/server/server.js";

export default async function (req, res) {
  const url = `https://${req.headers.host}${req.url}`;
  const request = new Request(url, {
    method: req.method,
    headers: req.headers,
    body: ["GET", "HEAD"].includes(req.method) ? undefined : req,
    duplex: "half",
  });
  const response = await (handler.fetch ?? handler)(request);
  res.statusCode = response.status;
  response.headers.forEach((v, k) => res.setHeader(k, v));
  const body = await response.arrayBuffer();
  res.end(Buffer.from(body));
}
