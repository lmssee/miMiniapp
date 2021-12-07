const js = {
    browser:'',
    /** 用户浏览器 */
    constructor(){
        this.immediately();
    },
    /** 扩展原型需要立即执行，放在本函数中 */
    immediately() {
        /** 原型方法继承*/
        Function.prototype.proto = function (name, func) {
            if (!this.prototype[name]) {
                this.prototype[name] = func;
                return this;
            }
        };
        /**  扩展 Number 原型，添加方法 int 捕获整数 */
        Number.proto('int', function () {
            return Math[this < 0 ? 'ceil' : 'floor'](this);
        });
        /** 执行浏览器检测 */
        this.navigator();
        this.log(this.browser);
    },
    /**  <typeof 、constructor > 
     * 
     *        typeof 检测值的类型，对数组，对象等，都返回 'object'
     * 
     *       constructor 返回构造器，当检测 undefined、null 时会报错
     * 
     *       返回结果都是小写  
     * 
     *      undefined、number、boolean、string
     *      function、regexp、array、set、map
     *      error
     */
    typeOf(o) {
        let _toString = Object.prototype.toString;
        let _type = {
            'undefined': 'undefined',
            'number': 'number',
            'boolean': 'boolean',
            'string': 'string',
            '[object Function]': 'function',
            '[object RegExp]': 'regexp',
            '[object Array]': 'array',
            '[object Error]': 'error',
            '[object Set]': 'set',
            '[object Map]': 'map',
        };
        return _type[typeof o] || _type[_toString.call(o)] || (!!o ? 'object' : 'null')
    },
    /**  <object> 
     * 对象是编程语言学习的难点与重点（本次复习希望完全掌握） 
     * 
     * 创建
     *       new ()
     *       Function()  使用 this 关键字来指代对象定义属性和方法，且不需要 return 
     *       直接量定义
     *       create()	   Object.create(prototype, descriptors); 
     *                                  prototype	  做原型的对象
     *                                  descriptors  包含数据属性描述符的对象
     *                                                writable	     可写
     *                                                enumerable	 可枚举
     *                                                configurable	 可修改删除
     * 
     * 复制对象
     *	   for/in
     
     * 克隆对象
     *       通过空对象的形式赋值并返回实例
     * 
     * 销毁对象
     *      null
     * 
     * 操作属性
     *      Object.defineProperty	  将属性添加到对象或修改现有属性
     *                      Object.defineProperty(object, propertyname, descriptor)
     *                                             object			  要操作的对象
     *                                             propertyname	      要操作对象的属性名
     *                                             descriptor		  包含属性描述符的对象
     *      Object.defineProperties  添加多个属性或修改多个现有属性
     * 
     * 访问属性
     *               Object.getPrototypeOf			   返回对象的原型
     *               Object.getOwnPrototypeNames		  返回私有属性的名称
     *               Object.keys						   返回可可枚举的属性和方法名
     *               Object.getOwnPropertyDescriptor		获取指定对象的私有属性的描述符
     * 
     * 赋值属性
     *		 = 
     * 
     * 删除属性
     *       delete 
     * 
     * 配置特性（Object） 
     *      Object.freeze(object)	   	 完全冷冻
     *      Object.seal(object)	    	 冷冻属性名及阻止修改属性特性，但可以修改属性值
     *      Object.preventExtensions	 组织添加新的属性，对属性值和特性不保护
     * 
     * 检查特性
     *      Object.isFrozen(object)
     *      Object.isSealed(object)
     *      Object.isExtensible(object)
     * 
     * 使用方法
     *      toString					 返回字符串
     *      toLocaleString			     返回字符串本地表示
     *      valueOf				         返回对象的原始值
     *      isPrototypeOf			     判定一个对象是否为另一个对象的原型
     *      hasOwnProperty			     检查属性是否可可以被继承
     *      propertyIsEnumerable	   	 判定是否可以通过 for/in 遍历属性 
     * 
     * 
     */
    /** <原型>
     *  
     *      原型扩展
     *      (由于其特殊性，需要立即执行，将其放在本实例的构造器 constructor 中)； 
     */
    /** * <原型链>
     *      
     *  在 JavaScript 中，<important>构造函数<important>拥有原型！！！
     *  实例对象可以通过 prototype 关键字访问原型。实现 JavaScript 的原型机车继承
     *  
     * 
     *  原型实际上是数据集合，即普通对象，继承 Object 类。由 JavaScript 自动创建并依附于每一个沟站函数
     *  
     *  本地属性值会覆盖原型属性值 
     * 
     *  prototype 属于构造函数，所以必须使用构造函数通过点语法来调用 prototype 语法
     *  再通过 prototype 属性来访问原型对象
     * 
     *          (删除本地属性后，打印即不再显示本地属性
     *              但是调用时，会沿着原型链查找到原型链上定义的该属性的值)
     *      
     * 
     * 
     * 
     */
    /** <工厂模式> 
     * 将对象的方法定义成外部函数的引用，就可避免每一次都初始化出一个对象方法
     */
    /**      <继承> 
     * 
     *      原型继承
     *      在子类中执行父类的构造函数
     *      在 JavaScript 中没有定义对象的继承功能
     *      但是在 TypeScript 中有定义 extend 功能
     *      这里定义的方法仅学习原生 JavaScript 的继承使用
     */
    extend(children, parent) {
        let i = 0;
        class F {
            constructor() {}
        }
        F.prototype = parent.prototype;
        children.prototype = new F();
        children.parent = parent.prototype;
        if (parent.prototype.constructor == Object.prototype.constructor) {
            parent.prototype.constructor = parent;
        }
    },
    /** *
     * 将一个对象装入另一个对象，并返回新的对象
     * 
     */
    mixObject(o, l) {
        let kL = Object.keys(l),
        _o = JSON.parse(JSON.stringify(o));
    },
    /** 深层复制对象
     * 
     *   拒绝 
     * */
    copyObject(o) {
        let oo = this.typeOf(o) == 'array' ? [] : {};
        for (let k in o) {        }
    },
    /**  <设计构造原型模式> 
     * 将属性通过构造函数进行定义，将方法通过原型进行定义
     * 这样定义的好处就是不同实例化时，属性不同。 
     * 
     */
    /**  <设计动态原型模式> 
     * 通过判定方法是否存在，若不存在，则创建并上锁，避免多次创建
     */
    /**  <惰性实例化> 
     * 避免资源的过早浪费
     * 
     */
    /* <Object End >  */
    /**   <Function> 
     *   参数 arguments （arguments 的 prototype 指向 Object.prototype ，而非 Array.prototype ） 
     *       可使用 argument[i]				  读取指定下标的参数
     *           用	arguments.length		  读取实际参数的长度
     *           用	 arguments.callee		  调用函数本身
     *           用  arguments.callee.length   读取形参的个数 （与直接求函数的 length 结果相同） 
     * 
     *   自定义属性和方法
     *           function.property
     *           function.method
     *           函数外定义的属性可随时访问，而在函数体内定义的属性只有在函数调用后才可以使用
     *           函数的内部定义的方法只能在内部使用，而体外方法在外部可以使用
     *   
     *   call()	 apply()
     *       call、apply 主要用来改变 this 的指向，比较实用
     *       ECMAScript 5 新增 bind 方法 ，可以返回与绑定的 Function 相同的新函数
     *  
     *   this
     *        在一般情况下，定义方法时，对于相互依赖的方法，可以定义成私有属性，并引用方法的方式对外开放
     *        在回调下的异步，this 指向迷离，应该通过 call、apply 重新限定 this 指向
     *        this > 局部变量 > 形参 > arguments > 函数名
     * 
     * 
     * 
     */
    /**   <节流> 
     * 
     * 间断性连续重复执行，第二次调用的时候清除第一次定时器并另设置一个
     * 
     *      参数说明
     *          
     *          method      回调函数
     *          
     *                      method.tId      函数上定义的属性
     * 
     *          content     参数
     *          
     *          time        时间
     */
    throttling(method, content, time) {
        clearTimeout(method.tId);
        method.tId = setTimeout(function () {
            method.call(content);
        }, time);
    },
    /** <分支函数> 
     * 
     * 在初始化时，一次判定更改函数
     */
    /** <惰性函数> 
     * 
     * 在函数内部改变自我，拒绝重复判断
     * <error> 
     * 在 TypeScript 中无法使用，妈的，参数限定
     */
    /**  <记忆> 
     * 通过闭包 memo 形成对上一次数据的内部储存，通过 判断
     * 
     * 闭包一个数组，每次更新数组长度，并根据要求计算下一位值，直至计算到结果
     * 
     */
    memory(memo, formula) {
        let recur = function (n) {
            let result = memo[n];
            if (typeof result !== 'number') {
                result = formula(recur, n);
                console.log(memo);
                memo[n] = result;
            }
            return result;
        };
        return recur;
    },
    /** * <模块化> 
     * 避免由于全局化引起变量的污染或被污染
     * 采用闭包的形式将函数封装，并进行使用
     */
    /**<柯里化> 
     * 通过闭包可以形成一个接受参数的函数，并将两次的参数进行操作
     * 该方法在 DOM 中使用较多
     * 与闭包的不同在于，柯里化需要传入内部闭包所需的参数
     * <error> 
     * 暂时不知道在 TypeScript 中怎么使用
     */
    curry(fn) {
        var args = Array.prototype.slice.call(arguments, 1);
        return function () {
            let innerArgs = Array.prototype.slice.call(arguments);
            let finalArgs = args.concat(innerArgs);
            return fn.apply(null, finalArgs);
        };
    },
    /**   <高阶函数> 
     * 接收函数作为参数，返回函数
     */
    /** <递归 、 尾递归 > 
     * 尾递归更像是上面介绍的 < 记忆 > 函数，每次把值记录下来，不用每次从头计算
     * 
     */
    /**   <function END >  */
    /**  <number> 
     * 
     * d.toString(n); n 是返回值的进制数
     * 
     * 特殊值： 
     * 
     *         Infinity、 
     *         NaN、 
     *         Number.MAX_VALUE、 
     *         Number.MIN_VALUE、 
     *         Number.NAN、 
     *         Number.POSITIVE_INFINITY（正无穷大）、 
     *         Number.NEGATIVE_INFINITY（负无穷大） 
     * 
     *        toFixed			 将数值转化为字符串，并指定指定的位数
     *        toExponential	   将数值转化为科学计数法形式的字符串，并指定小数点后位数
     *        toPrecision		  将数值转化为科学计数法形式的字符串，并指定有效数字位数
     */
    /** <int> 
     * 捕获整数部分
     * 扩展原型方法需要立即执行，所以需要放在构造器 constructor 中执行
     * 且由于是扩展方法，在 TypeScript 检测时需要将对象 as any 才能躲过检测
     */
    /**  <Number End>*/
    /**  <String> 
     * 
     * 转化为数字（整数），可带第二可选参数指定原数据进制，输出为十进制
     * parseInt()
     * 转化为数字（浮点数） 
     * parseFloat()
     * 转化为数组
     * split()
     * 
     */
    /** <String End>*/
    /**  <Array> 
     * 数组的下标一定在（0，2e+32 - 1） 区间
     *	        for/in	  检索数组 
     *         push()	尾部添加，返回数组新长度
     *         pop()	  尾部删除，返回被删除元素
     *         unshift() 头部添加，返回数组新长度
     *         shift()	  头部删除，并返回删除元素
     *         reverse() 点到数组的元素
     *         sort()	 对数组进行排序
     *                   在任何情况下，undefined 都排在最后
     *                   是在原数组的基础上进行排序
     *                   排序时，不指定方法，则按位进行排序
     * 
     * ++下面方法将返回新的数组++ 
     * 
     *      content()			   连接并返回新的数组
     *      splice()			   插入、删除、或者替换数组的元素
     *      slice()			   返回数组的一部分
     *      toString()			   将数组转化为字符串
     *      toLocaleString()      转化为本地字符串
     *      join()				   将数组元素连接起来创建一个字符串
     *      
     *      indexOf()			    返回查找参数所在索引，也可以指定第二参数定义起始查找索引
     *      lastIndexOf()			倒叙查找，跟 indexOf() 用法相同
     * 
     *      forEach()			  为每一个元素调用回调函数，回调函数 function(value, index, array)，该方法不修改数组，但不保证回调函数
     *      every()			  检测是否所有的元素都符合，回调函数 function(value, index, array) 
     *      some()			  	  检查是否有元素符合，回调函数 function(value, index, array) 
     *      map()			      对数组每一个元素回调，并返回结果数组，回调函数 function(value, index, array)，该方法不修改数组，但不保证回调函数
     *      filter()			  对数组进行回调，并返回返回值为 true 的数组 ，回调函数 function(value, index, array) 
     *      
     *      reduce()			  汇总，回调函数 function(previousValue, currentValue, currentIndex, array) 
     *      previousValue       上一次累计的值(reduce 第二个可选参数可以设置初始累计值)
     *      currentValue        本次元素
     *      currentIndex	     本次下标
     *      array			     数组
     *      reduceRight()		 倒叙汇总
     * 
     */
    /**  这是一个数组迭代器，可以将多维数组扁平化*/
    arrayEach(a, f) {
        let n;
        try {
            n || (n = 0);
            if (a.length > 0 && f.constructor == Function) {
                while (n < a.length) {
                    let k = a[n];
                    if (k && k.constructor == Array) this.arrayEach(k, f);
                    else f.call(null, k);
                    n++;
                }
                n = null;
            }
        } catch (w) {
            console.log(w);
        }
        return a;
    },
    /**  创建初始化的数组  */
    arrayCreate(m, n, v = 0) {
        let a, i, j, r = [];
        for (i = 0; i < m; i++) {
            a = [];
            for (j = 0; j < n; j++) {
                a[j] = v
            }
            r[i] = a;
        }
        return r;
    },
    /**  <Array  End> */
    /** *   <string>
     * 
     *  创建
     *      直接量
     *          =
     *      构造函数
     *          new String()
     *      字符编码
     *          String.fromCharCode()
     * 
     *  值
     *      value
     *      toString()
     *  长度
     *      length
     *      
     *  连接
     *  
     *      +
     *      join
     * 
     *  查找
     *  
     *      charAt()                    获取指定位置的字符
     *      charCodeAt()                返回第 个字符的代码
     *      indexOf()                   查找字符位置
     *      lastIndexOf()               查找字符最后出现的位置
     *      match()                     查找字符，返回数组
     *      search()                    简单查找
     * 
     *  截取
     *  
     *      slice()                     根据长度截取
     *      substr()                    根据指定起始位置截取
     *      substring()                 返回字符串的子字符串
     * 
     *  替换
     * 
     *      replace()                   替换
     * 
     *  大小转换
     * 
     *      toLocaleLowerCase()          转换成小写
     *      toLocaleUpperCase()          转换成小写
     *      toLowerCase()                转换成小写
     *      toUpperCase()                转换成大写
     * 
     *  字符串比较
     *      
     *      -
     * 
     *  字符串与数组转换
     *          
     *      split                         分割成数组
     *      join                          转化为字符串
     * 
     *  编解码
     *  
     *      escape()                      不完全编码
     *      unescape()                    解不完全编码
     *      encodeURI()                   escape 的代替品
     *      decodeURI()                   unescape 的代替品
     *      encodeURIComponent()
     *      decodeURIComponent()
     * 
     * 
     *      ''.charCodeAt(\d)
     *      String.fromCharCode()
     *  
     * 
     */    /**     <string End> */
     /*** *<JSONP>
      *  JSON with Padding
      *  服务器端返回 callback 对象，然后在客户端进行解析并实现数据跨域获取
     * 
     */
    /** **<table of DOM>
     *  table
     *      caption                 保存着对 <caption> 元素的指针
     *      tBodies                 是一个 <tBody> 的 HTMLCollection
     *      tFoot                   保存着 <tFoot> 元数的指针
     *      tHead                   保存着 <THead> 元素的指针
     *      rows                    是一个表格中所有行的 HTMLCollection
     *      createTFead             添加一个头部
     *      createTFoot             添加表格脚部
     *      createCaption           添加表格标题
     *      deleteTHead             删除表格头部
     *      deleteTFoot             删除表格页脚
     *      deleteCaption           删除标题
     *      deleteRow               删除指定行
     *      insertRow               向 rows 集合中指定的位置插入一行
     *  tBody
     *      rows                    保存着 <tBody> 元素的中的行的 HTMLCollection
     *      deleteRow               删除指定位置的行
     *      insertRow               向 rows 集合中指定的位置插入一行，并返回对新的插入行的引用
     *  tr
     *      cells                   保存着 <tr> 元素中单元格的 HTMLCollection
     *      delete                  删除指定位置的单元格 
     *      insertCell              向 cells 集合中指定位置插入一个单元格，返回新插入单元格的引用
     * 
     */    /**  <DOM end>    */
     /** *<RegExp>
      *
      *  创建 
      *         new RegExp() 
      *         / /.img 
      *  对象
      * 
      *      global                  g
      *      ignoreCase              i
      *      multiline               m
      *      lastIndex               返回或设置开始执行下一次匹配的字符位置
      *      source                  返回正则表达式的元字符文本
      * 
      *  匹配 (RegExp.exec(''))
      *      
      *      exec                    检索并返回其位置
      *                              在调用非全局模式的 RegExp 时，返回数组与 String.match() 返回的数组相同
      *      test                    检测是否含有
      *      compile                 编译正则表达式
      *      
      * 
      *  字符串方法  ('').search(RegExp)
      *      
      *      search                   
      *      match
      *      replace
      *      split
      * 
      * 
      * 
      * 
      *  访问
      *      
      *      input           $_          初始
      *      index                       匹配开始位置
      *      lastIndex                   最后匹配到位置
      *      lastMatch       $&          最后匹配的额字符串
      *      lastParent      $+          最后子模式匹配的子字符串
      *      leftContent     $`          最后匹配左侧所有的字符
      *      rightContent    $'          最后匹配的右侧所有字符串
      *      $1-$9               
      *  
      *  
      *  字符描述
      *      
      *      . \w \W \d \D \s \S \b \B \0 \n \f \r \t \v \xxx \xdd \uxxxx
      * 
      *  字符范围
      *      
      *      []    可使用 - 表示连续，使用 ^ 表示取反
      * 
      *  选择操作
      * 
      *      |           子模式的选择
      * 
      *  重复类量词
      *      +           至少一个 
      *      *           任意个
      *      ？          有或没有
      *      {}          区间
      * 
      *  惰性模式
      * 
      *      ? {n} {n,m}    都表现出弱的贪婪性
      *      *  +  {n,}     都表现出强的贪婪性
      * 
      *  边界量词
      *  
      *      ^ $
      * 
      *  声明量词
      * 
      *      正向声明
      *              (?=)
      *      反向声明        
      *              (?!)
      * 
      *  表达式分组
      * 
      *      （）
      *       子模式
      *              \
      * 
      *  子表达式引用
      * 
      *      $
      *  
      *      拒绝分组
      *          ?:
      *  
      * 
      */    /** <RegExp End>  */
      /** *<CSS>
       *
       *  样式
       *      
       *      cssText                     读取行内样式
       *      style                       设置行内样式或读取样式
       *                                  float 是保留字，禁止使用
       *  style 对象
       *      
       *      cssText                     行内样式
       *      length                      CSS 属性的数量
       *      parentRule                  表示 CSS 的CSSRule 样式
       *      
       *      <getPropertyCSSValue>       (已废弃)    返回包含给定属性值的 CSSValue 对象          
       *                                  e.style.getPropertyValue(propertyName);
       *                                  早期版本的 IE 直接通过 
       *      getPropertyPriority()       返回指定属性中是否有 !important
       *      item()                      返回给定位置的 CSS 属性的名称
       *      getPropertyValue()          返回给定属性的字符串值
       *      removeProperty（）          从样式中删除给定的样式
       *      setProperty()               将给定的属性设置为相应的值，并加上优先的标志
       *                                  e.style.setProperty(propertyName,value,priority)
       * 
       * 
       */
      /** className 驼峰表示法转化为连字符形式 */
      classNameToLower(propertyName) {
          return (propertyName.replace(/([A-Z])/g, "-$1")).toLowerCase()
          /** 下面是自己的复杂写法 */
          // return (d.replace(new RegExp(` (\[\\u00${('A').charCodeAt(0).toString(16)}-\\u00${('Z').charCodeAt(0).toString(16)}\])`, 'g'), '-$1')).toLocaleLowerCase()
        },
        /** className 连字符转化为驼峰表示法 */
        classNameToUpper(propertyName) {
            propertyName = (propertyName.split('-').map(i => {
                return i.length ? (i.substring(0, 1).toLocaleUpperCase() + i.substring(1, i.length).toLocaleLowerCase()) : '-'
            }).join(''));
            let i = (new RegExp(`\[\\u00${('A').charCodeAt(0).toString(16)}-\\u00${('Z').charCodeAt(0).toString(16)}\]`)).exec(propertyName).index;
            propertyName = propertyName.substr(0, i) + propertyName.substr(i, 1).toLocaleLowerCase() + propertyName.substr(i + 1);
            return propertyName;
        },
        /** 获取某元素的样式组 */
        getStyles(node) {
            let a = this.getEle(node).style;
            let b = [];
            for (let i = 0, l = a.length; i < l; i++) {
                let o = a.item(i);
                b.push({
                    class: o,
                    value: a.getPropertyValue(o),
                    priority: a.getPropertyPriority(o),
                    parentRule: a.parentRule,
                })
            }
            return {
                b: b,
                cssText: a.cssText,
                length: a.length,
                parentRule: a.parentRule,
            }
        },
        /** 设置指定元素的 CSS 样式，默认超级加倍 */
        setStyle(d, propertyName, value = '', priority = true) {
            return this.getEle(d).style.setProperty(propertyName, value, priority);
        },
        /** 删除 CSS 样式
         *  e.style.removeProperty(propertyName)
         */
        delStyle(node, propertyName) {
            return this.getEle(node).style.removeProperty(propertyName);
        },
        /** 获取某元素的样式 */
        getStyle(node, propertyName) {
            node = this.getEle(node);
            return /** 通用检测 */ !!node.style[propertyName] && node.style[propertyName] ||
            /** IE 检测 */
            !!node.currentStyle && node.currentStyle[propertyName] ||
            /* DOM  一般检测 */
            !!document.defaultView && !!document.defaultView.getComputedStyle && !!document.defaultView.getComputedStyle(node, null) && document.defaultView.getComputedStyle(node, null).getPropertyValue(this.classNameToLower(propertyName)) ||
            /* 老爷机 */
            null;
        },
        /** 上方法有时获取的是百分数或 auto，扩展如下
         * 该方法获取属性为值的 CSS 
         */
        getStyleValue(node, propertyName, percentage = 1) {
            let v = this.getStyle(node, propertyName); /*获取值*/
            node = this.getEle(node), percentage = percentage || 1;
            if (/px/.test(v) && parseInt(v)) return (parseInt(v) * percentage).int()
            else if (/\%/.test(v) && parseInt(v)) {
                let b = parseInt(v) / 100; /** 转化为小数表达 */
                if (percentage != 1) b *= percentage;
                node = node.parentNode;
                if (node.tagName == "BODY") throwError("can not find any value in this document ");
                return this.getStyleValue(node, propertyName, b);
            } else if (/auto/.test(v)) {
                let b = 1;
                if ((percentage != 1) && percentage) b *= percentage;
                node = node.parentNode;
                if (node.tagName == 'BODY') throwError('no find');
                return this.getStyleValue(node, propertyName, b);
            } else throwError('error');
        },
        /**  元素的宽和高
         * offsetWith offsetHeight
         *  
         *      在 IE 怪异模式下表现不怎么准，且不同环境下不一样
         *  
         * 其他
         *      clientWidth             
         *                      获取页面的宽度，页面获取使用 document.documentElement 或 document.body (兼容 IE )
         *      clientHeight
         *      offsetWidth
         *      offsetHeight
         *      scrollWidth
         *      scrollHeight
     * 
     */
    /** getHeight 和 getWidth 需要的函数，更改 display = hidden 元素 */
    setCSSOfTemporary(node, o) {
        let a = {};
        node = this.getEle(node);
        for (let i in o) {
            a[i] = node.style[i];
            node.style[i] = o[i];
        }
        return a;
    },
    resetCSSOfTemporary(node, o) {
        node = this.getEle(node);
        for (let i in o) {
            node.style[i] = o[i];
        }
    },
    /** 获取元素的高和宽 */
    getWidthAndHeight(node) {
        node = this.getEle(node);
        if (this.getStyle(node, 'display') != 'none') return {
            width: node.offsetWidth,
            height: node.offsetHeight
        } || {
            width: this.getStyleValue(node, 'width'),
            height: this.getStyleValue(node, 'height')
        };
        let r = this.setCSSOfTemporary(node, {
            display: '',
            position: 'absolute',
            visibility: 'hidden',
        });
        let v = {
            width: node.offsetWidth,
            height: node.offsetHeight
        } || {
            width: this.getStyleValue(node, 'width'),
            height: this.getStyleValue(node, 'height')
        }
        this.resetCSSOfTemporary(node, r);
        return v;
    },
    /** * 元素的偏移
     * 
     *      offsetTop
     *      offsetLeft
     *      
     *      offsetParent  总是指向母元素
     * 
     */
    /*** 相对页面定位
     *  元素的左上边距（并不完全精准，如果元素都没有边框的话） 
     * */
    getPointOfAbsolute(node) {
        let x = 0,
        y = 0;
        node = this.getEle(node);
        while (node.offsetParent) {
            x += node.offsetLeft;
            y += node.offsetTop;
            node = node.offsetParent;
        }
        return {
            x,
            y
        }
    },
    /** 相对父元素定位 
     * 
     */
    getPointOfRelatively(node) {
        node = this.getEle(node);
        let o, p;
        return node.parentNode == node.offsetParent && {
            x: node.offsetLeft,
            y: node.offsetTop
        } || (o = this.getPointOfAbsolute(node), p = this.getPointOfAbsolute(node.parentNode)) && {
            x: o.x - p.x,
            y: o.y - p.y
        }
    },
    /** *相对上级定位元素
     * 
     */
    getPointOfFixed(node) {
        node = this.getEle(node);
        return {
            x: (parseInt(this.getStyleValue(node, 'left')) || 0),
            y: (parseInt(this.getStyleValue(node, 'top')) || 0)
        }
    },
    /** *设定位置信息
     * 
     */
    setPointOfElement(node, o) {
        node = this.getEle(node);
        (node.style.position) || (node.style.position = "absolute");
        node.style.left = o.x + 'px';
        node.style.top = o.y + 'px';
    },
    /** * 设置相对定位
     * 
     */
    setOffsetPoint(node, o) {
        node = this.getEle(node);
        (node.style.position) || (node.style.position = "absolute");
        node.style.left = this.getPointOfFixed(node).x + o.x + 'px';
        node.style.top = this.getPointOfFixed(node).y + o.y + 'px';
    },
    /** *鼠标绝对位置
     * 这一类异步方法调用时需要特别留意
     * 该方法注册为静态方法，无法通过 this 在其他方法中调用
     *
     *       {噗，大意了，也可以调用。只是值抓不到}
     * 
     *              {噗，又大意了。人家也能抓到}
     *          
     *      {但，直接调用时，函数内的 this 引用的函数无法使用。
     *          
     *              需要包在匿名函数中使用        
     *  
     *          }
     *           
     * 
     * <important>
     */
    getMousePointer(event) {
        event = event || window.event;
        return {
            'x': event.pageX || event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft),
            'y': event.pageY || event.clientY + (document.documentElement.scrollTop || document.body.scrollTop)
        }
    },
    /** *鼠标相对元素的位置信息
     * 
     */
    getMousePointerOfElement(event) {
        event = event || window.event;
        this.log(event);
        let node = !!event.target && (event.currentTarget || event.target) || event.srcTarget && (event.currentTarget || event.srcTarget),
        borderLeft = parseInt(this.getStyle(node, "borderLeftWidth")) || ((node.style.borderLeftStyle && node.style.borderLeftStyle != 'none') ? 3 : 0),
        borderTop = parseInt(this.getStyle(node, "borderTopWidth")) || ((node.style.borderTopStyle && node.style.borderTopStyle != 'none') ? 3 : 0),
        x /**鼠标 x */ = node.offsetX || (event.layerX - node.offsetLeft - borderLeft) /**兼容 Mozilla */ ,
        y /**鼠标 y */ = node.offsetY || (event.layerY - node.offsetTop - borderTop) /**兼容 Mozilla */ ;
        if (this.browser == 'Safari') {
            x -= borderLeft,
            y -= borderTop
        }
        return {
            x,
            y
        }
    },
    /** 获取滚动条位置 */
    getScrollPoint() {
        let a = document.documentElement || document.body;
        return {
            x: self.pageXOffset || (!!a && a.scrollLeft),
            y: self.pageYOffset || (!!a && a.scrollTop)
        }
    },
    /** 设置滚动条位置 */
    setScrollPoint(node) {
        window.scrollTo(this.getPointOfAbsolute(node).x, this.getPointOfAbsolute(node).y);
    },
    /** 显示隐藏切换 */
    displayIsNode(node, hidden = true) {
        node = this.getEle(node);
        if (!!node && (this.typeOf(hidden) != 'boolean'))
        throw new Error;
        let dis = this.getStyle(node, 'display');
        (dis != 'none') && (node._display = dis);
        node._display = node._display || '';
        (hidden || dis == 'none') && (node.style.display = node._display) || (node.style.display = 'none !important');    },
        /** 透明度 
         * IE 不能够直接读取
         *      
         */
        getOpacity(node) {
            node = this.getEle(node);
            return !node.filters && node.style.opacity && parseFloat(node.style.opacity) * 100 || !!node.filters && !!node.filters.item('alpha') && !!node.filters.item('alpha').opacity && node.filters.item('alpha').opacity || '100';
        },
        setOpacity(node, n) {
            node = this.getEle(node);
            (!!n && n > 100 || !n) && (n = 100) || (!!n && n < 0) && (n = 0);
            !!node.style.opacity && (node.style.opacity = n / 100 + '!important') || !!node.filters && (node.style.filter = `alpha(opacity=${n})`) || null;
            return true;
        },
        /** 滑动
         * 将元素移动到相对对位的 （x,y） 处
         */
        slideTo(node, x, y, t = 100) {
            t = t || 100, node = this.getEle(node);
            let original = this.getPointOfFixed(node),
            xo = original.x,
            yo = original.y,
            stepX = Math.round((x - xo) / t),
            stepY = Math.round((y - yo) / t),
            outOfSlideTo = setInterval(() => {
                let original = this.getPointOfFixed(node),
                xo = original.x,
                yo = original.y;
                node.style['left'] = (xo + stepX) + 'px', node.style['top'] = (yo + stepY) + 'px';
                if (Math.abs(x - xo) <= Math.abs(stepX) || Math.abs(y - yo) <= Math.abs(stepY)) {
                    node.style['left'] = x + 'px',
                    node.style['top'] = y + 'px';
                    clearInterval(outOfSlideTo);
                }
            }, 2);
        },
        /** 显隐
         * 切换 透明度
         */
        fate(node, t, hiddenOrShow) {
            let i;
            t = t || 10, node = this.getEle(node);
            !!hiddenOrShow && (i = 0) || (i = 100);
            let outOfFate = setInterval(() => {
                this.setOpacity(node, i);
                if (!!hiddenOrShow) {
                    i++;
                    if (i >= 100) clearTimeout(outOfFate);
                } else {
                    i--;
                    if (i <= 0) clearTimeout(outOfFate);
                }
            }, t);
        },
        /** *<styleSheets>
         * 
         *  获取
         *
         *      为兼容 IE ，则有 
         *              let cssRule = document.styleSheets[0].cssRules || document.styleSheets[0].rules;
         *              
         *              styleSheet 包含外部引入及定义的 style 组列表
         *              cssRules   表示选取 style 组列表的某一样式组的规则组
         *  
         */
        /** 获取全部样式表 */
        getStyleSheets() {
            return document.styleSheets;
        },
        /** 获取指定样式表 */
        getStyleSheet(stylesheet) {
            return document.styleSheets[stylesheet];
        },
        /** 获取指定样式表的规则 */
        getStyleSheetCssRules(stylesheet) {
            return !!document.styleSheets[stylesheet].cssRules && document.styleSheets[stylesheet].cssRules || !!document.styleSheets[stylesheet].rules && document.styleSheets[stylesheet].rules;
        },
        /** 获取指定样式表的指定规则 */
        getStyleSheetCssRule(stylesheet, cssRules) {
            return !!document.styleSheets[stylesheet].cssRules && document.styleSheets[stylesheet].cssRules[cssRules] || !!document.styleSheets[stylesheet].rules && document.styleSheets[stylesheet].rules[cssRules];
        },
        /** *<selectorText>
         *  在获取的 rule 中，有一个 selectorText 属性，用来表示该样式的选择符
         */
        /** 添加样式 
         * <styleSheet.addRule(selector,style,[index])>
         * （已废弃）
         * styleSheet.insertRule(rules,0) 
         */
        addStyleSheetCssRule(styleSheet, selector, style, index = -1) {
            return !!document.styleSheets[styleSheet].insertRule && document.styleSheets[styleSheet].insertRule(`${selector}{${style}}`, 0) || !!document.styleSheets[styleSheet].addRule && document.styleSheets[styleSheet].addRule(selector, style, index);
        },
        /** 最终样式 
         * 
         *        IE   currentStyle
         *                          node.currentStyle
         *      非IE   getComputedStyle()
         *                          需要使用 document.defaultView 对象中进行访问
         *                                  document.defaultView.getComputedStyle(node,null);
         */
        /** 元素大小
         * 
         */
        /** <CSS end> */
    };
    export default  js;