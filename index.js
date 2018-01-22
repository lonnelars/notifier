#!/usr/bin/env node

const notifier = require("node-notifier");

function notify() {
  notifier.notify({
    title: "Husk å føre timer",
    message: "Hva har du gjort den siste timen?",
    timeout: 120
  });
}

function notifyAtTime(date) {
  const interval = setInterval(() => {
    if (Math.abs(date - new Date()) < 10000) {
      notify();
      clearInterval(interval);
    }
  }, 10000);
}

function quarterToFour() {
  const d = new Date();
  d.setMinutes(45);
  d.setHours(15);
  return d;
}

function endOfDay() {
  const d = new Date();
  d.setSeconds(0);
  d.setMinutes(0);
  d.setHours(16);
  return d;
}

function main() {
  const times = [9, 10, 11, 12, 13, 14, 15]
    .map(n => {
      const d = new Date();
      d.setSeconds(0);
      d.setMinutes(0);
      d.setHours(n);
      return d;
    })
    .concat(quarterToFour())
    .filter(time => time - new Date() > 0);
  times.forEach(time => notifyAtTime(time));
  setInterval(() => {
    if (new Date() - endOfDay() > 0) {
      process.exit(0);
    }
  }, 60 * 1000);
}

main();
