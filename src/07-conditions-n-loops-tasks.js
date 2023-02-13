/* *************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling  *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration              *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the 'Fizz','Buzz' or an original number using the following rules:
 * 1) return original number
 * 2) but if number multiples of three return 'Fizz'
 * 3) for the multiples of five return 'Buzz'
 * 4) for numbers which are multiples of both three and five return 'FizzBuzz'
 *
 * @param {number} num
 * @return {any}
 *
 * @example
 *   2 =>  2
 *   3 => 'Fizz'
 *   5 => 'Buzz'
 *   4 => 4
 *  15 => 'FizzBuzz'
 *  20 => 'Buzz'
 *  21 => 'Fizz'
 *
 */
function getFizzBuzz(num) {
  // throw new Error('Not implemented');
  if (num % 3 === 0 && num % 5 === 0) {
    return 'FizzBuzz';
  }
  if (num % 3 === 0) {
    return 'Fizz';
  }
  if (num % 5 === 0) {
    return 'Buzz';
  }
  return num;
}


/**
 * Returns the factorial of the specified integer n.
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   1  => 1
 *   5  => 120
 *   10 => 3628800
 */
function getFactorial(n) {
  //  throw new Error('Not implemented');
  let i = 1;
  let res = 1;
  while (i <= n) {
    res *= i;
    i += 1;
  }
  return res;
}


/**
 * Returns the sum of integer numbers between n1 and n2 (inclusive).
 *
 * @param {number} n1
 * @param {number} n2
 * @return {number}
 *
 * @example:
 *   1,2   =>  3  ( = 1+2 )
 *   5,10  =>  45 ( = 5+6+7+8+9+10 )
 *   -1,1  =>  0  ( = -1 + 0 + 1 )
 */
function getSumBetweenNumbers(n1, n2) {
  //  throw new Error('Not implemented');
  let res = 0;
  let i = n1;
  while (i <= n2) {
    res += i;
    i += 1;
  }
  return res;
}


/**
 * Returns true, if a triangle can be built with the specified sides a, b, c
 * and false in any other ways.
 * Треугольник можно построить в том случае,
 *  если сумма длин двух любых его сторон больше длины третьей стороны.
 *
 * Треугольник можно построить, если сумма длин
 * его двух меньших сторон больше длины большей стороны
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {bool}
 *
 * @example:
 *   1,2,3    =>  false
 *   3,4,5    =>  true
 *   10,1,1   =>  false
 *   10,10,10 =>  true
 */
function isTriangle(a, b, c) {
  //  throw new Error('Not implemented');
  const arr = [a, b, c].sort((x, y) => x - y);
  return arr[0] + arr[1] > arr[2];
}


/**
 * Returns true, if two specified axis-aligned rectangles overlap, otherwise false.
 * Each rectangle representing by object
 *  {
 *     top: 5,
 *     left: 5,
 *     width: 20,
 *     height: 10
 *  }
 *
 *  (5;5)
 *     -------------
 *     |           |
 *     |           |  height = 10
 *     -------------
 *        width=20
 *
 * NOTE: Please use canvas coordinate space (https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#The_grid),
 * it differs from Cartesian coordinate system.
 *
 * @param {object} rect1
 * @param {object} rect2
 * @return {bool}
 *
 * @example:
 *   { top: 0, left: 0, width: 10, height: 10 },
 *   { top: 5, left: 5, width: 20, height: 20 }    =>  true
 *
 *   { top: 0, left: 0, width: 10, height: 10 },
 *   { top:20, left:20, width: 20, height: 20 }    =>  false
 *
 */
function doRectanglesOverlap(rect1, rect2) {
  //  throw new Error('Not implemented');
  /* x1y1          x2y1
        -------------
        |           |
        |           |  height = 10
        -------------
      x1y2         x2y2
         width = 20
         прямоугольники пересекаются, если хотя бы
         одна точка лежит внутри другого прямоугольника
  */
  // вычисляем координаты для первого прямоугольника
  const x1 = rect1.top;
  const y1 = rect1.left;
  const x2 = x1 + rect1.width;
  const y2 = y1 + rect1.height;
  // координаты для второго прямоугольника
  const xx1 = rect2.top;
  const yy1 = rect2.left;
  const xx2 = xx1 + rect2.width;
  const yy2 = yy1 + rect2.height;
  // проверяем принадлежность точек первого второму
  const xx1IsBelong = x1 <= xx1 && xx1 <= x2;
  const xx2IsBelong = x1 <= xx2 && xx2 <= x2;
  const yy1IsBelong = y1 <= yy1 && yy1 <= y2;
  const yy2IsBelong = y1 <= yy2 && yy2 <= y2;
  // проверяем принадлежность точек второго первому
  const x1IsBelong = xx1 <= x1 && x1 <= xx2;
  const x2IsBelong = xx1 <= x2 && x2 <= xx2;
  const y1IsBelong = yy1 <= y1 && y1 <= yy2;
  const y2IsBelong = yy1 <= y2 && y2 <= yy2;
  // если хоть одна принадлежит -> true
  return (xx1IsBelong && yy1IsBelong) || (xx2IsBelong && yy1IsBelong)
    || (xx1IsBelong && yy2IsBelong) || (xx2IsBelong && yy2IsBelong)
    || (x1IsBelong && y1IsBelong) || (x2IsBelong && y1IsBelong)
    || (x1IsBelong && y2IsBelong) || (x2IsBelong && y2IsBelong);
}


/**
 * Returns true, if point lies inside the circle, otherwise false.
 * Circle is an object of
 *  {
 *     center: {
 *       x: 5,
 *       y: 5
 *     },
 *     radius: 20
 *  }
 *
 * Point is object of
 *  {
 *     x: 5,
 *     y: 5
 *  }
 *
 * @param {object} circle
 * @param {object} point
 * @return {bool}
 *
 * @example:
 *   { center: { x:0, y:0 }, radius:10 },  { x:0, y:0 }     => true
 *   { center: { x:0, y:0 }, radius:10 },  { x:10, y:10 }   => false
 *
 */
function isInsideCircle(circle, point) {
  const x0 = circle.center.x;
  const y0 = circle.center.y;
  const r = circle.radius;
  const { x } = point;
  const { y } = point;
  return ((x - x0) ** 2) + ((y - y0) ** 2) < r ** 2;
}


/**
 * Returns the first non repeated char in the specified strings otherwise returns null.
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 *   'The quick brown fox jumps over the lazy dog' => 'T'
 *   'abracadabra'  => 'c'
 *   'entente' => null
 */
function findFirstSingleChar(str) {
  //  throw new Error('Not implemented');
  const arr = str.split('');
  const letter = arr.find((el, i) => {
    const arr1 = arr.slice(0, i); // разбиваем на массив до текщего значения
    const arr2 = arr.slice(i + 1); // и после
    if ((arr1.indexOf(el) === -1) && (arr2.indexOf(el) === -1)) {
      return el; // если нет ни до, ни после
    }
    return null;
  });
  return letter || null;
}


/**
 * Returns the string representation of math interval,
 * specified by two points and include / exclude flags.
 * See the details: https://en.wikipedia.org/wiki/Interval_(mathematics)
 *
 * Please take attention, that the smaller number should be the first in the notation
 *
 * @param {number} a
 * @param {number} b
 * @param {bool} isStartIncluded
 * @param {bool} isEndIncluded
 * @return {string}
 *
 * @example
 *   0, 1, true, true   => '[0, 1]'
 *   0, 1, true, false  => '[0, 1)'
 *   0, 1, false, true  => '(0, 1]'
 *   0, 1, false, false => '(0, 1)'
 * Smaller number has to be first :
 *   5, 3, true, true   => '[3, 5]'
 *
 */
function getIntervalString(a, b, isStartIncluded, isEndIncluded) {
  // throw new Error('Not implemented');
  const arr = [a, b].sort((x, y) => x - y);
  const startBracket = isStartIncluded ? '[' : '(';
  const endBracket = isEndIncluded ? ']' : ')';
  return `${startBracket}${arr[0]}, ${arr[1]}${endBracket}`;
}


/**
 * Reverse the specified string (put all chars in reverse order)
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 * 'The quick brown fox jumps over the lazy dog' => 'god yzal eht revo spmuj xof nworb kciuq ehT'
 * 'abracadabra' => 'arbadacarba'
 * 'rotator' => 'rotator'
 * 'noon' => 'noon'
 */
function reverseString(str) {
  //  throw new Error('Not implemented');
  return str.split('').reverse().join('');
}


/**
 * Reverse the specified integer number (put all digits in reverse order)
 *
 * @param {number} num
 * @return {number}
 *
 * @example:
 *   12345 => 54321
 *   1111  => 1111
 *   87354 => 45378
 *   34143 => 34143
 */
function reverseInteger(num) {
  //  throw new Error('Not implemented');
  return +`${num}`.split('').reverse().join('');
}


/**
 * Validates the CCN (credit card number) and return true if CCN is valid
 * and false otherwise.
 *
 * See algorithm here : https://en.wikipedia.org/wiki/Luhn_algorithm
 *
 * @param {number} cnn
 * @return {boolean}
 *
 * @example:
 *   79927398713      => true
 *   4012888888881881 => true
 *   5123456789012346 => true
 *   378282246310005  => true
 *   371449635398431  => true
 *
 *   4571234567890111 => false
 *   5436468789016589 => false
 *   4916123456789012 => false
 */
function isCreditCardNumber(ccn) {
  // throw new Error('Not implemented');
  const arr = `${ccn}`.split('').reverse();
  const newArr = arr.map((el, i) => {
    if (i % 2 === 0) {
      return +el;
    }
    const newEl = +el * 2;
    if (newEl > 9) {
      return (`${newEl}`.split('').reduce((acc, cur) => acc + +cur, 0));
    }
    return newEl;
  });
  const sum = newArr.reduce((acc, cur) => acc + +cur, 0);
  return sum % 10 === 0;
}

/**
 * Returns the digital root of integer:
 *   step1 : find sum of all digits
 *   step2 : if sum > 9 then goto step1 otherwise return the sum
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   12345 ( 1+2+3+4+5 = 15, 1+5 = 6) => 6
 *   23456 ( 2+3+4+5+6 = 20, 2+0 = 2) => 2
 *   10000 ( 1+0+0+0+0 = 1 ) => 1
 *   165536 (1+6+5+5+3+6 = 26,  2+6 = 8) => 8
 */
function getDigitalRoot(num) {
  let res = `${num}`.split('').reduce((acc, cur) => acc + +cur, 0);
  if (res > 9) {
    res = getDigitalRoot(res);
  }
  return res;
}


/**
 * Returns true if the specified string has the balanced brackets and false otherwise.
 * Balanced means that is, whether it consists entirely of pairs of opening/closing brackets
 * (in that order), none of which mis-nest.
 * Brackets include [],(),{},<>
 *
 * @param {string} str
 * @return {boolean}
 *
 * @example:
 *   '' => true
 *   '[]'  => true
 *   '{}'  => true
 *   '()   => true
 *   '[[]' => false
 *   ']['  => false
 *   '[[][][[]]]' => true
 *   '[[][]][' => false
 *   '{)' = false
 *   '{[(<{[]}>)]}' = true
 */
function isBracketsBalanced(str) {
  if (str.length === 0) {
    return true;
  }
  //  throw new Error('Not implemented');
  const obj = {
    '[': ']',
    '(': ')',
    '{': '}',
    '<': '>',
  };
  const arr = [str[0]];
  str.split('').slice(1).forEach((el) => {
    const lastBracket = arr[arr.length - 1];
    if (obj[lastBracket] === el) {
      arr.pop();
    } else {
      arr.push(el);
    }
  });
  return arr.length === 0;
}


/**
 * Returns the string with n-ary (binary, ternary, etc, where n <= 10)
 * representation of specified number.
 * See more about
 * https://en.wikipedia.org/wiki/Binary_number
 * https://en.wikipedia.org/wiki/Ternary_numeral_system
 * https://en.wikipedia.org/wiki/Radix
 *
 * @param {number} num
 * @param {number} n, radix of the result
 * @return {string}
 *
 * @example:
 *   1024, 2  => '10000000000'
 *   6561, 3  => '100000000'
 *    365, 2  => '101101101'
 *    365, 3  => '111112'
 *    365, 4  => '11231'
 *    365, 10 => '365'
 */
function toNaryString(num, n) {
  let rem = num % n;
  let div = (num - rem) / n;
  const arr = [rem];
  while (div >= n) {
    rem = div % n;
    div = (div - rem) / n;
    arr.push(rem);
  }
  arr.push(div);
  return arr.reverse().join('');
}


/**
 * Returns the common directory path for specified array of full filenames.
 *
 * @param {array} pathes
 * @return {string}
 *
 * @example:
 *   ['/web/images/image1.png', '/web/images/image2.png']  => '/web/images/'
 *   ['/web/assets/style.css', '/web/scripts/app.js',  'home/setting.conf'] => ''
 *   ['/web/assets/style.css', '/.bin/mocha',  '/read.me'] => '/'
 *   ['/web/favicon.ico', '/web-scripts/dump', '/verbalizer/logs'] => '/'
 */
function checkMatches(firstPath, slashIndex, pathes) {
  let str1 = firstPath;
  let index1 = slashIndex;
  for (let i = 1; i < pathes.length; i += 1) {
    if (!pathes[i].includes(str1)) {
      index1 = str1.lastIndexOf('/', index1 - 1);
      str1 = str1.slice(0, index1 + 1);
      if (str1 === '/') {
        const firstChar = pathes.reduce((acc, cur) => acc && cur.startsWith('/'), true);
        if (firstChar) { return '/'; }
        return '';
      }
      return checkMatches(str1, index1, pathes);
    }
  }
  return str1;
}

function getCommonDirectoryPath(pathes) {
  const str = pathes[0];
  const index = str.length;
  const res = checkMatches(str, index, pathes);
  return res;
}

/**
 * Returns the product of two specified matrixes.
 * See details: https://en.wikipedia.org/wiki/Matrix_multiplication
 *
 * @param {array} m1
 * @param {array} m2
 * @return {array}
 *
 * @example:
 *   [[ 1, 0, 0 ],       [[ 1, 2, 3 ],           [[ 1, 2, 3 ],
 *    [ 0, 1, 0 ],   X    [ 4, 5, 6 ],     =>     [ 4, 5, 6 ],
 *    [ 0, 0, 1 ]]        [ 7, 8, 9 ]]            [ 7, 8, 9 ]]
 *
 *                        [[ 4 ],
 *   [[ 1, 2, 3]]    X     [ 5 ],          =>     [[ 32 ]]
 *                         [ 6 ]]
 *
 */
function getMatrixProduct(m1, m2) {
  // создание двумерного массива
  // размерностью [m1.length х m1.length]
  const res = Array.from(new Array(m1.length), () => []);
  for (let i = 0; i < m1.length; i += 1) { // i - строки m1
    for (let k = 0; k < m2[0].length; k += 1) { // k - столбцы m2
      let el = 0;
      for (let j = 0; j < m2.length; j += 1) { // j - строки m2
        // вычисление элемента с индексом [i][k]
        el += m1[i][j] * m2[j][k];
      }
      // запись в результ массив
      res[i][k] = el;
    }
  }
  return res;
}


/**
 * Returns the evaluation of the specified tic-tac-toe position.
 * See the details: https://en.wikipedia.org/wiki/Tic-tac-toe
 *
 * Position is provides as 3x3 array with the following values: 'X','0', undefined
 * Function should return who is winner in the current position according to the game rules.
 * The result can be: 'X','0',undefined
 *
 * @param {array} position
 * @return {string}
 *
 * @example
 *
 *   [[ 'X',   ,'0' ],
 *    [    ,'X','0' ],       =>  'X'
 *    [    ,   ,'X' ]]
 *
 *   [[ '0','0','0' ],
 *    [    ,'X',    ],       =>  '0'
 *    [ 'X',   ,'X' ]]
 *
 *   [[ '0','X','0' ],
 *    [    ,'X',    ],       =>  undefined
 *    [ 'X','0','X' ]]
 *
 *   [[    ,   ,    ],
 *    [    ,   ,    ],       =>  undefined
 *    [    ,   ,    ]]
 *
 */

function checkRows(position) {
  const n = position.length;
  let firstEl;
  for (let i = 0; i < n; i += 1) {
    [firstEl] = [position[i][0]];
    for (let j = 1; j < n; j += 1) {
      if (firstEl !== position[i][j]) {
        break;
      } else if (j === n - 1 && firstEl !== undefined) { // 2 - дошли до конца строки
        return firstEl;
      }
    }
  }
  return undefined;
}

function checkDiagonals(positions) {
  const n = positions.length;
  let mainDiagonal = positions[0][0];
  let secondaryDiagonal = positions[0][n - 1];
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (i === j) { // главная диагональ матрицы
        if (mainDiagonal === positions[i][j]) {
          mainDiagonal = positions[i][j];
        } else {
          mainDiagonal = undefined;
        }
      }
      if (n - 1 === j + i) { // побочная диагональ матрицы
        if (secondaryDiagonal === positions[i][j]) {
          secondaryDiagonal = positions[i][j];
        } else {
          secondaryDiagonal = undefined;
        }
      }
    }
  }
  return (mainDiagonal || secondaryDiagonal || undefined);
}

function transposePosition(position) {
  const trPos = position;
  for (let i = 0; i < position.length; i += 1) {
    for (let j = 0; j < i; j += 1) {
      [trPos[i][j], trPos[j][i]] = [trPos[j][i], trPos[i][j]];
    }
  }
  return trPos;
}


function evaluateTicTacToePosition(position) {
  const rowResult = checkRows(position);
  const colResult = checkRows(transposePosition(position));
  const diagonalsResult = checkDiagonals(position);
  return rowResult || colResult || diagonalsResult || undefined;
}

module.exports = {
  getFizzBuzz,
  getFactorial,
  getSumBetweenNumbers,
  isTriangle,
  doRectanglesOverlap,
  isInsideCircle,
  findFirstSingleChar,
  getIntervalString,
  reverseString,
  reverseInteger,
  isCreditCardNumber,
  getDigitalRoot,
  isBracketsBalanced,
  toNaryString,
  getCommonDirectoryPath,
  getMatrixProduct,
  evaluateTicTacToePosition,
};
