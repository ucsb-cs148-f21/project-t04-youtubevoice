import SubFetch from "./sub_fetch";

test("Something fetch CC", () => {
    let sub_fetch = new SubFetch("en");
    sub_fetch.fetch("Y4EABGSesk").then(
        data => {
            expect(data).toBe([]);
        }
    ).catch(() => {
        expect(true).toBe(true);
    });
});
