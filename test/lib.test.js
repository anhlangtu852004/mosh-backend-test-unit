const lib = require("../lib");
describe("absoulte", () => {
  it("absolute greater than 0", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it("absolute less than 0", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it("absolute 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe("greeting", () => {
  it("should return welcome greeting", () => {
    const result = lib.greet("mosh");
    // expect(result).toMatch(/mosh/);
    expect(result).toContain("mosh");
  });
});

describe("array", () => {
  it("chua cac tien te", () => {
    const result = lib.getCurrencies();
    expect(result).toEqual(expect.arrayContaining(["USD", "AUD"]));
  });
});
