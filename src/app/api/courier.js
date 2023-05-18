//I had a small idea about using webhooks so started but didn't continue but maybe I will use this one day

export default (req, res) => {
    if (req.method === "POST") {
      req.context.io.emit("alert", req.body);
      res.status(200).send("ok");
    } else {
      res.satus(405).send();
    }
  };