const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");

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

describe("object", () => {
  it("test object", () => {
    const result = lib.getProduct(1);
    // expect(result).toEqual({ id: 1, price: 10 });

    // expect(result).toMatchObject({ id: 1, price: 10 });
    expect(result).toHaveProperty("id", 1);
  });
});

describe("throw error", () => {
  it("should throw error if pass falsy to argument", () => {
    const args = [null, undefined, "", 0, false, NaN];
    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });
  it("should return object if valid name is passed", () => {
    const result = lib.registerUser("mosh");
    expect(result).toMatchObject({ username: "mosh" });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe("applyDiscount", () => {
  it("should apply 10% if customer has point > 10", () => {
    db.getCustomerSync = function (customerId) {
      console.log("fake call api server.....");
      return { id: customerId, points: 20 };
    };

    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe("notifyCustomer", () => {
  it("send email to customer", () => {
    db.getCustomerSync = function (customerid) {
      return { email: "a" };
    };
    let toSend = false;
    mail.send = function (emial, customer) {
      toSend = true;
    };
    lib.notifyCustomer({ customerid: 1 });
    expect(toSend).toBe(true);
  });
});

describe("mockfuntcion", () => {
  it("send email to customer with mockfuntion", () => {
    db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });
    // con cac loai return khac nhu
    // mockResolvedValue
    // mockRejectrdValue

    mail.send = jest.fn();

    lib.notifyCustomer({ customerId: 1 });

    expect(mail.send).toHaveBeenCalled();

    // mail.send la mock function
    //mail.send.mock la moc function co 1 thuoc tinh mock
    //mail.send.mock.call la quan ly het cai mock function da dc goi, tra ve 1 array,
    // o day la goi lan dau tien nen la so 0, so 0 thu 2 la argument truyen vao,
    //mock.send cos 2 argument, nen se laf 0 va 1
    expect(mail.send.mock.calls[0][0]).toBe("a");
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);
  });
});
