const css = require('css');
const layout = require('./layout');

let currentToken = null;
let currentAttribute = null;
let currentTextNode = null;
const selectorPartRegExp = /[\.\#]?\w+/g; // 单个selectorPart匹配正则

let stack = [{ type: "document", children: []}];

// 加入一个新函数，addCSSRules，这里我们把CSS规则暂存到一个数组里
let rules = [];
function addCSSRules(text) {
  const ast = css.parse(text);
  rules.push(...ast.stylesheet.rules);
}

/**
 * 复合选择器
 * 并集 .class, h3 TODO:
 * 后代 .class h3
 * 子元素 .class>h3
 * 交集 h3.class .class0.class1 .class0 .class1 
 * 链接伪类 a:link a:active ... TODO:
 */
function specificity(selector) {
  const p = [0, 0, 0, 0];
  const selectorParts = selector.split(" ");
  function countP(part) {
    if (part.charAt(0) == "#") {
      p[1] += 1;
    } else if(part.charAt(0) == ".") {
      p[2] += 1;
    } else {
      p[3] += 1;
    }    
  }

  for (let selectorPart of selectorParts)  {
    selectorPart.match(selectorPartRegExp)
      .forEach(countP)
  }
  return p;
}

function compare(sp1, sp2) {
  if (sp1[0] - sp2[0])
    return sp1[0] - sp2[0];
  if (sp1[1] - sp2[1])
    return sp1[1] - sp2[1];
  if (sp1[2] - sp2[2])
    return sp1[2] - sp2[2];

  return sp1[3] - sp2[3];
}

function match(element, selector) {
  if (!selector || !element.attributes)
    return false;
  
    if (selector.charAt(0) == "#") {
      let attr = element.attributes.filter(attr => attr.name === 'id')[0];
      if (attr && attr.value === selector.replace("#", ''))
        return true;      
    } else if(selector.charAt(0) == '.') {
      let attr = element.attributes.filter(attr => attr.name === 'class')[0]; 
      // class交集情况 .class0.class1
      if (attr && attr.value.indexOf(selector.replace(".", '')) !== -1)
        return true;
    } else {
      if (element.tagName === selector) {
        return true;
      }
    }
    return false;
}

function selectorPartMatch(element, selectorPart) {
  return selectorPart && selectorPart.match(selectorPartRegExp)
  .every(part => match(element, part));
}

function computeCSS(element) {
  const elements = stack.slice().reverse();
  if (!element.computedStyle)
    element.computedStyle = {};
  
  for (let rule of rules) {
    // TODO: 并集 selectors
    const selectorParts = rule.selectors[0].split(" ").reverse();

    // 后代
    if (!selectorPartMatch(element, selectorParts[0]))
      continue;

    let matched = false;

    var j = 1;
    for (let i=0; i<elements.length; i++) {
      // 交集
      if (selectorPartMatch(elements[i], selectorParts[j])) {
        j++;
      }
    }
    if (j >= selectorParts.length)
      matched = true;
    
      if (matched) {
        // 计算specificity 按优先级应用样式规则
        const sp = specificity(rule.selectors[0]);
        const computedStyle = element.computedStyle;
        for (let declaration of rule.declarations) {
          if (!computedStyle[declaration.property])
            computedStyle[declaration.property] = {}
          
          if (!computedStyle[declaration.property].specificity) {
            computedStyle[declaration.property].value = declaration.value;
            computedStyle[declaration.property].specificity = sp;
          } else if(compare(computedStyle[declaration.property].specificity, sp) < 0) {
            computedStyle[declaration.property].value = declaration.value;
            computedStyle[declaration.property].specificity = sp;            
          }
        }
        console.log(element.computedStyle);
      }
  }
}

function emit(token) {
  let top = stack[stack.length - 1];

  if (token.type == "startTag") {
    let element = {
      type: "element",
      children: [],
      attributes: [],
    };

    element.tagName = token.tagName;

    for (let p in token) {
      if (p != "type" && p != "tagName") {
        element.attributes.push({
          name: p,
          value: token[p]
        });
      }
    }

    computeCSS(element);

    top.children.push(element);
    element.parent = top;

    if (!token.isSelfClosing)
      stack.push(element);
    
    currentTextNode = null;
  } else if(token.type == "endTag") {
    if (top.tagName != token.tagName) {
      throw new Error("Tag start end doesn't match!");
    } else {
      // 遇到style标签时，执行添加CSS规则的操作
      if (top.tagName ===  "style") {
        addCSSRules(top.children[0].content);
      }
      layout(top);
      stack.pop();
    }
    currentTextNode = null;
  } else if(token.type == "text") {
    if (currentTextNode == null) {
      currentTextNode = {
        type: "text",
        content: ""
      }
      top.children.push(currentTextNode);
    }
    currentTextNode.content += token.content;
  }
}

const EOF = Symbol("EOF"); // EOF: End Of File

function data(c) {
  if (c == "<") {
    return tagOpen; // 标签开始
  } else if (c == EOF) {
      emit({
        type: "EOF"
      });
    return ;
  } else {
    emit({
      type: "text",
      content: c,
    });
    return data;
  }
}

function tagOpen(c) {
  if (c == '/') {
    return endTagOpen;
  } else if(c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type:  "startTag",
      tagName: ""
    };
    return tagName(c); // reConsume
  } else {
    return ;
  }
}

function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "endTag",
      tagName: ""
    }
    return tagName(c);
  } else if(c == ">") {

  } else if(c == EOF) {

  } else {

  }
}

function tagName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c == "/") {
    return selfClosingStartTag;
  } else if(c.match(/^[a-zA-Z$/]$/)) {
    currentToken.tagName += c // .toLowerCase()
    return tagName;
  } else if (c == ">") {
    emit(currentToken);
    return data;
  } else {
    return tagName;
  }
}

// <html prop
function beforeAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if(c == "/" || c == ">" || c == EOF) {
    return afterAttributeName(c);
  } else if(c == "=") {

  } else {
    currentAttribute = {
      name: "",
      value: ""
    }
    return attributeName(c);
  }
}

function attributeName(c) {
  if (c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF) {
    return afterAttributeName(c);
  } else if(c == "=") {
    return beforeAttributeValue;
  } else if (c == "\u0000") {

  } else if (c == "\"" || c == "'" || c == "<") {

  } else {
    currentAttribute.name += c;
    return attributeName;
  }
}

function beforeAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF) {
    return beforeAttributeValue;
  } else if(c == "\"") {
    return doubleQuotedAttributeValue;
  } else if (c == "\'") {
    return singleQuotedAttributeValue;
  } else if(c == ">") {
    // return data;
  } else {
    return UnquotedAttributeValue(c);
  }
}

function doubleQuotedAttributeValue(c) {
  if (c == "\"") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if(c == "\u0000") {

  } else if(c == EOF) {

  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}

function singleQuotedAttributeValue(c) {
  if (c == "\'") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if (c == "\u0000") {

  } else if (c == EOF) {

  } else {
    currentAttribute.value += c;
    return singleQuotedAttributeValue;
  }
}

function afterQuotedAttributeValue (c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c == "/") {
    return selfClosingStartTag;
  } else if(c == ">") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c == EOF) {

  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}

function UnquotedAttributeValue (c) {

  if (c.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return beforeAttributeName;
  } else if (c == "/") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return selfClosingStartTag;
  } else if(c == ">") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c == "\u0000") {

  } else if (c == "\"" || c == "'" || c == "<" || c == "=" || c == "`") {

  } else if (c == EOF) {

  } else {
    currentAttribute.value += c;
    return UnquotedAttributeValue;
  }
}


function afterAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return afterAttributeName;
  } else if(c == "/") {
    return selfClosingStartTag;
  } else if (c == "=") {
    return beforeAttributeValue;
  } else if (c == ">") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c == EOF) {

  } else {
    currentToken[currentAttribute.name] = currentAttribute.value;
    currentAttribute = {
      name: "",
      value: ""
    };
    return attributeName(c);
  }
}

// <div/>
function selfClosingStartTag(c) {
  if (c == ">") {
    currentToken.isSelfClosing = true;  // TODO: isSelfClosing的处理
    emit(currentToken);
    return data;
  } else if (c == "EOF") {

  } else {

  }
}


module.exports.parseHTML = function parseHTML(html) {
  let state = data;
  for (let c of html) {
    state = state(c);
  }
  state = state(EOF);
  console.log(stack[0]);
  return stack[0];
}
