import { formatC } from "../scripts/utils/money.js";

describe('test suite: formatC', ()=>{
   it('converts cents into dollars', ()=>{
    expect(formatC(2095)).toEqual('20.95');
   });
   it('works with 0', ()=>{
    expect(formatC(0)).toEqual('0.00');
   });
   it('rounds up to the nearest cent', ()=>{
    expect(formatC(2000.5)).toEqual('20.01');
   });
});