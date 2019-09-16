import { RequestWrapper } from "./requestwrapper";

export class RealtimeAPI {
    url: string = 'https://realtime.ifttt.com/v1/notifications';
    requestWrapper: RequestWrapper = new RequestWrapper({
        urlPrefix: 'https://realtime.ifttt.com/v1'
    });
    constructor() {
    }
    public notify(triggerId: string): Promise<any> {
        return this.requestWrapper.send({
            endpoint: '/notifications',
            method: 'POST',
            payload: {
                "data": [
                    {
                        'trigger_identity': triggerId
                    }
                ]
            }
        });
    }
}