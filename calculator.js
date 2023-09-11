import http from 'node:http';
import config from 'config';
import {operations} from './config/operations.js'
import {URL, URLSearchParams} from 'url'
import CalculatorService from './service/CalculatorService.js';
const server = http.createServer();
const port = process.env.PORT || config.has('server.port') && config.get('server.port') || 0;
const calculatorService = new CalculatorService(server, operations);
server.listen(port, () => console.log(`server is listening on the port ${server.address().port}`))
server.on('request', (req, res) => {
   res.setHeader('content-type', 'text/html')
    const reqUrl = new URL(`http://${req.headers.host}${req.url}`);
    let result;
    const operands = reqUrl.searchParams;
    const op1 = +operands.get('op1');
    const op2 = +operands.get('op2');
   server.emit('/add', [op1, op2], res);
    
    
})