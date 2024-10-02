import {greeting} from "./index"
test('test', () => {
    expect(greeting).toEqual("Hello World!")
})