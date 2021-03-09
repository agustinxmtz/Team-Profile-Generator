//tests for the Manager class. tests object creation and each of the class methods.
const Manager = require('../lib/Manager');

test('creates a Manager object', () => {
    const manager = new Manager('michael', 99, 'michael@dunder-mifflin.com', 104);

    expect(manager.name).toEqual(expect.any(String));
    expect(manager.id).toEqual(expect.any(Number));
    expect(manager.email).toEqual(expect.any(String));
    expect(manager.officeNumber).toEqual(expect.any(Number));
});

test("gets a manager's role", () => {
    const manager = new Manager('michael', 99, 'michael@dunder-mifflin.com', 104);

    expect(manager.getRole()).toEqual('Manager');
});

test("gets a manager's office number", () => {
    const manager = new Manager('michael', 99, 'michael@dunder-mifflin.com', 104);

    expect(manager.getOfficeNumber()).toEqual(expect.any(Number));
});
