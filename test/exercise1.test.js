const { fizzBuzz } = require("../exercise1");
describe("fizzbug", () => {
  it("should throw error if typeof input <> number", () => {
    expect(() => {
      fizzBuzz("a");
    }).toThrow();
    expect(() => {
      fizzBuzz(null);
    }).toThrow();
  });
  it("should return FizzBuzz if input%3 and 5", () => {
    const result = fizzBuzz(15);
    expect(result).toBe("FizzBuzz");
  });
  it("should return FizzBuzz if input%3", () => {
    const result = fizzBuzz(3);
    expect(result).toBe("Fizz");
  });
  it("should return FizzBuzz if input%5", () => {
    const result = fizzBuzz(5);
    expect(result).toEqual("Buzz");
  });
  it("should return INPUT", () => {
    const result = fizzBuzz(4);
    expect(result).toBe(4);
  });
});
