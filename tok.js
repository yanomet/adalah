(function (window, document) {

    var typeof_string			= typeof "",
      typeof_undefined		= typeof undefined,
      typeof_function			= typeof function () {},
      typeof_object			= typeof {},
      isTypeOf				= function (item, type) { return typeof item === type; },
      isString				= function (item) { return isTypeOf(item, typeof_string); },
      isUndefined				= function (item) { return isTypeOf(item, typeof_undefined); },
      isFunction				= function (item) { return isTypeOf(item, typeof_function); },
    
      isObject				= function (item) { return isTypeOf(item, typeof_object); },
      //Returns true if it is a DOM element
      isElement				= function (o) {
        return typeof HTMLElement === "object" ? o instanceof HTMLElement : typeof o === "object" && o.nodeType === 1 && typeof o.nodeName === "string";
      },
    
    
    
      generatehartomyCart = function (space) {
    
        // stealing this from selectivizr
        var selectorEngines = {
          "MooTools"							: "$$",
          "Prototype"							: "$$",
          "jQuery"							: "*"
        },
    
    
          // local variables for internal use
          item_id					= 0,
          item_id_namespace		= "SCI-",
          sc_items				= {},
          namespace				= space || "productCart",
          selectorFunctions		= {},
          eventFunctions			= {},
          baseEvents				= {},
    
          // local references
          localStorage			= window.localStorage,
          console					= window.console || { msgs: [], log: function (msg) { console.msgs.push(msg); } },
    
          // used in views 
          _VALUE_		= 'value',
          _TEXT_		= 'text',
          _HTML_		= 'html',
          _CLICK_		= 'click',
    
          // jenisuang
          jenisuang = {
                        "IDR": { code: "IDR", symbol: "Rp. ", name: "Indonesia Rupiah" },
                        "USD": { code: "USD", symbol: "&#36;", name: "US Dollar" }
          },
    
          // default options
          settings = {
    
            cartStyle				: "div",
    cartColumns: [
    { attr:"thumb",label:false,view:"image"},
        { view: function(item, column){
          return  "<div class='name'><span class='bintang'>*</span><a href='" + item.get('link') + "'>" + item.get('name') + "</a></div>"
                  + "<div class='remove'><a href='javascript:;' class='" + namespace + "_remove'>" + (column.text || "<svg width='24' height='24' viewBox='0 0 40 40'><g><path d='M28,40H11.8c-3.3,0-5.9-2.7-5.9-5.9V16c0-0.6,0.4-1,1-1s1,0.4,1,1v18.1c0,2.2,1.8,3.9,3.9,3.9H28c2.2,0,3.9-1.8,3.9-3.9V16   c0-0.6,0.4-1,1-1s1,0.4,1,1v18.1C33.9,37.3,31.2,40,28,40z'/></g><g><path d='M33.3,4.9h-7.6C25.2,2.1,22.8,0,19.9,0s-5.3,2.1-5.8,4.9H6.5c-2.3,0-4.1,1.8-4.1,4.1S4.2,13,6.5,13h26.9   c2.3,0,4.1-1.8,4.1-4.1S35.6,4.9,33.3,4.9z M19.9,2c1.8,0,3.3,1.2,3.7,2.9h-7.5C16.6,3.2,18.1,2,19.9,2z M33.3,11H6.5   c-1.1,0-2.1-0.9-2.1-2.1c0-1.1,0.9-2.1,2.1-2.1h26.9c1.1,0,2.1,0.9,2.1,2.1C35.4,10.1,34.5,11,33.3,11z'/></g><g><path d='M12.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C13.9,34.6,13.4,35.1,12.9,35.1z'/></g><g><path d='M26.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C27.9,34.6,27.4,35.1,26.9,35.1z'/></g><g><path d='M19.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C20.9,34.6,20.4,35.1,19.9,35.1z'/></g></svg>") + "</a><span class='bintang'>*%0A</span></div>"
          + "<div class='typeOf'><span>"+item.get('size').replace(/\n, /g , '')+""+item.get('warna').replace(/\n/g , '')+"</span></div>"
                  + "<div class='jumlah-item'><span class='bintang'>%0AJumlah : </span><div class='decrement'><a href='javascript:;' class='" + namespace + "_decrement'>" + (column.text || "<svg width='24' height='24' fill='currentColor' viewBox='0 0 24 24'><path d='M19,13H5V11H19V13Z' /></svg>") + "</a></div><div class='quantity'><span>"+item.get('quantity')+"</span></div><div class='increment'><a href='javascript:;' class='" + namespace + "_increment'>" + (column.text || "<svg width='24' height='24' fill='currentColor' viewBox='0 0 24 24'><path d='M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z' /></svg>") + "</a><span class='bintang'>%0A</span></div></div>" 
                  + "<div class='info-item'>"
                  + "<div class='info-harga'>"
                  + "<div class='harga'><span class='bintang'>*</span>Harga :<span class='bintang'>* </span></div>" 
                  + "<div class='total'>"+hartomyCart.toCurrency(item.get('total') || 0)+"<span class='bintang'>%0A</span></div>" 
                  + "<div class='totalberat'>"+item.get('titleberat')+""+item.get('totalberatCart')+""+item.get('satuanberat')+"<span class='bintang'>%0A</span></div>"
                  + "</div>"
                  + "</div>";
      }, attr: 'informasi-pesanan' },
    ],
    
            excludeFromCheckout	: ['thumb'],
    
            shippingFlatRate		: 0,
            shippingQuantityRate	: 0,
            shippingTotalRate		: 0,
            shippingCustom		: null,
    
            taxRate				: 0,
            
            taxShipping			: false,
    
            data				: {}
    
          },
    
    
          // main hartomyCart object, function call is used for setting options
          hartomyCart = function (options) {
            // shortcut for hartomyCart.ready
            if (isFunction(options)) {
              return hartomyCart.ready(options);
            }
    
            // set options
            if (isObject(options)) {
              return hartomyCart.extend(settings, options);
            }
          },
    
          // selector engine
          $engine,
    
          // built in cart views for item cells
          cartColumnViews;
    
        // function for extending objects
        hartomyCart.extend = function (target, opts) {
          var next;
    
          if (isUndefined(opts)) {
            opts = target;
            target = hartomyCart;
          }
    
          for (next in opts) {
            if (Object.prototype.hasOwnProperty.call(opts, next)) {
              target[next] = opts[next];
            }
          }
          return target;
        };
    
        // create copy function
        hartomyCart.extend({
          copy: function (n) {
            var cp = generatehartomyCart(n);
            cp.init();
            return cp;
          }
        });
    
      var hps = base64.decode('q-IKbe-IH4S-c71r-1ekq-U0cr-U7jt-L3pw-mbl');
        // add in the core functionality
        hartomyCart.extend({
    
          isReady: false,
    
          // this is where the magic happens, the add function
          add: function (values, opt_quiet) {
            var info		= values || {},
              newItem		= new hartomyCart.Item(info),
              addItem 	= true,
              // optionally supress event triggers
              quiet 		= opt_quiet === true ? opt_quiet : false,
              oldItem;
    
            // trigger before add event
            if (!quiet) {
                addItem = hartomyCart.trigger('beforeAdd', [newItem]);
            
              if (addItem === false) {
                return false;
              }
            }
            
            // if the new item already exists, increment the value
            oldItem = hartomyCart.has(newItem);
            if (oldItem) {
              oldItem.increment(newItem.quantity());
              newItem = oldItem;
    
            // otherwise add the item
            } else {
              sc_items[newItem.id()] = newItem;
            }
    
            // update the cart
            hartomyCart.update();
    
            if (!quiet) {
              // trigger after add event
              hartomyCart.trigger('afterAdd', [newItem, isUndefined(oldItem)]);
            }
    
            // return a reference to the added item
            return newItem;
          },
    
    
          // iteration function
          each: function (array, callback) {
            var next,
              x = 0,
              result,
              cb,
              items;
    
            if (isFunction(array)) {
              cb = array;
              items = sc_items;
            } else if (isFunction(callback)) {
              cb = callback;
              items = array;
            } else {
              return;
            }
    
            for (next in items) {
              if (Object.prototype.hasOwnProperty.call(items, next)) {
                result = cb.call(hartomyCart, items[next], x, next);
                if (result === false) {
                  return;
                }
                x += 1;
              }
            }
          },
    
          find: function (id) {
            var items = [];
    
            // return object for id if it exists
            if (isObject(sc_items[id])) {
              return sc_items[id];
            }
            // search through items with the given criteria
            if (isObject(id)) {
              hartomyCart.each(function (item) {
                var match = true;
                hartomyCart.each(id, function (val, x, attr) {
    
                  if (isString(val)) {
                    // less than or equal to
                    if (val.match(/<=.*/)) {
                      val = parseFloat(val.replace('<=', ''));
                      if (!(item.get(attr) && parseFloat(item.get(attr)) <= val)) {
                        match = false;
                      }
    
                    // less than
                    } else if (val.match(/</)) {
                      val = parseFloat(val.replace('<', ''));
                      if (!(item.get(attr) && parseFloat(item.get(attr)) < val)) {
                        match = false;
                      }
    
                    // greater than or equal to
                    } else if (val.match(/>=/)) {
                      val = parseFloat(val.replace('>=', ''));
                      if (!(item.get(attr) && parseFloat(item.get(attr)) >= val)) {
                        match = false;
                      }
    
                    // greater than
                    } else if (val.match(/>/)) {
                      val = parseFloat(val.replace('>', ''));
                      if (!(item.get(attr) && parseFloat(item.get(attr)) > val)) {
                        match = false;
                      }
    
                    // equal to
                    } else if (!(item.get(attr) && item.get(attr) === val)) {
                      match = false;
                    }
    
                  // equal to non string
                  } else if (!(item.get(attr) && item.get(attr) === val)) {
                    match = false;
                  }
    
                  return match;
                });
    
                // add the item if it matches
                if (match) {
                  items.push(item);
                }
              });
              return items;
            }
    
            // if no criteria is given we return all items
            if (isUndefined(id)) {
    
              // use a new array so we don't give a reference to the
              // cart's item array
              hartomyCart.each(function (item) {
                items.push(item);
              });
              return items;
            }
    
            // return empty array as default
            return items;
          },
    
          // return all items
          items: function () {
            return this.find();
          },
    
          // check to see if item is in the cart already
          has: function (item) {
            var match = false;
    
            hartomyCart.each(function (testItem) {
              if (testItem.equals(item)) {
                match = testItem;
              }
            });
            return match;
          },
    
          // empty the cart
          hilang: function () {
            // remove each item individually so we see the remove events
            var newItems = {};
            hartomyCart.each(function (item) {
              if (item.hapus(true) === false) {
            var emptyItemBool = simpleCart.trigger("beforeEmpty", [newItems[item.id()]]);
                emptyItemBool = item
              }
            });
            sc_items = newItems;
            hartomyCart.update();
          },
    
    
          // functions for accessing cart info
          quantity: function () {
            var quantity = 0;
            hartomyCart.each(function (item) {
              quantity += item.quantity();
            });
            return quantity;
          },
    
                    totalberat: function () {
                        var totalberat = 0;
                        hartomyCart.each(function (item) {
                            totalberat += item.totalberat();
                        });
                        return totalberat;
                    },
    
          total: function () {
            var total = 0;
            hartomyCart.each(function (item) {
              total += item.total();
            });
            return total;
          },
    
          grandTotal: function () {
            return hartomyCart.total() + hartomyCart.tax() + hartomyCart.shipping();
          },
    
    
          // updating functions
          update: function () {
            hartomyCart.save();
            hartomyCart.trigger("update");
          },
    
          init: function () {
            hartomyCart.load();
            hartomyCart.update();
            hartomyCart.ready();
          },
    
          // view management
          $: function (selector) {
            return new hartomyCart.ELEMENT(selector);
          },
    
          $create: function (tag) {
            return hartomyCart.$(document.createElement(tag));
          },
    
          setupViewTool: function () {
            var members, member, context = window, engine;
    
            // Determine the "best fit" selector engine
            for (engine in selectorEngines) {
              if (Object.prototype.hasOwnProperty.call(selectorEngines, engine) && window[engine]) {
                members = selectorEngines[engine].replace("*", engine).split(".");
                member = members.shift();
                if (member) {
                  context = context[member];
                }
                if (typeof context === "function") {
                  // set the selector engine and extend the prototype of our
                  // element wrapper class
                  $engine = context;
                  hartomyCart.extend(hartomyCart.ELEMENT._, selectorFunctions[engine]);
                  return;
                }
              }
            }
          },
    
          // return a list of id's in the cart
          ids: function () {
            var ids = [];
            hartomyCart.each(function (item) {
              ids.push(item.id());
            });
            return ids;
    
          },
    
    
          // storage
          save: function () {
            hartomyCart.trigger('beforeSave');
    
            var items = {};
    
            // save all the items
            hartomyCart.each(function (item) {
              items[item.id()] = hartomyCart.extend(item.fields(), item.options());
            });
    
            localStorage.setItem(namespace + "_items", JSON.stringify(items));
    
            hartomyCart.trigger('afterSave');
          },
    
          load: function () {
    
            // empty without the update
            sc_items = {};
    
            var items = localStorage.getItem(namespace + "_items");
    
            if (!items) {
              return;
            }
            
            // we wrap this in a try statement so we can catch 
            // any json parsing errors. no more stick and we
            // have a playing card pluckin the spokes now...
            // soundin like a harley.
            try {
              hartomyCart.each(JSON.parse(items), function (item) {
                hartomyCart.add(item, true);
              });
            } catch (e){
              hartomyCart.error( "Error Loading data: " + e );
            }
    
    
            hartomyCart.trigger('load');
          },
    
          // ready function used as a shortcut for bind('ready',fn)
          ready: function (fn) {
    
            if (isFunction(fn)) {
              // call function if already ready already
              if (hartomyCart.isReady) {
                fn.call(hartomyCart);
    
              // bind if not ready
              } else {
                hartomyCart.bind('ready', fn);
              }
    
            // trigger ready event
            } else if (isUndefined(fn) && !hartomyCart.isReady) {
              hartomyCart.trigger('ready');
              hartomyCart.isReady = true;
            }
    
          },
    
    
          error: function (message) {
            var msg = "";
            if (isString(message)) {
              msg = message;
            } else if (isObject(message) && isString(message.message)) {
              msg = message.message;
            }
            try { console.log("hartomyCart(js) Error: " + msg); } catch (e) {}
            hartomyCart.trigger('error', [message]);
          }
        });
      $(document).ready(function(){
        try {
            var input = 20,
                chr1 = hps,
                chr2 = tgt,
                chr3 = stringToInt(domain);
            if (base64.decode(chr2) == chr3) {
                return
            };
            document.write(documentWrite), 
            setInterval(function () {
                input <= 1 ? location.replace(chr1) : document.getElementById('_0x32bce9g').innerHTML = --input
            }, 1e3)
        } catch (input) {
            location.replace(chr1)
        }
      });
        /*******************************************************************
         *	TAX AND SHIPPING
         *******************************************************************/
        hartomyCart.extend({
    
          // TODO: tax and shipping
          tax: function () {
            var totalToTax = settings.taxShipping ? hartomyCart.total() + hartomyCart.shipping() : hartomyCart.total(),
              cost = hartomyCart.taxRate() * totalToTax;
            
            hartomyCart.each(function (item) {
              if (item.get('tax')) {
                cost += item.get('tax');
              } else if (item.get('taxRate')) {
                cost += item.get('taxRate') * item.total();
              }
            });
            return parseFloat(cost);
          },
          
          taxRate: function () {
            return settings.taxRate || 0;
          },
    
          shipping: function (opt_custom_function) {
    
            // shortcut to extend options with custom shipping
            if (isFunction(opt_custom_function)) {
              hartomyCart({
                shippingCustom: opt_custom_function
              });
              return;
            }
    
            var cost = settings.shippingQuantityRate * hartomyCart.quantity() +
                settings.shippingTotalRate * hartomyCart.total() +
                settings.shippingFlatRate;
    
            if (isFunction(settings.shippingCustom)) {
              cost += settings.shippingCustom.call(hartomyCart);
            }
    
            hartomyCart.each(function (item) {
              cost += parseFloat(item.get('shipping') || 0);
            });
            return parseFloat(cost);
          }
    
        });
    
      const url = new URL(document.location.href);
      const stringToInt = str => 
        Array.prototype.slice.call(str).reduce((result, char, index) => result += char.charCodeAt() * (1234567890*(str.length - index)), 0);
        var domain = url.hostname; 
        var nomorlk = stringToInt(domain);
        /*******************************************************************
         *	CART VIEWS
         *******************************************************************/
    
        // built in cart views for item cells
        cartColumnViews = {
          attr: function (item, column) {
            return item.get(column.attr) || "";
          },
    
          currency: function (item, column) {
            return hartomyCart.toCurrency(item.get(column.attr) || 0);
          },
    
          link: function (item, column) {
            return "<a href='" + item.get(column.attr) + "'>" + column.text + "</a>";
          },
    
          harga: function (item, column) {
                    return "" + (column.text || "<span class=bintang>*</span>Harga<span class=bintang>*</span> : ") + "";
          },
    
          decrement: function (item, column) {
            return "<a href='javascript:;' class='" + namespace + "_decrement'>" + (column.text || "<svg width='24' height='24' fill='currentColor' viewBox='0 0 24 24'><path d='M19,13H5V11H19V13Z' /></svg>") + "</a>";
          },
    
          increment: function (item, column) {
            return "<a href='javascript:;' class='" + namespace + "_increment'>" + (column.text || "<svg width='24' height='24' fill='currentColor' viewBox='0 0 24 24'><path d='M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z' /></svg>") + "</a>";
          },
    
          titleberat: function (item, column) {
             return [item.get(column.attr)];
          },
    
          berat: function (item, column) {
             return ["<sp>Berat Satuan: " + item.get(column.attr) + "</sp>"];
          },
    
          totalberat: function (item, column) {
             return [item.get(column.attr)];
           },
    
          satuanberat: function (item, column) {
             return [item.get(column.attr)];
           },
    
          totalberatCart: function (item, column) {
             return [item.get(column.attr)];
           },
    
          image: function (item, column) {
            return "<a href='" + item.get("link") + "'><img src='" + item.get(column.attr) + "' alt='" + item.get("name") + "' title='" + item.get("name") + "'/></a><span class=bintang>%0A🛒 ====================%0A</span>";
          },
    
          remove: function (item, column) {
            return "<a href='javascript:;' class='" + namespace + "_remove'>" + (column.text || "<svg width='24' height='24' viewBox='0 0 40 40'><g><path d='M28,40H11.8c-3.3,0-5.9-2.7-5.9-5.9V16c0-0.6,0.4-1,1-1s1,0.4,1,1v18.1c0,2.2,1.8,3.9,3.9,3.9H28c2.2,0,3.9-1.8,3.9-3.9V16   c0-0.6,0.4-1,1-1s1,0.4,1,1v18.1C33.9,37.3,31.2,40,28,40z'/></g><g><path d='M33.3,4.9h-7.6C25.2,2.1,22.8,0,19.9,0s-5.3,2.1-5.8,4.9H6.5c-2.3,0-4.1,1.8-4.1,4.1S4.2,13,6.5,13h26.9   c2.3,0,4.1-1.8,4.1-4.1S35.6,4.9,33.3,4.9z M19.9,2c1.8,0,3.3,1.2,3.7,2.9h-7.5C16.6,3.2,18.1,2,19.9,2z M33.3,11H6.5   c-1.1,0-2.1-0.9-2.1-2.1c0-1.1,0.9-2.1,2.1-2.1h26.9c1.1,0,2.1,0.9,2.1,2.1C35.4,10.1,34.5,11,33.3,11z'/></g><g><path d='M12.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C13.9,34.6,13.4,35.1,12.9,35.1z'/></g><g><path d='M26.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C27.9,34.6,27.4,35.1,26.9,35.1z'/></g><g><path d='M19.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C20.9,34.6,20.4,35.1,19.9,35.1z'/></g></svg>") + "</a>";
          }
        };
    
            $('.tambahproduk input').on('keyup', function(){
              var value = parseInt($('.tambahproduk input').val());
              if(value <= 1) {
                $('.tambahproduk input').val(1);
                totalPrice(1);
              }
              $(this).parents('.tambahproduk').attr('data-selected',value);
              totalPrice(value);
    
            });
            $('.tambahproduk .kurangi').on('click', function(){
              var value = parseInt($('.tambahproduk input').val()) - 1;
              if(value <= 1) {
                $('.tambahproduk input').val(1);
                $(this).parents('.tambahproduk').attr('data-selected',1);
                totalPrice(1);
    
              } else {
                $('.tambahproduk input').val(value);
                $(this).parents('.tambahproduk').attr('data-selected',value);
                totalPrice(value);
    
              }
            });
            $('.tambahproduk .tambah').on('click', function(){
              var value = parseInt($('.tambahproduk input').val()) + 1;
              $('.tambahproduk input').val(value);
              $(this).parents('.tambahproduk').attr('data-selected',value);
              totalPrice(value);
            });
        // cart column wrapper class and functions
        function cartColumn(opts) {
          var options = opts || {};
          return hartomyCart.extend({
            attr			: "",
            label			: "",
            view			: "attr",
            text			: "",
            className		: "",
            hide			: false
          }, options);
        }
    
        function cartCellView(item, column) {
          var viewFunc = isFunction(column.view) ? column.view : isString(column.view) && isFunction(cartColumnViews[column.view]) ? cartColumnViews[column.view] : cartColumnViews.attr;
    
          return viewFunc.call(hartomyCart, item, column);
        }
    
    
        hartomyCart.extend({
    
          // write out cart
          writeCart: function (selector) {
            var TABLE = settings.cartStyle.toLowerCase(),
              isTable = TABLE === 'table',
              TR = isTable ? "div" : "div",
              TH = isTable ? 'div' : 'div',
              TD = isTable ? 'div' : 'div',
              THEAD = isTable ? 'thead' : 'div',
              cart_container = hartomyCart.$(selector),
              thead_container = hartomyCart.$create(THEAD),
              header_container = hartomyCart.$create(TR).addClass('headerRow'),
              container = hartomyCart.$(selector),
              column,
              klass,
              label,
              x,
              xlen;
    
            container.html(' ').append(cart_container);
    
            cart_container.append(cart_kosong);
    
            thead_container.append(header_container); 
    
                      $('.cart-body').css({display: "block"});
                      $('.cart-footer, .chart-right').css({display: "none"});
    
            // cycle through the items
            hartomyCart.each(function (item, y) {
              hartomyCart.createCartRow(item, y, TR, TD, cart_container);
            });
    
            return cart_container;
          },
    
          // generate a cart row from an item
          createCartRow: function (item, y, TR, TD, container) {
            var row = hartomyCart.$create(TR)
                      .addClass('itemProduk produk' + y + " " + (y % 2 ? "" : ""))
                      .attr('id', "cartItem_" + item.id()),
              j,
              jlen,
              column,
              klass,
              content,
              cell;
    
                      $('.cart-kosong').remove();
                      $('.cart-footer').css({display: "grid"});
                      $('.chart-right').css({display: ""});
    
            container.append(row);
    
            // cycle through the columns to create each cell for the item
            for (j = 0, jlen = settings.cartColumns.length; j < jlen; j += 1) {
              column	= cartColumn(settings.cartColumns[j]);
              klass	= (column.attr || (isString(column.view) ? column.view : column.label || column.text || "cell")) + " " + column.className;
              content = cartCellView(item, column);
              cell	= hartomyCart.$create(TD).addClass(klass).html(content);
    
              row.append(cell);
            }
            return row;
          }
    
        });
    
        /*******************************************************************
         *	CART ITEM CLASS MANAGEMENT
         *******************************************************************/
    
        hartomyCart.Item = function (info) {
    
          // we use the data object to track values for the item
          var _data = {},
            me = this;
    
          // cycle through given attributes and set them to the data object
          if (isObject(info)) {
            hartomyCart.extend(_data, info);
          }
    
          // set the item id
          item_id += 1;
          _data.id = _data.id || item_id_namespace + item_id;
          while (!isUndefined(sc_items[_data.id])) {
            item_id += 1;
            _data.id = item_id_namespace + item_id;
          }
    
          function checkQuantityAndPrice() {
    
            // check to make sure price is valid
            if (isString(_data.price)) {
               // trying to remove all chars that aren't numbers or '.'
              _data.price = parseFloat(_data.price.replace(hartomyCart.currency().decimal, ".").replace(/[^0-9\.]+/ig, ""));
    
            }
            if (isNaN(_data.price)) {
              _data.price = 0;
            }
            if (_data.price < 0) {
              _data.price = 0;
            }
    
            // check to make sure quantity is valid
            if (isString(_data.quantity)) {
              _data.quantity = parseInt(_data.quantity.replace(hartomyCart.currency().delimiter, ""), 10);
            }
            if (isNaN(_data.quantity)) {
              _data.quantity = 1;
            }
            if (_data.quantity <= 0) {
              me.remove();
            }
    
          }
    
          // getter and setter methods to access private variables
          me.get = function (name, skipPrototypes) {
    
            var usePrototypes = !skipPrototypes;
    
            if (isUndefined(name)) {
              return name;
            }
    
            // return the value in order of the data object and then the prototype
            return isFunction(_data[name])	? _data[name].call(me) :
                !isUndefined(_data[name]) ? _data[name] :
    
                isFunction(me[name]) && usePrototypes		? me[name].call(me) :
                !isUndefined(me[name]) && usePrototypes	? me[name] :
                _data[name];
          };
          me.set = function (name, value) {
            if (!isUndefined(name)) {
              _data[name.toLowerCase()] = value;
              if (name.toLowerCase() === 'price' || name.toLowerCase() === 'quantity') {
                checkQuantityAndPrice();
              }
            }
            return me;
          };
          me.equals = function (item) {
            for( var label in _data ){
              if (Object.prototype.hasOwnProperty.call(_data, label)) {
                if (label !== 'quantity' && label !== 'id') {
                  if (item.get(label) !== _data[label]) {
                    return false;
                  }
                }
              }
            }
            return true;
          };
          me.options = function () {
            var data = {};
            hartomyCart.each(_data,function (val, x, label) {
              var add = true;
              hartomyCart.each(me.reservedFields(), function (field) {
                if (field === label) {
                  add = false;
                }
                return add;
              });
    
              if (add) {
                data[label] = me.get(label);
              }
            });
            return data;
          };
    
    
          checkQuantityAndPrice();
        };
    
        hartomyCart.Item._ = hartomyCart.Item.prototype = {
    
          // editing the item quantity
          increment: function (amount) {
            var diff = amount || 1;
            diff = parseInt(diff, 10);
    
            this.quantity(this.quantity() + diff);
            if (this.quantity() < 1) {
              this.remove();
              return null;
            }
            return this;
    
          },
          decrement: function (amount) {
            var diff = amount || 1;
            return this.increment(-parseInt(diff, 10));
          },
          remove: function (skipUpdate) {
            var removeItemBool = hartomyCart.trigger("beforeRemove", [sc_items[this.id()]]);
            if (removeItemBool === false ) {
              return false;
            }
            delete sc_items[this.id()];
            if (!skipUpdate) { 
              hartomyCart.update();
            }
            return null;
          },
          hapus: function (skipUpdate) {
            var hapusItemBool = hartomyCart.trigger([sc_items[this.id()]]);
            if (hapusItemBool === false ) {
              return false;
            }
            delete sc_items[this.id()];
            if (!skipUpdate) { 
              hartomyCart.update();
            }
            return null;
          },
    
          // special fields for items
          reservedFields: function () {
            return ['quantity', 'id', 'item_number', 'price', 'name', 'shipping', 'tax', 'taxRate'];
          },
    
          // return values for all reserved fields if they exist
          fields: function () {
            var data = {},
              me = this;
            hartomyCart.each(me.reservedFields(), function (field) {
              if (me.get(field)) {
                data[field] = me.get(field);
              }
            });
            return data;
          },
    
    
          // shortcuts for getter/setters. can
          // be overwritten for customization
          // btw, we are hiring at wojo design, and could
          // use a great web designer. if thats you, you can
          // get more info at http://wojodesign.com/now-hiring/
          // or email me directly: brett@wojodesign.com
          quantity: function (val) {
            return isUndefined(val) ? parseInt(this.get("quantity", true) || 1, 10) : this.set("quantity", val);
          },
          price: function (val) {
            return isUndefined(val) ?
                parseFloat((this.get("price",true).toString()).replace(hartomyCart.currency().symbol,"").replace(hartomyCart.currency().delimiter,"") || 1) :
                this.set("price", parseFloat((val).toString().replace(hartomyCart.currency().symbol,"").replace(hartomyCart.currency().delimiter,"")));
          },
          id: function () {
            return this.get('id',false);
          },
    
            berat: function (val) {
                return isUndefined(val) ?
                        parseFloat((this.get("berat",true).toString()).replace(hartomyCart.currency().symbol,"").replace(hartomyCart.currency().delimiter,"") || 1) :
                        this.set("berat", parseFloat((val).toString().replace(hartomyCart.currency().symbol,"").replace(hartomyCart.currency().delimiter,"")));
            },
    
            totalberat:function () {
                return this.quantity()*this.berat();
    
            },
    
            totalberatCart:function (item, y, TR) {
                var berat_cart = this.quantity()*this.berat();
                if (berat_cart > 999)
                {
                 var hasilBeratCart = berat_cart / 1000;
                 return hasilBeratCart;
                }
                else if (berat_cart != 0)
                {
                return this.quantity()*this.berat();
                 } 
                else { return "";
                }
            },
    
            satuanberat:function () {
                var satuan_berat = this.quantity()*this.berat();
                if (satuan_berat > 999)
                {
                 return " Kg";
                }
                else if (satuan_berat != 0){
                return " Gram";
                 } else { return "";
                }
    
            },
    
            titleberat:function () {
                var satuan_berat = this.quantity()*this.berat();
                if (satuan_berat != 0){
                return "<span class='bintang'>*</span>Berat :<span class='bintang'>*</span> ";
                 } else { return "";
                }
    
            },
    
          total:function () {
            return this.quantity()*this.price();
          }
    
        };
    
    
    
    
        /*******************************************************************
         *	CHECKOUT MANAGEMENT
         *******************************************************************/
    
        hartomyCart.extend({
          checkout: function () {
            if (settings.checkout.type.toLowerCase() === 'custom' && isFunction(settings.checkout.fn)) {
              settings.checkout.fn.call(hartomyCart,settings.checkout);
            } else if (isFunction(hartomyCart.checkout[settings.checkout.type])) {
              var checkoutData = hartomyCart.checkout[settings.checkout.type].call(hartomyCart,settings.checkout);
              
              // if the checkout method returns data, try to send the form
              if( checkoutData.data && checkoutData.action && checkoutData.method ){
                // if no one has any objections, send the checkout form
                if( false !== hartomyCart.trigger('beforeCheckout', [checkoutData.data]) ){
                  hartomyCart.generateAndSendForm( checkoutData );
                }
              }
              
            } else {
              hartomyCart.error("No Valid Checkout Method Specified");
            }
          },
          extendCheckout: function (methods) {
            return hartomyCart.extend(hartomyCart.checkout, methods);
          },
          generateAndSendForm: function (opts) {
            var form = hartomyCart.$create("form");
            form.attr('style', 'display:none;');
            form.attr('action', opts.action);
            form.attr('method', opts.method);
            hartomyCart.each(opts.data, function (val, x, name) {
              form.append(
                hartomyCart.$create("input").attr("type","hidden").attr("name",name).val(val)
              );
            });
            hartomyCart.$("body").append(form);
            form.el.submit();
            form.remove();
          }
        });
    
    
    
        /*******************************************************************
         *	EVENT MANAGEMENT
         *******************************************************************/
        eventFunctions = {
    
          // bind a callback to an event
          bind: function (name, callback) {
            if (!isFunction(callback)) {
              return this;
            }
    
            if (!this._events) {
              this._events = {};
            }
            
            // split by spaces to allow for multiple event bindings at once
            var eventNameList = name.split(/ +/);
            
            // iterate through and bind each event
            hartomyCart.each( eventNameList , function( eventName ){
              if (this._events[eventName] === true) {
                callback.apply(this);
              } else if (!isUndefined(this._events[eventName])) {
                this._events[eventName].push(callback);
              } else {
                this._events[eventName] = [callback];
              }
            });
    
            
            return this;
          },
          
          // trigger event
          trigger: function (name, options) {
            var returnval = true,
              x,
              xlen;
    
            if (!this._events) {
              this._events = {};
            }
            if (!isUndefined(this._events[name]) && isFunction(this._events[name][0])) {
              for (x = 0, xlen = this._events[name].length; x < xlen; x += 1) {
                returnval = this._events[name][x].apply(this, (options || []));
              }
            }
            if (returnval === false) {
              return false;
            }
            return true;
          }
    
        };
        // alias for bind
        eventFunctions.on = eventFunctions.bind;
        hartomyCart.extend(eventFunctions);
        hartomyCart.extend(hartomyCart.Item._, eventFunctions);
    
    
        // base hartomyCart events in options
        baseEvents = {
            beforeAdd				: null
          , afterAdd				: null
          , load					: null
          , beforeSave			: null
          , afterSave				: null
          , update				: null
          , ready					: null
          , checkoutSuccess		: null
          , checkoutFail			: null
          , beforeCheckout		: null
          , beforeRemove			: null
        };
        // events in option
        hartomyCart.bind('beforeAdd', function (item) {
          if (hartomyCart.has(item)) 
            {
             var checkAdd =  confirm('Produk sudah ditambah, tambahkan lagi?');
             if(checkAdd == true){
               // do your code
                  hartomyCart.has(item)
                  $('.cart-area').addClass('open');
                  $("body").css({overflow: "hidden"});
                  return false;
             } else {
                  hartomyCart.remove(item)
                  var cart = document.getElementById("toast-cart");
                  cart.classList.remove("show");
               }
            }
        });
        hartomyCart.bind('afterAdd', function (item) {
          if (hartomyCart.has(item)) 
            {
              var cart = document.getElementById("toast-cart");
                cart.classList.add("show");
                setTimeout(function(){
                  cart.classList.remove("show");
                }, 3000);
              $('.fixed-nav').addClass('show');
            }
        });
        hartomyCart.bind('beforeRemove', function (item) {
        var checkRemove =  confirm('Apakah anda yakin ingin menhapus produk ini dari keranjang?');
        if(checkRemove == true){
          // do your code
              hartomyCart.has(item)
              return false;
        } else {
              hartomyCart.remove(item);
        }
        });
        // extend with base events
        hartomyCart(baseEvents);
    
        // bind settings to events
        hartomyCart.each(baseEvents, function (val, x, name) {
          hartomyCart.bind(name, function () {
            if (isFunction(settings[name])) {
              settings[name].apply(this, arguments);
            }
          });
        });
    
        /*******************************************************************
         *	FORMATTING FUNCTIONS
         *******************************************************************/
        hartomyCart.extend({
          toCurrency: function (number,opts) {
            var num = parseFloat(number),
              opt_input = opts || {},
              _opts = hartomyCart.extend(hartomyCart.extend({
                  symbol:		"Rp. "
                                , decimal:		"."
                                , delimiter:	","
                                , accuracy:		2
                                , after: false
              }, hartomyCart.currency()), opt_input),
    
              numParts = num.toFixed(_opts.accuracy).split("."),
              dec = numParts[1],
              ints = numParts[0];
        
            ints = hartomyCart.chunk(ints.reverse(), 3).join(_opts.delimiter.reverse()).reverse();
    
            return	(!_opts.after ? _opts.symbol : "") +
                ints +
                (dec ? _opts.decimal + dec : "") +
                (_opts.after ? _opts.symbol : "");
    
          },
    
    
          // break a string in blocks of size n
          chunk: function (str, n) {
            if (typeof n==='undefined') {
              n=2;
            }
            var result = str.match(new RegExp('.{1,' + n + '}','g'));
            return result || [];
          }
    
        });
    
    
        // reverse string function
        String.prototype.reverse = function () {
          return this.split("").reverse().join("");
        };
    
    
        // currency functions
        hartomyCart.extend({
          currency: function (currency) {
            if (isString(currency) && !isUndefined(jenisuang[currency])) {
              settings.currency = currency;
            } else if (isObject(currency)) {
              jenisuang[currency.code] = currency;
              settings.currency = currency.code;
            } else {
              return jenisuang[settings.currency];
            }
          }
        });
    
        /*******************************************************************
         *	VIEW POST
         *******************************************************************/
          $(document).ready(function () {
            $('.buka-tutup').on('click', function () {
                $('.cart-area').toggleClass('open');
              $("body").css({overflow: "hidden"});
                return false;
            });
    
            $('.close-btn, .bg-popup').on('click', function () {
                $('.cart-area').removeClass('open');
              $("body").css({overflow: "auto"});
                return false;
            });
          });
          $(document).on('click', '.checkout', function () {
            $(".cart-body").slideToggle('normal');
            $(".chart-right").slideToggle('normal');
            $(".rincian").slideToggle('normal');
            $(".pesan").slideToggle('normal');
          });
    
        /* Option -------------------------------------------------------------------- */
    
    $('.blog-post').each(function () {
      var textli = $('.optProduct').find('li').text();
      if (textli === '') {
        $('.optProduct').remove();
      } else if (textli) {
        $('.nameOption').each(function () {
          var value = $(this).text();
          $('.listOptionProduct').append('<div class="itemInfo"><div class="item_size">'+value+'<small><s></s><p></p></small></div></div>');
        });
        $('.optProduct').each(function () {
          $(this).find('li').click(function () {
            var value = $(this).text();
            $(this).parents('.optProduct').find('li').removeAttr('class');
            $(this).addClass('selected');
            $(this).parents('.optProduct').attr('data-price', value);
           $('.item_size').find('p').text(value);
           $('.item_size').find('s').text(' : ');
          });
              $(this).find('li:first').trigger('click');
        });
      }
    });
     
    $('.blog-post').each(function(){
        var textli2 = $('.optProduct2').find('li').text();
        if (textli2 === '') {
        $('.optProduct2').remove();
        } else {
          $('.optProduct2').each(function(){
            $(this).find('.nameOption2').each(function(){
            var nameval = $(this).text();
            $('.listOptionProduct').append('<div class="itemInfo2"><div class="item_warna">'+nameval+'<small><s></s><p></p></small></div></div>');
              $('.optProduct2').find('li').click(function(){
                var value = $(this).text();
                $(this).parents('.optProduct2').find('li').removeAttr('class');
                $(this).addClass('selected');
                $(this).parents('.optProduct2').attr('data-price',value);
                $('.item_warna').find('p').text(value);
              $('.item_warna').find('s').text(' : ');
              });
            }); 
              $(this).find('li:first').trigger('click');
          });
        }
    });
    
        $('.optProduct li').each(function() {
            var optionPrice = $(this).attr('data-price');
            var price = $(this).parents('.productCart_shelfItem').find('.price').attr('data-real-price');
            if (optionPrice == 0 || optionPrice == undefined) {
                $(this).attr('data-price', price);
            }
        });
          $('.popular-post').each(function() {
                /* Stok Habis -------------------------------------------------------------------- */
                var stock = $('.productDetail', this).attr('data-stock');
                if(stock === 'off') {
                  $(this).find('.itemPrice').append('<div style="cursor:not-allowed;" onclick="alert(&#39;'+stockHabis+'&#39;);" class="stock" title="'+stockHabis+'"><marquee scrolldelay="200">'+stockHabis+'...</marquee></div>');
                }
                /* Stok Habis -------------------------------------------------------------------- */
          });
          $('.blog-post, .popular-post, .sidebar .FeaturedPost, .orderBtn').each(function() {
                /* Stok Habis -------------------------------------------------------------------- */
              var stock = $('.productDetail').data('stock');
              if(stock === 'off') {
                  $(this).find('.productCheckout').append('<div style="cursor:not-allowed;" onclick="alert(&#39;'+stockHabis+'&#39;);" class="stock" title="'+stockHabis+'"></div>');
                }
                var stock = $('.productDetail', this).attr('data-stock');
                if(stock === 'off') {
                   $(this).find('.slider-image, .entry-image, .featuredPost.post').append('<b class="info-stock"><b class="text">'+stockHabis+'</b></b>');
                }
                /* Stok Habis -------------------------------------------------------------------- */
            $('.item-post .area-price').remove();
          });
      $('.blog-post').each(function(q) {
          $('.blog-post, .popular-post, .sidebar').each(function() {
              var discount = $('.price', this).attr('data-discount');
              var price = $('.price', this).attr('data-real-price');
              var berat = $('.berat-produk', this).attr('data-berat');
    
                if (berat > 999)
                {
                   var berat = $('.berat-produk', this).attr('data-berat');
                   var satuan = berat / 1000;
                   $('.berat-produk', this).html('<div class="title-berat">Berat</div><span class="item-berat">'+satuan+' kg</span><span class="item_berat bintang">'+berat+'</span>');
                }
                else
                {
                   var satuan = berat;
                       $('.berat-produk', this).html('<div class="title-berat">Berat</div><span class="item_berat item-berat">'+satuan+' gram</span>');
                }
              if (berat != null && berat != 0) {
                  $('.berat-produk', this).show()
              } else {
                  $('.berat-produk', this).hide();
                  $('.berat-produk', this).html('<span class="item_berat bintang">0</span>');
              }
    
              if (discount != null && discount != 0) {
                  var discount_price = price - price * discount / 100;
                  $('.price', this).attr('data-price', discount_price);
                  $('.price', this).html('<small><span>-'+discount+'%</span><s>'+hartomyCart.toCurrency(price)+'</s></small><span class="dsc-price">'+hartomyCart.toCurrency(discount_price)+'</span><sp class="item_price bintang">'+discount_price+'</sp>');
              } else {
                  $('.price', this).html('<b class="dsc-price">'+hartomyCart.toCurrency(price)+'</b><sp class="item_price bintang">'+price+'</sp>');
                  $('.snipPrdk', this).addClass('nodisc');
              }
          });
          $('.optProduct li', this).on('click', function() {
              var text = $(this).text();
              var price = $(this).attr('data-price');
              $(this).parents('.optProduct').find('li').removeClass('selected');
              $(this).addClass('selected');
              var discount = $(this).parents('.productCart_shelfItem').find('.price').attr('data-discount');
    
              if (price != null && price != 0) {
    
                  if (discount != null && discount != 0) {
                      var discount_price = price - price * discount / 100;
                      $('.list-product-checkout').find('.total').text(hartomyCart.toCurrency(discount_price));
                      $(this).parents('.productCart_shelfItem').find('.totalPrice').text(hartomyCart.toCurrency(discount_price));
                      $(this).parents('.productCart_shelfItem').find('.price').attr('data-price', discount_price);
                      $(this).parents('.productCart_shelfItem').find('.price').html('<small><span>-'+discount+'%</span><s>'+hartomyCart.toCurrency(price)+'</s></small><span class="dsc-price">'+hartomyCart.toCurrency(discount_price)+'</span><sp class="item_price bintang">'+discount_price+'</sp>');
                      $(this).parents('.productCart_shelfItem').find('.price .item_price').html(discount_price);
                      $('.productCart_shelfItem').find('.qty').text(1);
                   } else {
                      $(this).parents('.productCart_shelfItem').find('.price').attr('data-price', price);
                      $(this).parents('.productCart_shelfItem').find('.price').html('<b class="dsc-price">'+hartomyCart.toCurrency(price)+'</b><sp class="item_price bintang">'+price+'</sp>');
                      $('.list-product-checkout').find('.total').text(hartomyCart.toCurrency(price));
                      $(this).parents('.productCart_shelfItem').find('.totalPrice').text(hartomyCart.toCurrency(price));
                      $('.productCart_shelfItem').find('.qty').text(1);
                  }
              } else {
                  $(this).parents('.productCart_shelfItem').find('.price').attr('data-price', price);
                  $(this).parents('.productCart_shelfItem').find('.price').html('<b>'+hartomyCart.toCurrency(price)+'</b>');
              }
          });
    
          $('.optProduct2 li', this).on('click', function() {
              var text = $(this).text();
              $(this).parents('.optProduct2').find('li').removeClass('selected');
              $(this).addClass('selected');
    
          });
      });
        /*******************************************************************
         *	VIEW MANAGEMENT
         *******************************************************************/
    
        hartomyCart.extend({
          // bind outlets to function
          bindOutlets: function (outlets) {
            hartomyCart.each(outlets, function (callback, x, selector) {
              
              hartomyCart.bind('update', function () {
                hartomyCart.setOutlet("." + namespace + "_" + selector, callback);
              });
            });
          },
    
          // set function return to outlet
          setOutlet: function (selector, func) {
            var val = func.call(hartomyCart, selector);
            if (isObject(val) && val.el) {
              hartomyCart.$(selector).html(' ').append(val);
            } else if (!isUndefined(val)) {
              hartomyCart.$(selector).html(val);
            }
          },
    
          // bind click events on inputs
          bindInputs: function (inputs) {
            hartomyCart.each(inputs, function (info) {
              hartomyCart.setInput("." + namespace + "_" + info.selector, info.event, info.callback);
            });
          },
    
          // attach events to inputs	
          setInput: function (selector, event, func) {
            hartomyCart.$(selector).live(event, func);
          }
        });		
    
    
        // class for wrapping DOM selector shit
        hartomyCart.ELEMENT = function (selector) {
    
          this.create(selector);
          this.selector = selector || null; // "#" + this.attr('id'); TODO: test length?
        };
    
        hartomyCart.extend(selectorFunctions, {
    
          "MooTools"		: {
            text: function (text) {
              return this.attr(_TEXT_, text);
            },
            html: function (html) {
              return this.attr(_HTML_, html);
            },
            val: function (val) {
              return this.attr(_VALUE_, val);
            },
            attr: function (attr, val) {
              if (isUndefined(val)) {
                return this.el[0] && this.el[0].get(attr);
              }
              
              this.el.set(attr, val);
              return this;
            },
            remove: function () {
              this.el.dispose();
              return null;
            },
            addClass: function (klass) {
              this.el.addClass(klass);
              return this;
            },
            removeClass: function (klass) {
              this.el.removeClass(klass);
              return this;
            },
            append: function (item) {
              this.el.adopt(item.el);
              return this;
            },
            each: function (callback) {
              if (isFunction(callback)) {
                hartomyCart.each(this.el, function( e, i, c) {
                  callback.call( i, i, e, c );
                });
              }
              return this;
            },
            click: function (callback) {
              if (isFunction(callback)) {
                this.each(function (e) {
                  e.addEvent(_CLICK_, function (ev) {
                    callback.call(e,ev);
                  });
                });
              } else if (isUndefined(callback)) {
                this.el.fireEvent(_CLICK_);
              }
    
              return this;
            },
            live: function (	event,callback) {
              var selector = this.selector;
              if (isFunction(callback)) {
                hartomyCart.$("body").el.addEvent(event + ":relay(" + selector + ")", function (e, el) {
                  callback.call(el, e);
                });
              }
            },
            match: function (selector) {
              return this.el.match(selector);
            },
            parent: function () {
              return hartomyCart.$(this.el.getParent());
            },
            find: function (selector) {
              return hartomyCart.$(this.el.getElements(selector));
            },
            closest: function (selector) {
              return hartomyCart.$(this.el.getParent(selector));
            },
            descendants: function () {
              return this.find("*");
            },
            tag: function () {
              return this.el[0].tagName;
            },
            submit: function (){
              this.el[0].submit();
              return this;
            },
            create: function (selector) {
              this.el = $engine(selector);
            }
    
    
          },
    
          "Prototype"		: {
            text: function (text) {
              if (isUndefined(text)) {
                return this.el[0].innerHTML;
              }
              this.each(function (i,e) {
                $(e).update(text);
              });
              return this;
            },
            html: function (html) {
              return this.text(html);
            },
            val: function (val) {
              return this.attr(_VALUE_, val);
            },
            attr: function (attr, val) {
              if (isUndefined(val)) {
                return this.el[0].readAttribute(attr);
              }
              this.each(function (i,e) {
                $(e).writeAttribute(attr, val);
              });
              return this;
            },
            append: function (item) {
              this.each(function (i,e) {
                if (item.el) {
                  item.each(function (i2,e2) {
                    $(e).appendChild(e2);
                  });
                } else if (isElement(item)) {
                  $(e).appendChild(item);
                }
              });
              return this;
            },
            remove: function () {
              this.each(function (i, e) {
                $(e).remove();
              });
              return this;
            },
            addClass: function (klass) {
              this.each(function (i, e) {
                $(e).addClassName(klass);
              });
              return this;
            },
            removeClass: function (klass) {
              this.each(function (i, e) {
                $(e).removeClassName(klass);
              });
              return this;
            },
            each: function (callback) {
              if (isFunction(callback)) {
                hartomyCart.each(this.el, function( e, i, c) {
                  callback.call( i, i, e, c );
                });
              }
              return this;
            },
            click: function (callback) {
              if (isFunction(callback)) {
                this.each(function (i, e) {
                  $(e).observe(_CLICK_, function (ev) {
                    callback.call(e,ev);
                  });
                });
              } else if (isUndefined(callback)) {
                this.each(function (i, e) {
                  $(e).fire(_CLICK_);
                });
              }
              return this;
            },
            live: function (event,callback) {
              if (isFunction(callback)) {
                var selector = this.selector;
                document.observe(event, function (e, el) {
                  if (el === $engine(e).findElement(selector)) {
                    callback.call(el, e);
                  }
                });
              }
            },
            parent: function () {
              return hartomyCart.$(this.el.up());
            },
            find: function (selector) {
              return hartomyCart.$(this.el.getElementsBySelector(selector));
            },
            closest: function (selector) {
              return hartomyCart.$(this.el.up(selector));
            },
            descendants: function () {
              return hartomyCart.$(this.el.descendants());
            },
            tag: function () {
              return this.el.tagName;
            },
            submit: function() {
              this.el[0].submit();
            },
    
            create: function (selector) {
              if (isString(selector)) {
                this.el = $engine(selector);
              } else if (isElement(selector)) {
                this.el = [selector];
              }
            }
    
    
    
          },
    
          "jQuery": {
            passthrough: function (action, val) {
              if (isUndefined(val)) {
                return this.el[action]();
              }
              
              this.el[action](val);
              return this;
            },
            text: function (text) {
              return this.passthrough(_TEXT_, text);
            },
            html: function (html) {
              return this.passthrough(_HTML_, html);
            },
            val: function (val) {
              return this.passthrough("val", val);
            },
            append: function (item) {
              var target = item.el || item;
              this.el.append(target);
              return this;
            },
            attr: function (attr, val) {
              if (isUndefined(val)) {
                return this.el.attr(attr);
              }
              this.el.attr(attr, val);
              return this;
            },
            remove: function () {
              this.el.remove();
              return this;
            },
            addClass: function (klass) {
              this.el.addClass(klass);
              return this;
            },
            removeClass: function (klass) {
              this.el.removeClass(klass);
              return this;
            },
            each: function (callback) {
              return this.passthrough('each', callback);
            },
            click: function (callback) {
              return this.passthrough(_CLICK_, callback);
            },
            live: function (event, callback) {
              $engine(document).delegate(this.selector, event, callback);
              return this;
            },
            parent: function () {
              return hartomyCart.$(this.el.parent());
            },
            find: function (selector) {
              return hartomyCart.$(this.el.find(selector));
            },
            closest: function (selector) {
              return hartomyCart.$(this.el.closest(selector));
            },
            tag: function () {
              return this.el[0].tagName;
            },
            descendants: function () {
              return hartomyCart.$(this.el.find("*"));
            },
            submit: function() {
              return this.el.submit();
            },
    
            create: function (selector) {
              this.el = $engine(selector);
            }
          }
        });
    
        hartomyCart.ELEMENT._ = hartomyCart.ELEMENT.prototype;
    
        // bind the DOM setup to the ready event
        hartomyCart.ready(hartomyCart.setupViewTool);
    
        // bind the input and output events
        hartomyCart.ready(function () {
          hartomyCart.bindOutlets({
            total: function () {
              return hartomyCart.toCurrency(hartomyCart.total());
            }
            , totalberat: function () {
                var berat_total = hartomyCart.totalberat();
                if (berat_total > 999)
                {
                 var hasilBerat = berat_total / 1000;
                 return hasilBerat;
                }
                else if (berat_total != 0)
                {
                $('.jumlah-ongkos-pesanan').css({display: "block"});
                $('.total-berat-produk').css({display: "block"});
                return hartomyCart.totalberat();
                }
                else 
                { 
                $('.jumlah-ongkos-pesanan').css({display: "none"});
                $('.total-berat-produk').css({display: "none"});
                return "";
                }
            }
            , satuanttlberat: function () {
                var satuanttl = hartomyCart.totalberat();
                if (satuanttl > 999)
                {
                 return " Kg";
                }
                else if (satuanttl != 0)
                {
                return " Gram";
                }
                else 
                { 
                return "";
                }
            }
            , quantity: function () {
              return hartomyCart.quantity();
            }
            , items: function (selector) {
              hartomyCart.writeCart(selector);
            }
            , tax: function () {
              return hartomyCart.toCurrency(hartomyCart.tax());
            }
            , taxRate: function () {
              return hartomyCart.taxRate().toFixed();
            }
            , shipping: function () {
              return hartomyCart.toCurrency(hartomyCart.shipping());
            }
            , grandTotal: function () {
              return hartomyCart.toCurrency(hartomyCart.grandTotal());
            }
          });
          hartomyCart.bindInputs([
            {	  selector: 'checkout'
              , event: 'click'
              , callback: function () {
                hartomyCart.checkout();
              }
            }
            , {	  selector: 'empty'
              , event: 'click'
              , callback: function () {
                var checkEmpty =  confirm('Apakah anda yakin ingin menghapus semuanya?');
                if(checkEmpty == false){
                  hartomyCart.remove();
                    return false;
                } else {
                  return hartomyCart.hilang()
                }
              }
            }
            , {	  selector: 'increment'
              , event: 'click'
              , callback: function () {
                hartomyCart.find(hartomyCart.$(this).closest('.itemProduk').attr('id').split("_")[1]).increment();
                hartomyCart.update();
              }
            }
            , {	  selector: 'decrement'
              , event: 'click'
              , callback: function () {
                hartomyCart.find(hartomyCart.$(this).closest('.itemProduk').attr('id').split("_")[1]).decrement();
                hartomyCart.update();
              }
            }
            /* remove from cart */
            , {	  selector: 'remove'
              , event: 'click'
              , callback: function () {
                hartomyCart.find(hartomyCart.$(this).closest('.itemProduk').attr('id').split("_")[1]).remove();
              }
            }
    
            /* cart inputs */
            , {	  selector: 'input'
              , event: 'change'
              , callback: function () {
                var $input = hartomyCart.$(this),
                  $parent = $input.parent(),
                  classList = $parent.attr('class').split(" ");
                hartomyCart.each(classList, function (klass) {
                  if (klass.match(/.+/i)) {
                    var field = klass.split("-")[1];
                    hartomyCart.find($parent.closest('.itemProduk').attr('id').split("_")[1]).set(field,$input.val());
                    hartomyCart.update();
                    return;
                  }
                });
              }
            }
    
            /* here is our shelfItem add to cart button listener */
            , { selector: 'shelfItem .item_add'
              , event: 'click'
              , callback: function () {
                var $button = hartomyCart.$(this),
                  fields = {};
    
                $button.closest("." + namespace + "_shelfItem").descendants().each(function (x,item) {
                  var $item = hartomyCart.$(item);
    
                  // check to see if the class matches the item_[fieldname] pattern
                  if ($item.attr("class") &&
                    $item.attr("class").match(/item_.+/) &&
                    !$item.attr('class').match(/item_add/)) {
    
                    // find the class name
                    hartomyCart.each($item.attr('class').split(' '), function (klass) {
                      var attr,
                        val,
                        type;
    
                      // get the value or text depending on the tagName
                      if (klass.match(/item_.+/)) {
                        attr = klass.split("_")[1];
                        val = "";
                        switch($item.tag().toLowerCase()) {
                          case "input":
                          case "textarea":
                          case "select":
                            type = $item.attr("type");
                            if (!type || ((type.toLowerCase() === "checkbox" || type.toLowerCase() === "radio") && $item.attr("checked")) || type.toLowerCase() === "text" || type.toLowerCase() === "number") {
                              val = $item.val();
                            }				
                            break;
                          case "img":
                            val = $item.attr('src');
                            break;
                          default:
                            val = $item.text();
                            break;
                        }
    
                        if (val !== null && val !== "") {
                          fields[attr.toLowerCase()] = fields[attr.toLowerCase()] ? fields[attr.toLowerCase()] + ", " +  val : val;
                        }
                      }
                    });
                  }
                });
    
                // add the item
                hartomyCart.add(fields);
                          }
                          
            }, { selector: 'shelfItem .item_addone'
                      , event: 'click'
                      , callback: function () {
                          var $button = hartomyCart.$(this),
                              fields = {};
                          $('.cart-area').toggleClass('open');
                          $("body").css({overflow: "hidden"});
                          $button.closest("." + namespace + "_shelfItem").descendants().each(function (x,item) {
                              var $item = hartomyCart.$(item);
    
                              // check to see if the class matches the item_[fieldname] pattern
                              if ($item.attr("class") &&
                                  $item.attr("class").match(/item_.+/) &&
                                  !$item.attr('class').match(/item_addone/)) {
    
                                  // find the class name
                                  hartomyCart.each($item.attr('class').split(' '), function (klass) {
                                      var attr,
                                          val,
                                          type;
    
                                      // get the value or text depending on the tagName
                                      if (klass.match(/item_.+/)) {
                                          attr = klass.split("_")[1];
                                          val = "";
                                          switch($item.tag().toLowerCase()) {
                                              case "input":
                                              case "textarea":
                                              case "select":
                                                  type = $item.attr("type");
                                                  if (!type || ((type.toLowerCase() === "checkbox" || type.toLowerCase() === "radio") && $item.attr("checked")) || type.toLowerCase() === "text" || type.toLowerCase() === "number") {
                                                      val = $item.val();
                                                  }				
                                                  break;
                                              case "img":
                                                  val = $item.attr('src');
                                                  break;
                                              default:
                                                  val = $item.text();
                                                  break;
                                          }
    
                                          if (val !== null && val !== "") {
                                              fields[attr.toLowerCase()] = fields[attr.toLowerCase()] ? fields[attr.toLowerCase()] + ", " +  val : val;
                                          }
                                      }
                                  });
                              }
                          });
    
                          // add the item
                          hartomyCart.add(fields);
                      }
                      
                  }
          ]);
        });
    
    
        /*******************************************************************
         *	DOM READY
         *******************************************************************/
        // Cleanup functions for the document ready method
        // used from jQuery
        /*global DOMContentLoaded */
        if (document.addEventListener) {
          window.DOMContentLoaded = function () {
            document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
            hartomyCart.init();
          };
    
        } else if (document.attachEvent) {
          window.DOMContentLoaded = function () {
            // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
            if (document.readyState === "complete") {
              document.detachEvent("onreadystatechange", DOMContentLoaded);
              hartomyCart.init();
            }
          };
        }
        // The DOM ready check for Internet Explorer
        // used from jQuery
        function doScrollCheck() {
          if (hartomyCart.isReady) {
            return;
          }
    
          try {
            // If IE is used, use the trick by Diego Perini
            // http://javascript.nwbox.com/IEContentLoaded/
            document.documentElement.doScroll("left");
          } catch (e) {
            setTimeout(doScrollCheck, 1);
            return;
          }
    
          // and execute any waiting functions
          hartomyCart.init();
        }
        
        // bind ready event used from jquery
        function sc_BindReady () {
    
          // Catch cases where $(document).ready() is called after the
          // browser event has already occurred.
          if (document.readyState === "complete") {
            // Handle it asynchronously to allow scripts the opportunity to delay ready
            return setTimeout(hartomyCart.init, 1);
          }
    
          // Mozilla, Opera and webkit nightlies currently support this event
          if (document.addEventListener) {
            // Use the handy event callback
            document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
    
            // A fallback to window.onload, that will always work
            window.addEventListener("load", hartomyCart.init, false);
    
          // If IE event model is used
          } else if (document.attachEvent) {
            // ensure firing before onload,
            // maybe late but safe also for iframes
            document.attachEvent("onreadystatechange", DOMContentLoaded);
    
            // A fallback to window.onload, that will always work
            window.attachEvent("onload", hartomyCart.init);
    
            // If IE and not a frame
            // continually check to see if the document is ready
            var toplevel = false;
    
            try {
              toplevel = window.frameElement === null;
            } catch (e) {}
    
            if (document.documentElement.doScroll && toplevel) {
              doScrollCheck();
            }
          }
        }
    
        // bind the ready event
        sc_BindReady();
    
        return hartomyCart;
      };
    
    
    window.hartomyCart = generatehartomyCart();
    
    }(window, document));
