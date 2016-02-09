//(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){var type;try{type=require("type-of")}catch(ex){var r=require;type=r("type")}var jsonpID=0,document=window.document,key,name,rscript=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,scriptTypeRE=/^(?:text|application)\/javascript/i,xmlTypeRE=/^(?:text|application)\/xml/i,jsonType="application/json",htmlType="text/html",blankRE=/^\s*$/;var ajax=module.exports=function(options){var settings=extend({},options||{});for(key in ajax.settings)if(settings[key]===undefined)settings[key]=ajax.settings[key];ajaxStart(settings);if(!settings.crossDomain)settings.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(settings.url)&&RegExp.$2!=window.location.host;var dataType=settings.dataType,hasPlaceholder=/=\?/.test(settings.url);if(dataType=="jsonp"||hasPlaceholder){if(!hasPlaceholder)settings.url=appendQuery(settings.url,"callback=?");return ajax.JSONP(settings)}if(!settings.url)settings.url=window.location.toString();serializeData(settings);var mime=settings.accepts[dataType],baseHeaders={},protocol=/^([\w-]+:)\/\//.test(settings.url)?RegExp.$1:window.location.protocol,xhr=ajax.settings.xhr(),abortTimeout;if(!settings.crossDomain)baseHeaders["X-Requested-With"]="XMLHttpRequest";if(mime){baseHeaders["Accept"]=mime;if(mime.indexOf(",")>-1)mime=mime.split(",",2)[0];xhr.overrideMimeType&&xhr.overrideMimeType(mime)}if(settings.contentType||settings.data&&settings.type.toUpperCase()!="GET")baseHeaders["Content-Type"]=settings.contentType||"application/x-www-form-urlencoded";settings.headers=extend(baseHeaders,settings.headers||{});xhr.onreadystatechange=function(){if(xhr.readyState==4){clearTimeout(abortTimeout);var result,error=false;if(xhr.status>=200&&xhr.status<300||xhr.status==304||xhr.status==0&&protocol=="file:"){dataType=dataType||mimeToDataType(xhr.getResponseHeader("content-type"));result=xhr.responseText;try{if(dataType=="script")(1,eval)(result);else if(dataType=="xml")result=xhr.responseXML;else if(dataType=="json")result=blankRE.test(result)?null:JSON.parse(result)}catch(e){error=e}if(error)ajaxError(error,"parsererror",xhr,settings);else ajaxSuccess(result,xhr,settings)}else{ajaxError(null,"error",xhr,settings)}}};var async="async"in settings?settings.async:true;xhr.open(settings.type,settings.url,async);for(name in settings.headers)xhr.setRequestHeader(name,settings.headers[name]);if(ajaxBeforeSend(xhr,settings)===false){xhr.abort();return false}if(settings.timeout>0)abortTimeout=setTimeout(function(){xhr.onreadystatechange=empty;xhr.abort();ajaxError(null,"timeout",xhr,settings)},settings.timeout);xhr.send(settings.data?settings.data:null);return xhr};function triggerAndReturn(context,eventName,data){return true}function triggerGlobal(settings,context,eventName,data){if(settings.global)return triggerAndReturn(context||document,eventName,data)}ajax.active=0;function ajaxStart(settings){if(settings.global&&ajax.active++===0)triggerGlobal(settings,null,"ajaxStart")}function ajaxStop(settings){if(settings.global&&!--ajax.active)triggerGlobal(settings,null,"ajaxStop")}function ajaxBeforeSend(xhr,settings){var context=settings.context;if(settings.beforeSend.call(context,xhr,settings)===false||triggerGlobal(settings,context,"ajaxBeforeSend",[xhr,settings])===false)return false;triggerGlobal(settings,context,"ajaxSend",[xhr,settings])}function ajaxSuccess(data,xhr,settings){var context=settings.context,status="success";settings.success.call(context,data,status,xhr);triggerGlobal(settings,context,"ajaxSuccess",[xhr,settings,data]);ajaxComplete(status,xhr,settings)}function ajaxError(error,type,xhr,settings){var context=settings.context;settings.error.call(context,xhr,type,error);triggerGlobal(settings,context,"ajaxError",[xhr,settings,error]);ajaxComplete(type,xhr,settings)}function ajaxComplete(status,xhr,settings){var context=settings.context;settings.complete.call(context,xhr,status);triggerGlobal(settings,context,"ajaxComplete",[xhr,settings]);ajaxStop(settings)}function empty(){}ajax.JSONP=function(options){if(!("type"in options))return ajax(options);var callbackName="jsonp"+ ++jsonpID,script=document.createElement("script"),abort=function(){if(callbackName in window)window[callbackName]=empty;ajaxComplete("abort",xhr,options)},xhr={abort:abort},abortTimeout,head=document.getElementsByTagName("head")[0]||document.documentElement;if(options.error)script.onerror=function(){xhr.abort();options.error()};window[callbackName]=function(data){clearTimeout(abortTimeout);delete window[callbackName];ajaxSuccess(data,xhr,options)};serializeData(options);script.src=options.url.replace(/=\?/,"="+callbackName);head.insertBefore(script,head.firstChild);if(options.timeout>0)abortTimeout=setTimeout(function(){xhr.abort();ajaxComplete("timeout",xhr,options)},options.timeout);return xhr};ajax.settings={type:"GET",beforeSend:empty,success:empty,error:empty,complete:empty,context:null,global:true,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript",json:jsonType,xml:"application/xml, text/xml",html:htmlType,text:"text/plain"},crossDomain:false,timeout:0};function mimeToDataType(mime){return mime&&(mime==htmlType?"html":mime==jsonType?"json":scriptTypeRE.test(mime)?"script":xmlTypeRE.test(mime)&&"xml")||"text"}function appendQuery(url,query){return(url+"&"+query).replace(/[&?]{1,2}/,"?")}function serializeData(options){if(type(options.data)==="object")options.data=param(options.data);if(options.data&&(!options.type||options.type.toUpperCase()=="GET"))options.url=appendQuery(options.url,options.data)}ajax.get=function(url,success){return ajax({url:url,success:success})};ajax.post=function(url,data,success,dataType){if(type(data)==="function")dataType=dataType||success,success=data,data=null;return ajax({type:"POST",url:url,data:data,success:success,dataType:dataType})};ajax.getJSON=function(url,success){return ajax({url:url,success:success,dataType:"json"})};var escape=encodeURIComponent;function serialize(params,obj,traditional,scope){var array=type(obj)==="array";for(var key in obj){var value=obj[key];if(scope)key=traditional?scope:scope+"["+(array?"":key)+"]";if(!scope&&array)params.add(value.name,value.value);else if(traditional?type(value)==="array":type(value)==="object")serialize(params,value,traditional,key);else params.add(key,value)}}function param(obj,traditional){var params=[];params.add=function(k,v){this.push(escape(k)+"="+escape(v))};serialize(params,obj,traditional);return params.join("&").replace("%20","+")}function extend(target){var slice=Array.prototype.slice;slice.call(arguments,1).forEach(function(source){for(key in source)if(source[key]!==undefined)target[key]=source[key]});return target}},{"type-of":2}],2:[function(require,module,exports){var toString=Object.prototype.toString;module.exports=function(val){switch(toString.call(val)){case"[object Function]":return"function";case"[object Date]":return"date";case"[object RegExp]":return"regexp";case"[object Arguments]":return"arguments";case"[object Array]":return"array";case"[object String]":return"string"}if(val===null)return"null";if(val===undefined)return"undefined";if(val&&val.nodeType===1)return"element";if(val===Object(val))return"object";return typeof val}},{}]},{},[1]);


/**
 * Aja.js
 * Ajax without XML : Asynchronous Javascript and JavaScript/JSON(P)
 *
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 * @license MIT
 */
(function(){
    'use strict';

    /**
     * supported request types.
     * TODO support new types : 'style', 'file'?
     */
    var types = ['html', 'json', 'jsonp', 'script'];

    /**
     * supported http methods
     */
    var methods = [
        'connect',
        'delete',
        'get',
        'head',
        'options',
        'patch',
        'post',
        'put',
        'trace'
    ];

    /**
     * API entry point.
     * It creates an new {@link Aja} object.
     *
     * @example aja().url('page.html').into('#selector').go();
     *
     * @exports aja
     * @namespace aja
     * @returns {Aja} the {@link Aja} object ready to create your request.
     */
    var aja = function aja(){

        //contains all the values from the setter for this context.
        var data = {};

        //contains the bound events.
        var events = {};

        /**
         * The Aja object is your context, it provides your getter/setter
         * as well as methods the fluent way.
         * @typedef {Object} Aja
         */

        /**
         * @type {Aja}
         * @lends aja
         */
        var Aja = {

            /**
             * URL getter/setter: where your request goes.
             * All URL formats are supported: <pre>[protocol:][//][user[:passwd]@][host.tld]/path[?query][#hash]</pre>.
             *
             * @example aja().url('bestlib?pattern=aja');
             *
             * @throws TypeError
             * @param {String} [url] - the url to set
             * @returns {Aja|String} chains or get the URL
             */
            url : function(url){
                return _chain.call(this, 'url', url, validators.string);
            },

            /**
             * Is the request synchronous (async by default) ?
             *
             * @example aja().sync(true);
             *
             * @param {Boolean|*} [sync] - true means sync (other types than booleans are casted)
             * @returns {Aja|Boolean} chains or get the sync value
             */
            sync : function(sync){
                return _chain.call(this, 'sync', sync, validators.bool);
            },

            /**
             * Should we force to disable browser caching (true by default) ?
             * By setting this to false, then a buster will be added to the requests.
             *
             * @example aja().cache(false);
             *
             * @param {Boolean|*} [cache] - false means no cache  (other types than booleans are casted)
             * @returns {Aja|Boolean} chains or get cache value
             */
            cache : function(cache){
                return _chain.call(this, 'cache', cache, validators.bool);
            },

            /**
             * Type getter/setter: one of the predefined request type.
             * The supported types are : <pre>['html', 'json', 'jsonp', 'script', 'style']</pre>.
             * If not set, the default type is deduced regarding the context, but goes to json otherwise.
             *
             * @example aja().type('json');
             *
             * @throws TypeError if an unknown type is set
             * @param {String} [type] - the type to set
             * @returns {Aja|String} chains or get the type
             */
            type : function(type){
                return _chain.call(this, 'type', type, validators.type);
            },

            /**
             * HTTP Request Header getter/setter.
             *
             * @example aja().header('Content-Type', 'application/json');
             *
             * @throws TypeError
             * @param {String} name - the name of the header to get/set
             * @param {String} [value] - the value of the header to set
             * @returns {Aja|String} chains or get the header from the given name
             */
            header : function(name, value){
                data.headers = data.headers || {};

                validators.string(name);
                if(typeof value !== 'undefined'){
                    validators.string(value);

                    data.headers[name] = value;

                    return this;
                }

                return data.headers[name];
            },

            /**
             * <strong>Setter only</strong> to add authentication credentials to the request.
             *
             * @throws TypeError
             * @param {String} user - the user name
             * @param {String} passwd - the password value
             * @returns {Aja} chains
             */
            auth : function(user, passwd){
                //setter only

                validators.string(user);
                validators.string(passwd);
                data.auth = {
                    user : user,
                    passwd : passwd
                };

                return this;
            },

            /**
             * Sets a timeout (expressed in ms) after which it will halt the request and the 'timeout' event will be fired.
             *
             * @example aja().timeout(1000); // Terminate the request and fire the 'timeout' event after 1s
             *
             * @throws TypeError
             * @param {Number} [ms] - timeout in ms to set. It has to be an integer > 0.
             * @returns {Aja|String} chains or get the params
             */
            timeout : function(ms){
                return _chain.call(this, 'timeout', ms, validators.positiveInteger);
            },

            /**
             * HTTP method getter/setter.
             *
             * @example aja().method('post');
             *
             * @throws TypeError if an unknown method is set
             * @param {String} [method] - the method to set
             * @returns {Aja|String} chains or get the method
             */
            method : function(method){
                return _chain.call(this, 'method', method, validators.method);
            },

            /**
             * URL's queryString getter/setter. The parameters are ALWAYS appended to the URL.
             *
             * @example aja().queryString({ user : '12' }); //  ?user=12
             *
             * @throws TypeError
             * @param {Object|String} [params] - key/values POJO or URL queryString directly to set
             * @returns {Aja|String} chains or get the params
             */
            queryString : function(params){
                return _chain.call(this, 'queryString', params, validators.queryString);
            },

            /**
             * URL's queryString getter/setter.
             * Regarding the HTTP method the data goes to the queryString or the body.
             *
             * @example aja().data({ user : '12' });
             *
             * @throws TypeError
             * @param {Object} [params] - key/values POJO to set
             * @returns {Aja|String} chains or get the params
             */
            data : function(params){
                return _chain.call(this, 'data', params, validators.plainObject);
            },

            /**
             * Request Body getter/setter.
             * Objects and arrays are stringified (except FormData instances)
             *
             * @example aja().body(new FormData());
             *
             * @throws TypeError
             * @param {String|Object|Array|Boolean|Number|FormData} [content] - the content value to set
             * @returns {Aja|String|FormData} chains or get the body content
             */
            body : function(content){
                return _chain.call(this, 'body', content, null, function(content){
                    if(typeof content === 'object'){
                        //support FormData to be sent direclty
                        if( !(content instanceof FormData)){
                            //otherwise encode the object/array to a string
                            try {
                                content = JSON.stringify(content);
                            } catch(e){
                                throw new TypeError('Unable to stringify body\'s content : ' + e.name);
                            }
                            this.header('Content-Type', 'application/json');
                        }
                    } else {
                        content = content + ''; //cast
                    }
                    return content;
                });
            },

            /**
             * Into selector getter/setter. When you want an Element to contain the response.
             *
             * @example aja().into('div > .container');
             *
             * @throws TypeError
             * @param {String|HTMLElement} [selector] - the dom query selector or directly the Element
             * @returns {Aja|Array} chains or get the list of found elements
             */
            into : function(selector){
                return _chain.call(this, 'into', selector, validators.selector, function(selector){
                    if(typeof selector === 'string'){
                        return document.querySelectorAll(selector);
                    }
                    if(selector instanceof HTMLElement){
                        return [selector];
                    }
                });
            },

            /**
             * Padding name getter/setter, ie. the callback's PARAMETER name in your JSONP query.
             *
             * @example aja().jsonPaddingName('callback');
             *
             * @throws TypeError
             * @param {String} [paramName] - a valid parameter name
             * @returns {Aja|String} chains or get the parameter name
             */
            jsonPaddingName : function(paramName){
                return _chain.call(this, 'jsonPaddingName', paramName, validators.string);
            },

            /**
             * Padding value  getter/setter, ie. the callback's name in your JSONP query.
             *
             * @example aja().jsonPadding('someFunction');
             *
             * @throws TypeError
             * @param {String} [padding] - a valid function name
             * @returns {Aja|String} chains or get the padding name
             */
            jsonPadding : function(padding){
                return _chain.call(this, 'jsonPadding', padding, validators.func);
            },

            /**
             * Attach an handler to an event.
             * Calling `on` with the same eventName multiple times add callbacks: they
             * will all be executed.
             *
             * @example aja().on('success', function(res){ console.log('Cool', res);  });
             *
             * @param {String} name - the name of the event to listen
             * @param {Function} cb - the callback to run once the event is triggered
             * @returns {Aja} chains
             */
            on : function(name, cb){
                if(typeof cb === 'function'){
                    events[name] = events[name] || [];
                    events[name].push(cb);
                }
                return this;
            },

            /**
             * Remove ALL handlers for an event.
             *
             * @example aja().off('success');
             *
             * @param {String} name - the name of the event
             * @returns {Aja} chains
             */
            off : function(name){
                events[name] = [];
                return this;
            },

            /**
             * Trigger an event.
             * This method will be called hardly ever outside Aja itself,
             * but there is edge cases where it can be useful.
             *
             * @example aja().trigger('error', new Error('Emergency alert'));
             *
             * @param {String} name - the name of the event to trigger
             * @param {*} data - arguments given to the handlers
             * @returns {Aja} chains
             */
            trigger : function(name, data){
                var self = this;
                var eventCalls  = function eventCalls(name, data){
                    if(events[name] instanceof Array){
                        events[name].forEach(function(event){
                            event.call(self, data);
                        });
                    }
                };
                if(typeof name !== 'undefined'){
                    name = name + '';
                    var statusPattern = /^([0-9])([0-9x])([0-9x])$/i;
                    var triggerStatus = name.match(statusPattern);

                    //HTTP status pattern
                    if(triggerStatus && triggerStatus.length > 3){
                        Object.keys(events).forEach(function(eventName){
                            var listenerStatus = eventName.match(statusPattern);
                            if(listenerStatus && listenerStatus.length > 3 &&       //an listener on status
                                triggerStatus[1] === listenerStatus[1] &&           //hundreds match exactly
                                (listenerStatus[2] === 'x' ||  triggerStatus[2] === listenerStatus[2]) && //tens matches
                                (listenerStatus[3] === 'x' ||  triggerStatus[3] === listenerStatus[3])){ //ones matches

                                eventCalls(eventName, data);
                            }
                        });
                    //or exact matching
                    } else if(events[name]){
                        eventCalls(name, data);
                    }
                }
                return this;
            },

            /**
             * Trigger the call.
             * This is the end of your chain loop.
             *
             * @example aja()
             *           .url('data.json')
             *           .on('200', function(res){
             *               //Yeah !
             *            })
             *           .go();
             */
            go : function(){

                var type    = data.type || (data.into ? 'html' : 'json');
                var url     = _buildQuery();

                //delegates to ajaGo
                if(typeof ajaGo[type] === 'function'){
                    return ajaGo[type].call(this, url);
                }
            }
        };

        /**
         * Contains the different communication methods.
         * Used as provider by {@link Aja.go}
         *
         * @type {Object}
         * @private
         * @memberof aja
         */
        var ajaGo = {

            /**
             * XHR call to url to retrieve JSON
             * @param {String} url - the url
             */
            json : function(url){
                var self = this;

                ajaGo._xhr.call(this, url, function processRes(res){
                    if(res){
                        try {
                            res = JSON.parse(res);
                        } catch(e){
                            self.trigger('error', e);
                            return null;
                        }
                    }
                    return res;
                });
            },

            /**
             * XHR call to url to retrieve HTML and add it to a container if set.
             * @param {String} url - the url
             */
            html : function(url){
                ajaGo._xhr.call(this, url, function processRes(res){
                    if(data.into && data.into.length){
                        [].forEach.call(data.into, function(elt){
                            elt.innerHTML = res;
                        });
                    }
                    return res;
                });
            },

            /**
             * Create and send an XHR query.
             * @param {String} url - the url
             * @param {Function} processRes - to modify / process the response before sent to events.
             */
            _xhr : function(url, processRes){
                var self = this;

                //iterators
                var key, header;

                var method      = data.method || 'get';
                var async       = data.sync !== true;
                var request     = new XMLHttpRequest();
                var _data       = data.data;
                var body        = data.body;
                var contentType = this.header('Content-Type');
                var timeout     = data.timeout;
                var timeoutId;
                var isUrlEncoded;
                var openParams;

                //guess content type
                if(!contentType && _data && _dataInBody()){
                    this.header('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                    contentType = this.header('Content-Type');
                }

                //if data is used in body, it needs some modifications regarding the content type
                if(_data && _dataInBody()){
                    if(typeof body !== 'string'){
                        body = '';
                    }

                    if(contentType.indexOf('json') > -1){
                        try {
                            body = JSON.stringify(_data);
                        } catch(e){
                            throw new TypeError('Unable to stringify body\'s content : ' + e.name);
                        }
                    } else {
                        isUrlEncoded = contentType && contentType.indexOf('x-www-form-urlencoded') > 1;
                        for(key in _data){
                            if(isUrlEncoded){
                                body += encodeURIComponent(key) + '=' + encodeURIComponent(_data[key]) + '&';
                            } else {
                                body += key + '=' + _data[key] + '\n\r';
                            }
                        }
                    }
                }

                //open the XHR request
                openParams = [method, url, async];
                if(data.auth){
                    openParams.push(data.auth.user);
                    openParams.push(data.auth.passwd);
                }
                request.open.apply(request, openParams);

                //set the headers
                for(header in data.headers){
                    request.setRequestHeader(header, data.headers[header]);
                }

                //bind events
                request.onprogress = function(e){
                    if (e.lengthComputable) {
                        self.trigger('progress', e.loaded / e.total);
                    }
                };

                request.onload = function onRequestLoad(){
                    var response = request.responseText;

                    if (timeoutId) {
                        clearTimeout(timeoutId);
                    }
                    if(this.status >= 200 && this.status < 300){
                        if(typeof processRes === 'function'){
                            response = processRes(response);
                        }
                        self.trigger('success', response);
                    }

                    self.trigger(this.status, response);

                    self.trigger('end', response);
                };

                request.onerror = function onRequestError (err){
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                    }
                    self.trigger('error', err, arguments);
                };

                //sets the timeout
                if (timeout) {
                    timeoutId = setTimeout(function() {
                        self.trigger('timeout', {
                            type: 'timeout',
                            expiredAfter: timeout
                        }, request, arguments);
                        request.abort();
                    }, timeout);
                }

                //send the request
                request.send(body);
            },

            /**
             * @this {Aja} call bound to the Aja context
             * @param {String} url - the url
             */
            jsonp : function(url){
                var script;
                var self            = this;
                var head            = document.querySelector('head');
                var async           = data.sync !== true;
                var jsonPaddingName = data.jsonPaddingName || 'callback';
                var jsonPadding     = data.jsonPadding || ('_padd' + new Date().getTime() + Math.floor(Math.random() * 10000));
                var paddingQuery    = {};

                if(aja[jsonPadding]){
                    throw new Error('Padding ' + jsonPadding + '  already exists. It must be unique.');
                }
                if(!/^ajajsonp_/.test(jsonPadding)){
                    jsonPadding = 'ajajsonp_' + jsonPadding;
                }

                //window.ajajsonp = window.ajajsonp || {};
                window[jsonPadding] = function padding (response){
                    self.trigger('success', response);
                    head.removeChild(script);
                    window[jsonPadding] = undefined;
                };

                paddingQuery[jsonPaddingName] = jsonPadding;

                url =  appendQueryString(url, paddingQuery);

                script = document.createElement('script');
                script.async = async;
                script.src = url;
                script.onerror = function(){
                    self.trigger('error', arguments);
                    head.removeChild(script);
                    window[jsonPadding] = undefined;
                };
                head.appendChild(script);
            },

            /**
             * Loads a script.
             *
             * This kind of ugly script loading is sometimes used by 3rd part libraries to load
             * a configured script. For example, to embed google analytics or a twitter button.
             *
             * @this {Aja} call bound to the Aja context
             * @param {String} url - the url
             */
            script : function(url){

                var self    = this;
                var head    = document.querySelector('head') || document.querySelector('body');
                var async   = data.sync !== true;
                var script;

                if(!head){
                    throw new Error('Ok, wait a second, you want to load a script, but you don\'t have at least a head or body tag...');
                }

                script = document.createElement('script');
                script.async = async;
                script.src = url;
                script.onerror = function onScriptError(){
                    self.trigger('error', arguments);
                    head.removeChild(script);
                };
                script.onload = function onScriptLoad(){
                    self.trigger('success', arguments);
                };

                head.appendChild(script);
            }
        };

        /**
         * Helps you to chain getter/setters.
         * @private
         * @memberof aja
         * @this {Aja} bound to the current context
         * @param {String} name - the property name
         * @param {*} [value] - the property value if we are in a setter
         * @param {Function} [validator] - to validate/transform the value if needed
         * @param {Function} [update] - when there is more to do with the setter
         * @returns {Aja|*} either the current context (setter) or the requested value (getter)
         * @throws TypeError
         */
        var _chain = function _chain(name, value, validator, update){
            if(typeof value !== 'undefined'){
                if(typeof validator === 'function'){
                    try{
                        value = validator.call(validators, value);
                    } catch(e){
                        throw new TypeError('Failed to set ' + name + ' : ' + e.message);
                    }
                }
                if(typeof update === 'function'){
                    data[name] = update.call(this, value);
                } else {
                    data[name] = value;
                }
                return this;
            }
            return data[name] === 'undefined' ? null : data[name];
        };

        /**
         * Check whether the data must be set in the body instead of the queryString
         * @private
         * @memberof aja
         * @returns {Boolean} true id data goes to the body
         */
        var _dataInBody = function _dataInBody(){
            return ['delete', 'patch', 'post', 'put'].indexOf(data.method) > -1;
        };

        /**
         * Build the URL to run the request against.
         * @private
         * @memberof aja
         * @returns {String} the URL
         */
        var _buildQuery = function _buildQuery(){

            var url         = data.url;
            var cache       = typeof data.cache !== 'undefined' ? !!data.cache : true;
            var queryString = data.queryString || '';
            var _data       = data.data;

            //add a cache buster
            if(cache === false){
                queryString += '&ajabuster=' + new Date().getTime();
            }

            url = appendQueryString(url, queryString);

            if(_data && !_dataInBody()){
                url =  appendQueryString(url, _data);
            }
            return url;
        };

        //expose the Aja function
        return Aja;
    };

    /**
     * Validation/reparation rules for Aja's getter/setter.
     */
    var validators = {

        /**
         * cast to boolean
         * @param {*} value
         * @returns {Boolean} casted value
         */
        bool : function(value){
            return !!value;
        },

        /**
         * Check whether the given parameter is a string
         * @param {String} string
         * @returns {String} value
         * @throws {TypeError} for non strings
         */
        string : function(string){
            if(typeof string !== 'string'){
                throw new TypeError('a string is expected, but ' + string + ' [' + (typeof string) + '] given');
            }
            return string;
        },

        /**
         * Check whether the given parameter is a positive integer > 0
         * @param {Number} integer
         * @returns {Number} value
         * @throws {TypeError} for non strings
         */
        positiveInteger : function(integer){
            if(parseInt(integer) !== integer || integer <= 0){
                throw new TypeError('an integer is expected, but ' + integer + ' [' + (typeof integer) + '] given');
            }
            return integer;
        },

        /**
         * Check whether the given parameter is a plain object (array and functions aren't accepted)
         * @param {Object} object
         * @returns {Object} object
         * @throws {TypeError} for non object
         */
        plainObject : function(object){
            if(typeof object !== 'object' || object.constructor !== Object){
                throw new TypeError('an object is expected, but ' + object + '  [' + (typeof object) + '] given');
            }
            return object;
        },

        /**
         * Check whether the given parameter is a type supported by Aja.
         * The list of supported types is set above, in the {@link types} variable.
         * @param {String} type
         * @returns {String} type
         * @throws {TypeError} if the type isn't supported
         */
        type : function(type){
            type = this.string(type);
            if(types.indexOf(type.toLowerCase()) < 0){
                throw new TypeError('a type in [' + types.join(', ') + '] is expected, but ' + type + ' given');
            }
            return type.toLowerCase();
        },

        /**
         * Check whether the given HTTP method is supported.
         * The list of supported methods is set above, in the {@link methods} variable.
         * @param {String} method
         * @returns {String} method (but to lower case)
         * @throws {TypeError} if the method isn't supported
         */
        method : function(method){
            method = this.string(method);
            if(methods.indexOf(method.toLowerCase()) < 0){
                throw new TypeError('a method in [' + methods.join(', ') + '] is expected, but ' + method + ' given');
            }
            return method.toLowerCase();
        },

        /**
         * Check the queryString, and create an object if a string is given.
         *
         * @param {String|Object} params
         * @returns {Object} key/value based queryString
         * @throws {TypeError} if wrong params type or if the string isn't parseable
         */
        queryString : function(params){
            var object = {};
            if(typeof params === 'string'){

                params.replace('?', '').split('&').forEach(function(kv){
                    var pair = kv.split('=');
                    if(pair.length === 2){
                        object[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
                    }
                });
            } else {
                object = params;
            }
            return this.plainObject(object);
        },

        /**
         * Check if the parameter enables us to select a DOM Element.
         *
         * @param {String|HTMLElement} selector - CSS selector or the element ref
         * @returns {String|HTMLElement} same as input if valid
         * @throws {TypeError} check it's a string or an HTMLElement
         */
        selector : function(selector){
            if(typeof selector !== 'string' && !(selector instanceof HTMLElement)){
                throw new TypeError('a selector or an HTMLElement is expected, ' + selector + ' [' + (typeof selector) + '] given');
            }
            return selector;
        },

        /**
         * Check if the parameter is a valid JavaScript function name.
         *
         * @param {String} functionName
         * @returns {String} same as input if valid
         * @throws {TypeError} check it's a string and a valid name against the pattern inside.
         */
        func : function(functionName){
            functionName = this.string(functionName);
            if(!/^([a-zA-Z_])([a-zA-Z0-9_\-])+$/.test(functionName)){
                throw new TypeError('a valid function name is expected, ' + functionName + ' [' + (typeof functionName) + '] given');
            }
            return functionName;
        }
    };

    /**
     * Query string helper : append some parameters
     * @private
     * @param {String} url - the URL to append the parameters
     * @param {Object} params - key/value
     * @returns {String} the new URL
     */
    var appendQueryString = function appendQueryString(url, params){
        var key;
        url = url || '';
        if(params){
            if(url.indexOf('?') === -1){
                url += '?';
            }
            if(typeof params === 'string'){
                url += params;
            } else if (typeof params === 'object'){
                for(key in params){
                    if(!/[?&]$/.test(url)){
                        url += '&';
                    }
                    url += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
                }
            }
        }

        return url;
    };

    //AMD, CommonJs, then globals
    if (typeof window.define === 'function' && window.define.amd) {
        window.define([], function(){
            return aja;
        });
    } else if (typeof exports === 'object') {
        module.exports = aja;
    } else {
        window.aja = window.aja || aja;
    }

}());