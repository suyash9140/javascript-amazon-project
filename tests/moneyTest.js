import { formatC } from "../scripts/utils/money.js";

console.log('test suite: formatC');

console.log('converts cents into dollars');

if(formatC(2095)=='20.95'){
  console.log('passed');
}
else{
  console.log('failed');
}

console.log('works with 0');

if(formatC(0)=='0.00'){
  console.log('passed');
}
else{
  console.log('failed');
}

console.log('rounds up to the nearest cent');

if(formatC(2000.5)=='20.01'){
  console.log('passed');
}
else{
  console.log('failed');
}