import * as formatter from "./formatter"
// @ponicode
describe("formatter.formatCurrency", () => {
    test("0", () => {
        let callFunction: any = () => {
            formatter.formatCurrency(-100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            formatter.formatCurrency(0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            formatter.formatCurrency(1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            formatter.formatCurrency(-5.48)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            formatter.formatCurrency(100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            formatter.formatCurrency(Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})
