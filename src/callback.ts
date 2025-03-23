export function timer(callback) {
  setTimeout(() => {
    callback("success");
  }, 10_000);
}
