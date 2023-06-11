let i = 0;
let timeout = null;
let lastTime = 0;
let end = false;

const timedCount = function timedCount() {
  i += 1;
  postMessage(i);
  if (timeout) {
    clearTimeout(timeout);
  }
  if (end) {
    return;
  }
  const time = Date.now();
  const during = 1000 - time + lastTime;
  lastTime = time;

  timeout = setTimeout(timedCount, during);
};

self.onmessage = function (ev) {
  const { data } = ev;
  if (data.type === 'start') {
    end = false;
    lastTime = Date.now();
    timedCount();
    setTimeout(() => {
      console.log('===============', Date.now() - lastTime);
    }, 2000);
  } else if (data.type === 'end') {
    i = 0;
    end = true;
    clearTimeout(timeout);
  }
};
