/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  //  throw new Error('Not implemented');
  return {
    width,
    height,
    getArea: () => width * height,
  };
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  // throw new Error('Not implemented');
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, obj) {
  //  throw new Error('Not implemented');
  const parsedObj = JSON.parse(obj);
  return Object.setPrototypeOf(parsedObj, proto);
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

/*
const cssSelectorBuilder = {
  element( value ) {
    throw new Error('Not implemented');
  },

  id(/* value ) {
    throw new Error('Not implemented');
  },

  class(/* value ) {
    throw new Error('Not implemented');
  },

  attr(/* value ) {
    throw new Error('Not implemented');
  },

  pseudoClass(/* value ) {
    throw new Error('Not implemented');
  },

  pseudoElement(/* value ) {
    throw new Error('Not implemented');
  },

  combine(/* selector1, combinator, selector2 ) {
    throw new Error('Not implemented');
  },
};
*/

class MySelector {
  constructor() {
    this.order = 0;
    this.ELEMENT = undefined;
    this.ID = undefined;
    this.CLASSES = [];
    this.ATTRS = [];
    this.PSEUDOCLASSES = [];
    this.PSEUDOELEMENT = undefined;
    this.combined = '';
  }

  checkOrder(order) {
    if (this.order > order) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    this.order = order;
  }

  element(val) {
    this.checkOrder(1);
    if (this.ELEMENT) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
    this.ELEMENT = val;
    return this;
  }

  id(val) {
    this.checkOrder(2);
    if (this.ID) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
    this.ID = `#${val}`;
    return this;
  }

  class(val) {
    this.checkOrder(3);
    this.CLASSES.push(`.${val}`);
    return this;
  }

  attr(val) {
    this.checkOrder(4);
    const atttribute = `[${val}]`;
    this.ATTRS.push(atttribute);
    return this;
  }

  pseudoClass(val) {
    this.checkOrder(5);
    this.PSEUDOCLASSES.push(`:${val}`);
    return this;
  }

  pseudoElement(val) {
    this.checkOrder(6);
    if (this.PSEUDOELEMENT) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
    this.PSEUDOELEMENT = `::${val}`;
    return this;
  }

  combine(selector1, combinator, selector2) {
    this.combined = `${selector1.stringify()} ${combinator} ${selector2.stringify()}`;
    return this;
  }

  stringify() {
    const element = this.ELEMENT ? this.ELEMENT : '';
    const id = this.ID ? this.ID : '';
    const classes = this.CLASSES.length ? this.CLASSES.join('') : '';
    const attrs = this.ATTRS.length ? (this.ATTRS.join('')) : '';
    const pseudoClasses = this.PSEUDOCLASSES.length ? this.PSEUDOCLASSES.join('') : '';
    const pseudoElement = this.PSEUDOELEMENT ? this.PSEUDOELEMENT : '';
    return element + id + classes + attrs + pseudoClasses + pseudoElement + this.combined;
  }
}

const cssSelectorBuilder = {
  element(value) {
    // вызывает методы из cssSelectorBuilder только в первый раз,
    // когда создает builder = cssSelectorBuilder
    // и вызывает первый метод builder.
    // далее работает толко с MySelector. поэтому надо одиноково называть методы
    return new MySelector().element(value);
  },

  id(value) {
    return new MySelector().id(value);
  },

  class(value) {
    return new MySelector().class(value);
  },

  attr(value) {
    return new MySelector().attr(value);
  },

  pseudoClass(value) {
    return new MySelector().pseudoClass(value);
  },

  pseudoElement(value) {
    return new MySelector().pseudoElement(value);
  },

  combine(selector1, combinator, selector2) {
    return new MySelector().combine(selector1, combinator, selector2);
  },
};


module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
