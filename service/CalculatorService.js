import CalculatorView from "../view/CalculatorView.js";

const view = new CalculatorView();
export default class CalculatorService {
    constructor(emitter, operations) {
        emitter.on("/add", (operands,response) => {
           this.writeResult(operands[0] + operands[1], response)
        }) 
    }
    writeResult(result, response) {
        response.write(view.getHtml(result, false));
        response.end();
    }
}