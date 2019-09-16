import { RealtimeAPI } from "../src/realtime-api";

let triggerId: string = `${process.env.TRIGGER_ID}`;


describe("check sayHello", () => {

    it("should say hello", (done) => {
        let impl = new RealtimeAPI();
        impl.notify(triggerId).then(resp => {
            console.log(JSON.stringify(resp, null, 2));
            done();
        }).catch(err => {
            console.log(err);
            expect(err).toBeNull();
        });
    });

});
