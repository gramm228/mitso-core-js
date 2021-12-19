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
 * 
Blunt wrap, rip like tissue (tissue)
I got way too many issues (bitch)
Bad thoughts drop like missiles
Geronimo, you know Bones gonna miss you (bye)
Sunny came home with a mission (mission)
I done tried to put 'em on nutrition (nutrition)
But the point was something that they was missing
I can scream it, but I promise these bitches they wouldn't listen
In the dark but somehow the grave still shining
Off in the cave with the bats reclining
Feet up on the rocks, ring flash like lighting
We the weathermen, change the weather, no lying
Shit don't ever get hard, it just get better
High before I get up, remember when I was fed up
Shit don't ever get hard, it just get better
High before I get up, remember when I was fed up with life
Like I was begging to die*/
//passed
function Rectangle(width, height) 
{
  return {
    width,
    height,
    getArea() {
      return this.width * this.height;
    },
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
// passed
function getJSON(obj) {
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
//passed
function fromJSON(proto, json) {
  const rez = JSON.parse(json);
  Object.setPrototypeOf(rez, proto);
  return rez;
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

const cssSelectorBuilder = 
{
  selector: "",
  checkOrder(order) {
    if (this.curOrder > order) throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    if (this.curOrder === order && (order === 1 || order === 2 || order === 6)) throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
  },
  element(value) 
  {
    this.checkOrder(1);
    const rez = Object.create(cssSelectorBuilder);
    rez.curOrder = 1;
    rez.selector = this.selector + value;
    return rez;
  },

  id(value) 
  {
    this.checkOrder(2);
    const rez = Object.create(cssSelectorBuilder);
    rez.curOrder = 2;
    rez.selector = `${this.selector}#${value}`;
    return rez;
  },

  class(value)
  {
    this.checkOrder(3);
    const rez = Object.create(cssSelectorBuilder);
    rez.curOrder = 3;
    rez.selector = `${this.selector}.${value}`;
    return rez;
  },

  attr(value) 
  {
    this.checkOrder(4);
    const rez = Object.create(cssSelectorBuilder);
    rez.curOrder = 4;
    rez.selector = `${this.selector}[${value}]`;
    return rez;
  },

  pseudoClass(value) 
  {
    this.checkOrder(5);
    const rez = Object.create(cssSelectorBuilder);
    rez.curOrder = 5;
    rez.selector = `${this.selector}:${value}`;
    return rez;
  },

  pseudoElement(value) 
  {
    this.checkOrder(6);
    const rez = Object.create(cssSelectorBuilder);
    rez.curOrder = 6;
    rez.selector = `${this.selector}::${value}`;
    return rez;
  },

  combine(selector1, combinator, selector2) {
    const rez = Object.create(cssSelectorBuilder);
    rez.selector = `${selector1.selector} ${combinator} ${selector2.selector}`;
    return rez;
  },

  stringify() 
  {
    return this.selector;
  }
};

module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};