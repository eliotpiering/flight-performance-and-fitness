if(!window.hcLoadScript) {
  window.hcLoadScript = function(url, callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    if(script.addEventListener) {
      script.addEventListener('load', callback, false);
    }
    else if(script.readyState) {
      script.onreadystatechange = callback;
    }
    head.appendChild(script);
  };
}

if(!window.HealcodeWidget) {
  window.HealcodeWidget = function(widgetProperties) {
    this.type = widgetProperties.type;
    this.name = widgetProperties.name;
    this.id = widgetProperties.id;
    this.optionsQuery = widgetProperties.options_query;
    this.deployURL = widgetProperties.deploy_url;
    this.containerID = widgetProperties.container_id;
  };
}

if(!window.hcWidgetCollection) {
  window.hcWidgetCollection = [];
}

// polyfill for Array.prototype.every() method (for IE8)
if (!Array.prototype.every)
{
  Array.prototype.every = function(fun /*, thisArg */)
  {
    'use strict';

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function')
        throw new TypeError();

    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++)
    {
      if (i in t && !fun.call(thisArg, t[i], i, t))
        return false;
    }

    return true;
  };
}

// polyfill for Array.prototype.map() method (for IE8)
if (!Array.prototype.map)
{
  Array.prototype.map = function(fun /*, thisArg */)
  {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
      throw new TypeError();

    var res = new Array(len);
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++)
    {
      // NOTE: Absolute correctness would demand Object.defineProperty
      //       be used.  But this method is fairly new, and failure is
      //       possible only if Object.prototype or Array.prototype
      //       has a property |i| (very unlikely), so use a less-correct
      //       but more portable alternative.
      if (i in t)
        res[i] = fun.call(thisArg, t[i], i, t);
    }

    return res;
  };
}

// polyfill for Array.prototype.forEach() method (for IE8)
if (!Array.prototype.forEach)
{
  Array.prototype.forEach = function(fun /*, thisArg */)
  {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
      throw new TypeError();

    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++)
    {
      if (i in t)
        fun.call(thisArg, t[i], i, t);
    }
  };
}

window.hcMobileCheck = function() {
  var windowWidth = (screen.width <= screen.height ? screen.width : screen.height);
  return windowWidth <= 460;
}

if(!window.healcodeInitialize) {
  window.healcodeInitialize = function(widgets) {
    var oldWidgetDeployments = widgets;

    function hcWidgetJsLoad() {

      var mobileFlag = window.hcMobileCheck();
      if(typeof mobileFlag !== 'boolean') mobileFlag = false;

      var customElementWidgets = document.querySelectorAll('healcode-widget');
      var customElementWidgetTypes = [];
      for (var i=0; i<customElementWidgets.length; i++) {
        customElementWidgetTypes.push(customElementWidgets[i].getAttribute('data-type'));
      }
      var totalWidgetCount = oldWidgetDeployments.length + customElementWidgets.length;

      function addCustomElementWidget(widgetElement) {
        customElementWidgets = document.querySelectorAll('healcode-widget');
        customElementWidgetTypes.push(widgetElement.getAttribute('data-type'));
        totalWidgetCount = oldWidgetDeployments.length + customElementWidgets.length;
      }

      function containsWidget(widgetType) {
        var oldDeploymentCheck = !oldWidgetDeployments.every(function(widget, index, array) {
          return(widget.name !== widgetType);
        });
        var customElementCheck = !customElementWidgetTypes.every(function(customElementType, index, array) {
          return(customElementType !== widgetType);
        });
        return (oldDeploymentCheck || customElementCheck);
      }

      function getDeployURL(referenceFrame) {
        if(!/^(www\.|widgets\.|manager\.)?healcode/i.test(referenceFrame.location.host) && /^https?:/i.test(referenceFrame.location.protocol)) {
          return referenceFrame.location.protocol + '//' + referenceFrame.location.host + referenceFrame.location.pathname;
        } else {
          return null;
        }
      }

      function storeDeployURL(widget) {
        var currentDeployURL = widget.deployURL || getDeployURL(window);
        if(!currentDeployURL || !hcjq) return null;
        hcjq.ajax({
          url: 'https://widgets.healcode.com/widgets/widget/' + widget.id + '/store_deploy_url.json',
          data: { deploy_url: currentDeployURL, widget_type: widget.name },
          dataType: 'jsonp'
        });
      }

      function finishedPostWidgetScripts() {
        if(widgetCheck.healcodeLink()) {
          storeLinkDeployURL();
        }
      }

      function storeLinkDeployURL() {
        var deployURL = getDeployURL(window);
        if(!deployURL || !hcjq) return null;

        var linkTypesBySiteId = {};
        hcjq("healcode-widget[data-type$='-link']").each(function (index, element) {
          var siteId = hcjq(this).attr("data-site-id");
          var linkType = this.linkType();
          if (siteId !== undefined && siteId !== "") {
            if(linkTypesBySiteId[siteId] === undefined) {
              linkTypesBySiteId[siteId] = {'url': deployURL, 'link_types': []};
            }
            if(hcjq.inArray(linkType, linkTypesBySiteId[siteId]['link_types']) === -1) {
              linkTypesBySiteId[siteId]['link_types'].push(linkType);
            }
          }
        });

        hcjq.ajax({
          url: 'https://widgets.healcode.com/link_deploys/store.json',
          data: {"link_deploys": linkTypesBySiteId},
          dataType: "jsonp"
        });
      };


      var widgetCheck = {
        schedule:     function() { return containsWidget('schedules'); },
        appointment:  function() { return containsWidget('appointments'); },
        enrollment:   function() { return containsWidget('enrollments'); },
        registration: function() { return containsWidget('registrations'); },
        prospect:     function() { return containsWidget('prospects'); },
        classList:    function() { return containsWidget('class_lists'); },
        staffList:    function() { return containsWidget('staff_lists'); },
        healcodeLink: function() { return containsWidget('account-link') || containsWidget('cart-link') || containsWidget('pricing-link') || containsWidget("contract-link"); }
      };

      var widgetRenderURLs = oldWidgetDeployments.map(function(widget, index, array) {
        var widgetMobileFlag = (widget.optionsQuery ? "&mobile=" + mobileFlag : "?mobile=" + mobileFlag);
        return 'https://widgets.healcode.com/widgets/' + widget.name + '/' + widget.id + '.js' + widget.optionsQuery + widgetMobileFlag;
      });

      function preWidgetScripts() {
        return [{
          test: window.hcjq && window.hcjq.ui && window.hcjq.rails,
          nope: ['https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js', 'https://assets.healcode.com/assets/jquery-ui.widget-396bc6c8cc9d453826cb92486c1bd89b30bc0b10d7eeff3fefbcd2ebccafe857.js', 'https://assets.healcode.com/assets/jquery_ujs-95e05b917009519148c662c7fb1d60ad2437530ec915c2189ed2ab13275307c8.js', 'https://assets.healcode.com/assets/widgets/jquery-ui/jquery-ui.widget-bec6f698c363f9b82a2727c2d4de6f80cfb2eedf4519f450b9cb3bef9791e6cd.css', 'https://assets.healcode.com/assets/hcjq-3048c2ae28d04f1d340fc1b26b53a810d585b42adf06aa441935884b32e085b9.js']
        }, {
          test: !window.hcSessionFilter && (widgetCheck.schedule() || widgetCheck.enrollment()),
          yep: ['https://assets.healcode.com/assets/filter_sessions-87c8670184f0545fb01e9968a91b1e88526f81e902806a36b5a33ed246d9fe20.js','https://assets.healcode.com/assets/jquery-ui-datepicker-localization-9a5cb64022f344501b9d003093b0409dc66baaa82a7d5ccc7b3e5167771b49f4.js']
        }, {
          test: !window.hcPignoseCalendar && (widgetCheck.enrollment() || widgetCheck.schedule()),
          yep: ['https://assets.healcode.com/assets/moment.min.hcjq-8eca1de5c1b781dc2ab2dff957e1294c7d67d62506c3e785ffccea1e4b825421.js', 'https://assets.healcode.com/assets/pignose.calendar.hcjq-43c2bfcd8e5496d2de9fbd0a8fed939fb275e03d5f298803f20c35154812695a.js', 'https://assets.healcode.com/assets/widgets/pignose.calendar.hcjq-a8a9160b4852572f4f8e5f65a90dd25f2f8d12fa2f4004ef136e032fd501974e.css']
        }, {
          test: !window.bwScheduleVersion1 && widgetCheck.schedule(),
          yep: ['https://assets.healcode.com/assets/widgets/schedule/version_1-654cac1487a2d0825ad27743b15c32ec36795a381525e688d0fa5a6412f7c28e.js', 'https://assets.healcode.com/assets/widgets/schedule/load_markup-bcb8e65444ee953642341943a868601f1ba3aa7ebb947f7a47ef23020e66ee90.js', 'https://assets.healcode.com/assets/widgets/schedule/version_1-0a715a2f1c0770298dac8ec253c9b844f2cd25d5c66a507ed1b58afac7ff7661.css', 'https://assets.healcode.com/assets/widgets/schedule/filter-b4171d7141957236f4d196914863fc8075892cae0e59d3cec109839070e8986d.js']
        }, {
          test: !window.bwFilterSessions && widgetCheck.schedule(),
          yep: 'https://assets.healcode.com/assets/widgets/schedule/filter_sessions_version_1-19ed57aa4687ed4550596ba8d33bd2cbca14bbb99ee29d82cacf3632a086ce2e.js'
        }, {
          test: !window.hcParsley && (widgetCheck.prospect() || widgetCheck.registration() || widgetCheck.appointment()),
          yep: ['https://assets.healcode.com/assets/parsley/i18n.hcjq-814bd775db5b3a5566bc728af86acad76a25b8a8079463a0ab8ab1df85aacce9.js', 'https://assets.healcode.com/assets/parsley.min.hcjq-84a63acce005b9f38a3d2bda4819e4159fbcd6534402b51ad6c417a83aed66b8.js', 'https://assets.healcode.com/assets/parsley-52628b24cd428908e87c2a5948c5ad9a848396bd34523e0c7ab427271977b631.css']
        }, {
          test: !(window.hcjq && window.hcjq.fn.placeholder) && (widgetCheck.prospect() || widgetCheck.registration()),
          yep: 'https://assets.healcode.com/assets/jquery.placeholder.min-1e835147030755a5857e33d9474232688290fe721de73798ac0262a4f870961f.js'
        }, {
          test: !window.hcAmplitude,
          yep: ['https://assets.healcode.com/assets/ampl_init-7ca5c492ce40d1174c39c2ca6cd4c9e14658b7568565c2bd1caa28f8854e008c.js', 'https://assets.healcode.com/assets/ampl_events-6f2af5a2b70e8838c91b6d8b5429a3c4b4971cfe1ffb0b38343927707ccbe885.js']
        }, {
          test: !window.hcStateSelect && widgetCheck.registration(),
          yep: 'https://assets.healcode.com/assets/state_select_new-8eafe1049f97b757387ecbda7d70614909bb5b582e6aa1087cf04975693bc9b9.js'
        }, {
          test: !window.hcAppointmentFilterSessions && widgetCheck.appointment(),
          yep: 'https://assets.healcode.com/assets/filter_appt_sessions-9a71f3700c2877925f91af6ce17c2b19e12d455b0f95e3f9f3545822a393b095.js'
        }, {
          test: !window.hcScheduleWidget && widgetCheck.schedule(),
          yep: 'https://assets.healcode.com/assets/schedule-dc49f0cfd34f6655a079e29fb4c25e842d29c05ea50160730d0806f805e61fb4.js'
        }, {
          test: !window.hcEnrollmentWidget && widgetCheck.enrollment(),
          yep: 'https://assets.healcode.com/assets/enrollment-5f0c63dd285e87326ee0cd26657628d6f376e38d3b2d3931a71949e36f68103d.js'
        }, {
          test: !window.hcClassStaffListWidget && (widgetCheck.staffList() || widgetCheck.classList()),
          yep: 'https://assets.healcode.com/assets/staff_class_lists-e1a22f938dab8bfcd8d0e39b75f5ac1da4b2bfc06b8674837bb34521fc5b8cd0.js',
        }, {
          test: !window.hcAppointmentWidget && widgetCheck.appointment(),
          yep: ['https://assets.healcode.com/assets/appointment-fe4bfbc1e7f60a0491bbf1f47ca0701a8dcd8da6f411491b5af0f9c7c675cbf2.js', 'https://assets.healcode.com/assets/jquery-ui-datepicker-localization-9a5cb64022f344501b9d003093b0409dc66baaa82a7d5ccc7b3e5167771b49f4.js', 'https://assets.healcode.com/assets/jquery.weekpicker-a6fa0ba4bf168e6a4c8121064de12d9fc7d5be7df95c831ad621e0d986b2495a.js'],
          callback: function(url, result, key) {
            window.hcAppointmentWidget = true;
          }
        }, {
          test: !window.hcRegistrationWidget && widgetCheck.registration(),
          yep: ['https://assets.healcode.com/assets/registration-938ae656e41f331151c646400a027d52dcdcbbb269b03fae2a9ee4ef10f035a5.js'],
          callback: function(url, result, key) {
            window.hcRegistrationWidget = true;
          }
        }, {
          test: !window.hcProspectWidget && widgetCheck.prospect(),
          yep: ['https://assets.healcode.com/assets/prospect-fe45786e8e19ce8d91987817fceeb137eddd8c666c2be2af928643d1a83e0302.js'],
          callback: function(url, result, key) {
            window.hcProspectWidget = true;
          }
        }, {
          test: !window.hcWidgetJs && (widgetCheck.schedule() || widgetCheck.appointment() || widgetCheck.enrollment() || widgetCheck.classList() || widgetCheck.staffList() || widgetCheck.healcodeLink()),
          yep: 'https://assets.healcode.com/assets/widget-acfe1dbd194404735144e061dba402549d2e2334fbd6cfb4a936a9b3ce94bc3e.js',
          callback: function(url, result, key) {
            window.hcWidgetJs = true;
          }
        }];
      }

      function postWidgetScripts() {
        return [{
          test: !window.hcCSSModal && (widgetCheck.schedule() || widgetCheck.appointment() || widgetCheck.enrollment() || widgetCheck.classList() || widgetCheck.staffList() || widgetCheck.healcodeLink()),
          yep: ['https://assets.healcode.com/assets/modal-387d7dcf99e9408bea7d6965f7d88318f71eb40a1788f89558b6bed7e8bd4f61.js', 'https://assets.healcode.com/assets/modal-d58b5eeccf0075cb2dc65fe37e664053073564e57d952dfeec544a1e5d0d51a8.css'],
          callback: function(url, result, key) {
            if(!window.postWidgetScripts) {
              finishedPostWidgetScripts();
              window.postWidgetScripts = true;
            }
          }
        }];
      }

      function registerHealcodeWidgetCustomElement($, domain, loadCounter) {

        var validWidgetTypes = ['schedules', 'enrollments', 'staff_lists', 'class_lists', 'prospects', 'registrations', 'appointments'];


          var $loadingText = $('<div class="hc-ajax-loading-text"><img alt="loading" src="https://assets.healcode.com/assets/icons/ajax-loader-c1cf81bef2ea82eaa43265a5ff786b7cd74e7d5f4f2de104b586f092ca0fb886.gif" /></div>');
        $loadingText.css({
          fontSize: '3em',
          margin: '10% 0',
          padding: '25px',
          textAlign: 'center',
          borderRadius: '4px'
        });

        function loadingErrorMarkup() {
          var errorMessage = arguments[0] || 'Unable to load.<br>Please try again later.';

          var $errorMarkup = $('<div></div>')
            .addClass('hc-ajax-loading-text')
            .css({
              width: '12em',
              fontSize: '1em',
              margin: '1em 40%',
              padding: '1em',
              textAlign: 'center',
              border: 'solid black 1px'
            });

          var $refreshLink;

          if (!/widget has been deactivated/i.test(errorMessage)) {
            $refreshLink = $('<a href=""></a>')
              .text('Reload')
              .css({
                border: 'solid black 1px',
                fontSize: '0.8em',
                textAlign: 'center',
                verticalAlign: 'middle',
                display: 'inline-block',
                textDecoration: 'none',
                textTransform: 'uppercase',
                margin: '1em 0 0 0',
                padding: '0.2em 0.5em',
                lineHeight: '1.5',
                '-webkit-border-radius': '0.25em',
                '-moz-border-radius': '0.25em',
                '-o-border-radius': '0.25em',
                borderRadius: '0.25em'
              })
              .on({
                click: function(e) {
                  e.preventDefault();
                  e.stopPropagation();
                  $(this).closest('healcode-widget')[0].getAndInjectWidgetContent();
                }
              });
          }

          $errorMarkup.append('<div>' + errorMessage + '</div>', $refreshLink);

          return $errorMarkup;
        }

        function createLink(widgetElement, linkType, linkLoadCounter) {
          var linkClass = widgetElement.getAttribute('data-link-class');
          linkClass = (linkClass ? linkClass : '');
          if (linkType === 'contract') {
            var siteID = widgetElement.getAttribute('data-mb-site-id');
            var linkTitle = linkType;
            var contractID = widgetElement.getAttribute('data-contract-id');
            var linkDataURL = 'https://clients.mindbodyonline.com/classic/ws?studioid=' + siteID + '&stype=40&prodid=' + contractID;
            var linkInnerHTML = widgetElement.getAttribute('data-inner-html').replace(/"/g, "'");
            var serviceLink = '<a href="' + linkDataURL + '" class="' + linkClass + '" title="' + linkTitle + '" target="_blank" rel="noopener noreferrer">' + linkInnerHTML + '</a>';
            $(widgetElement).html(serviceLink).promise().done(function() {
              linkLoadCounter.increment();
            });
          } else {
            var siteID = widgetElement.getAttribute('data-site-id');
            var siteMBOID = widgetElement.getAttribute('data-mb-site-id');
            var linkTypeName = widgetElement.getAttribute('data-type');
            var linkTitle = linkType;
            var linkDataURL = domain + '/sites/' + siteID + '/';
            linkDataURL += (linkType === 'account' ? 'client' : 'cart');
            if(linkType === 'pricing') {
              var serviceID = widgetElement.getAttribute('data-service-id');
              linkTitle = serviceID;
              linkDataURL += '/add_service?mbo_item_id=' + serviceID;
            }
            var linkInnerHTML = widgetElement.getAttribute('data-inner-html').replace(/"/g, "'");
            var serviceLink = '<a href="" class="healcode-link ' + linkClass + '" data-url="' + linkDataURL + '" data-widget-name="' + linkTypeName + '" data-mbo-site-id="' + siteMBOID + '" rev="iframe" title="' + linkTitle + '" data-hc-open-modal="modal-iframe">' + linkInnerHTML + '</a>';
            $(widgetElement).html(serviceLink).promise().done(function() {
              linkLoadCounter.increment();
            });
          }
        }

        function createWidget(widgetElement, widgetLoadCounter) {
          var mobileFlag = window.hcMobileCheck();
          if(typeof mobileFlag !== 'boolean') mobileFlag = false;
          var widgetType = $(widgetElement).data('type');
          $.ajax({
            url: widgetElement.requestURL(),
            dataType: 'jsonp',
            data: { mobile: mobileFlag },
            beforeSend: function() {
              $(widgetElement).html($loadingText);
            }
          }).done(function(data) {
            if(data.errors) {
              var errors = data.errors;
              console.log('AJAX request failed - ' + errors.join(', '));
              $(widgetElement).html(loadingErrorMarkup(errors.join('<br>')));
            } else {
              $(widgetElement).html(data.contents).promise().done(function() {
                widgetLoadCounter.increment();
                var widgetID = $(widgetElement).data('widget-id');
                $.event.trigger('widget:loaded', [widgetID, widgetType]);
              });
            }
          }).fail(function(jqXHR, textStatus) {
            console.log('AJAX request failed - ' + textStatus);
            $(widgetElement).html(loadingErrorMarkup());
          });
        }

        function updateLinkInnerHTML(widgetElement, newText) {
          var formattedText = newText.replace(/"/g, "'");
          $('a', widgetElement).html(formattedText);
        }

        function updateLinkClass(widgetElement, newClass) {
          var formattedClass = newClass.replace(/"/g, "'");
          $('a', widgetElement).attr('class', newClass);
        }

        var healcodeWidget = Object.create(HTMLElement.prototype);

        healcodeWidget.createdCallback = function() {
          if(!this.isLink()) {
            if(validWidgetTypes.lastIndexOf(this.type()) === -1) {
              console.log('Invalid widget type - ' + this.type());
              return null
            }
            storeDeployURL(this.convertToHealcodeWidgetObject());
          }
          if(window.hcInitialized) {
            addCustomElementWidget(this);
            window.hcYepnope(preWidgetScripts().concat({
              test: true,
              complete: this.getAndInjectWidgetContent.bind(this)
            }).concat(postWidgetScripts()));
          } else {
            this.getAndInjectWidgetContent();
          }
        };

        healcodeWidget.attachedCallback = function() {
          if(!this.isLink()) window.hcWidgetCollection.push(this.convertToHealcodeWidgetObject());
        };

        healcodeWidget.attributeChangedCallback = function(attrName, oldVal, newVal) {
          if(this.isLink()) {
            if(attrName === 'data-inner-html') {
              updateLinkInnerHTML(this, newVal);
            } else if(attrName === 'data-link-class') {
              updateLinkClass(this, newVal);
            }
          }
        };

        healcodeWidget.getAndInjectWidgetContent = function() {
          if(this.isLink()) {
            createLink(this, this.linkType(), loadCounter);
          } else {
            createWidget(this, loadCounter);
          }
        };

        healcodeWidget.convertToHealcodeWidgetObject = function() {
          return new HealcodeWidget({
            type: this.partner(),
            name: this.type(),
            id: this.widgetId()
          });
        };

        healcodeWidget.type = function() { return this.getAttribute('data-type'); };
        healcodeWidget.isLink = function() { return this.type().match(/(.*)-link$/i); };
        healcodeWidget.linkType = function() {
          var isLink = this.isLink();
          if(isLink) {
            return isLink[1];
          } else {
            return null;
          }
        };
        healcodeWidget.partner = function() { return this.getAttribute('data-widget-partner'); };
        healcodeWidget.widgetId = function() { return this.getAttribute('data-widget-id'); };
        healcodeWidget.requestURL = function() {
          return domain + '/widgets/' + this.type() + '/' + this.widgetId() + '.json';
        };

        document.registerElement('healcode-widget', { prototype: healcodeWidget });
      }

      function documentReadyWidgetLoad() {
        if(!window.healcodePreview) oldWidgetDeployments.forEach(storeDeployURL);

        var widgetLoadCounter = {
          count: 0,
          increment: function() {
            this.count = this.count + 1;
            return this.count;
          },
          decrement: function() {
            this.count = this.count - 1;
            return this.count;
          }
        };

        registerHealcodeWidgetCustomElement(hcjq, 'https://widgets.healcode.com', widgetLoadCounter);

        widgetRenderURLs.forEach(function(renderURL, index, array) {
          window.hcYepnope.injectJs(renderURL, function() {
            widgetLoadCounter.increment();
          });
        });

        var delayScriptLoading = function(){
          if(widgetLoadCounter.count >= totalWidgetCount) {
            window.hcInitialized = true;
            window.hcYepnope(postWidgetScripts());
            return null;
          } else {
            setTimeout(delayScriptLoading, 100);
          }
        };

        delayScriptLoading();
      }

      window.hcYepnope(preWidgetScripts().concat({
        load: 'https://assets.healcode.com/assets/application-17a0442cc7b33f9979fa9abbd1a0c534164833b596a82cec724d1793d668eeca.js',
        complete: documentReadyWidgetLoad
      }));
    }

    window.hcLoadScript('https://assets.healcode.com/assets/x-tag-components-7eabff25536a3b3f89f97b68df54a72673ca74cebb915fb4af19255dc5e88616.js', function() {});

    if(window.hcYepnope) {
      hcWidgetJsLoad();
    } else {
      window.hcLoadScript('https://assets.healcode.com/assets/healcode.yepnope-23af02e66170f2455f54b54cf8bbb19d15a2446cd81dfcbb9c4390c5a0ef4a4a.js', hcWidgetJsLoad);
    }
  };

  var hcOnDocumentReady = function(f){/in/.test(document.readyState)?setTimeout('hcOnDocumentReady('+f+')',9):f()};

  hcOnDocumentReady(function() {
    window.healcodeInitialize(window.hcWidgetCollection); // on DOM ready, fire off initializer
  });
}
