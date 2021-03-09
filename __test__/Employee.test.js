
//testing information for Employee class, which isn't used directly, but is inherited by several other classes in the app.
const Employee = require('../lib/Employee');

test('creates an Employee object', () => {
    const employee = new Employee('Dwight', 123, 'dwight@dunder-mifflin.com');

    expect(employee.name).toEqual(expect.any(String));
    expect(employee.id).toEqual(expect.any(Number));
    expect(employee.email).toEqual(expect.any(String));
});

test("gets an employee's name", () => {
    const employee = new Employee('Dwight', 123, 'dwight@dunder-mifflin.com');

    expect(employee.getName()).toEqual(employee.name);
});

test("gets an employee's id", () => {
    const employee = new Employee('Dwight', 123, 'dwight@dunder-mifflin.com');

    expect(employee.getId()).toEqual(employee.id);
});

test("gets an employee's email", () => {
    const employee = new Employee('Dwight', 123, 'dwight@dunder-mifflin.com');

    expect(employee.getEmail()).toEqual(employee.email);
});

test("gets an employee's role", () => {
    const employee = new Employee('Dwight', 123, 'dwight@dunder-mifflin.com');

    expect(employee.getRole()).toEqual('Employee');
});