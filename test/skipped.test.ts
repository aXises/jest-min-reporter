describe("Skipped tests", () => {
    it("Should only test this", () => {
        expect(true).toBe(true);
    });

    it.skip("Should skip this", () => {
        expect(true).toBe(true);
    });

    it.skip("Should ship this as well", () => {
        expect(true).toBe(false);
    });
});
