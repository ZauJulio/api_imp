function getPostData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function getReqBody(req) {
  const body = await getPostData(req);
  return JSON.parse(body);
}

module.exports = getReqBody;
