const access = crypto.randomUUID().toString("hex");
const refresh = crypto.randomUUID().toString("hex");

console.table(access, refresh);
