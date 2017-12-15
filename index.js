const notifier = require("node-notifier");

function notify() {
  notifier.notify({
    title: "Husk å føre timer",
    message: "Hva har du gjort den siste timen?",
    wait: true
  });
}

function notifyAtTime(date) {
  const now = new Date();
  setTimeout(notify, date - now);
}

function quarterToFour() {
  const d = new Date();
  d.setMinutes(45);
  d.setHours(15);
  return d;
}

function main() {
  const times = [9, 10, 11, 12, 13, 14, 15]
    .map(n => {
      const d = new Date();
      d.setMinutes(0);
      d.setHours(n);
      return d;
    })
    .concat(quarterToFour())
    .filter(time => time - new Date() > 0);
  times.forEach(time => notifyAtTime(time));
}

main();
