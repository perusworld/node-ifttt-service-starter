import { RequestWrapper } from "../src/requestwrapper";

export function requestWrapper(url: string = 'http://localhost:3000/ifttt/v1/'): RequestWrapper {
  return new RequestWrapper({
    urlPrefix: process.env.BACKEND_API_URL || url
  });
}

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

it("base request test //NOOP", () => {
});
