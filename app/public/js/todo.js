var detail = {};
$(document).ready(function() {

    $.ajax({
        type: "GET",
        // data:list_detail,
        // dataType: "json",
        //headers:{"Content-Type":"application/json"},
        url: "http://localhost:8081/checksession",
        success: function(data) {
            //  alert(data);
            //  console.log(data.session);
            if (data.session === false) {
                console.log("no user");
                //  window.location.hash = "#home";
                indexPage();
            } else {
                homePage();
            }
        }
    });

    $(document).on("click", "#logout", (function() {
        $.ajax({
            type: "GET",
            // data:list_detail,
            // dataType: "json",
            //headers:{"Content-Type":"application/json"},
            url: "http://localhost:8081/logout",
            success: function(data) {
                //  alert(data);
                if (data.session == false) {
                    window.location.hash = "#login";
                    location.reload();
                }
                // callPage();
            }
        });
        // window.location.origin = window.location.protocol + "//" + window.location.host;
        return;
    }));

    $(document).on("submit", "#signupForm", (function(event) {
        var user_name = $("#user_name").val();
        var email = $("#email").val();
        var gender = $("input:radio:checked").val();
        var phone_no = $("#pno").val();
        var pass = $("#pwd").val();
        var rpass = $("#rpwd").val();
        if(!checkEmail(email)){
          $("span").remove();
          $("#error").append('<span id="errorMessage">&nbsp&nbsp&nbspInvalid Email</span>');
          return;
        }else if (!checkPhoneNo(phone_no)) {
          $("span").remove();
          $("#error").append('<span id="errorMessage">&nbsp&nbsp&nbspInvalid Number</span>');
          return;
        }else if (!checkPassword(pass)) {
          $("span").remove();
          $("#error").append('<span id="errorMessage">&nbsp&nbsp&nbsp Invalid Password</span>');
          return;
        }else if (pass!==rpass) {
          $("span").remove();
          $("#error").append('<span id="errorMessage">&nbsp&nbsp&nbsp Password Missmatch</span>');
          return;
        }
        var list_detail = {};
        list_detail["user_name"] = user_name;
        list_detail["email"] = email;
        list_detail["gender"] = gender;
        list_detail["phone_no"] = phone_no;
        list_detail["password"] = pass;

        $.ajax({
            type: "POST",
            data: list_detail,
            dataType: "json",
            //headers:{"Content-Type":"application/json"},
            url: "http://localhost:8081/signup",
            success: function(data) {
                console.log(data);
                if (data.status == true && data.session == true) {
                    homePage();
                    return;
                }
                if (data['error'][0].msg !== undefined) {
                    $("span").remove();
                    $("#error").append('<span id="errorMessage">&nbsp&nbsp&nbsp' + data['error'][0].msg + '</span>');
                } else {
                  //check for repeat passwor
                    // if (rpass !== pass) {
                    //     $("span").remove();
                    //     $("#error").append('<span id="errorMessage">&nbsp&nbsp&nbspPassword Missmatch</span>');
                    // } else {
                        console.log(data['error']);
                        $("span").remove();
                        $("#error").append('<span id="errorMessage">&nbsp&nbsp&nbsp' + data['error'] + '</span>');

                    // }
                }
            },
            error: function(error) {
                //  alert(data);
                console.log("page not loded");
            }
        });

    }));

    $(document).on("submit", "#loginForm", (function(event) {
        var email = $("#checkemail").val();
        var password = $("#checkpwd").val();
        var logindata = {};
        logindata["email"] = email;
        logindata["password"] = password;
        if(!checkEmail(email)){
          $("span").remove();
          $("#error").append('<span id="errorMessage">&nbsp&nbsp&nbspInvalid Email</span>');
          return;
        }else if (!checkPassword(password)) {
          $("span").remove();
          $("#error").append('<span id="errorMessage">&nbsp&nbsp&nbsp Invalid Password</span>');
          return;
        }
        $.ajax({
            type: "POST",
            data: logindata,
            dataType: "json",
            //  headers:{"Content-Type":"application/json"},
            url: "http://localhost:8081/login",
            success: function(data) {
                console.log(data);
                if (data.status == true && data.session == true) {
                    homePage();
                    return;
                } else {
                    if (data['error'][0].msg !== undefined) {
                        $("span").remove();
                        $("#error").append('<span id="errorMessage">&nbsp&nbsp&nbsp' + data['error'][0].msg + '</span >');
                    } else {
                        // console.log(data.error);
                        console.log(data['error']);
                        $("span").remove();
                        $("#error").append('<span id="errorMessage">&nbsp&nbsp&nbsp' + data['error'] + '</span>');
                        // console.log(data);
                    }
                }
            },
            error: function(error) {
                alert("cant load the page");
                console.log("page not loded");
            }
        });

    }));

    function indexPage() {
        $.ajax({
            url: "index.html",
            type: "GET",
            dataType: "html",
            success: function(response) {
                console.log('the page was loaded');
                // $('body').style({display:inline});
                // $('body').html(response);
                $('body').css("display", "inline");
            },
            error: function(error) {
                console.log('the page was NOT loaded', error);
            },
            complete: function(xhr, status) {
                console.log("the request is complete!");
            }
        })
    }


    function homePage() {
        $.ajax({
            url: "template/home.html",
            type: "GET",
            dataType: "html",
            success: function(response) {
                console.log('the page was loaded' );
                // $('body').css("display","inline");
                $('body').html(response);
                $('body').css("display", "inline");

            },
            error: function(error) {
                console.log('the page was NOT loaded', error);
            },
            complete: function(xhr, status) {
                console.log("the request is complete!");
            }
        })
    }
    var checkEmail = function(email) {
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(email);
    }
    var checkPassword = function(pass) {
        var regex = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z]*[A-Z])(?=.*[@#$%&_]).*$/;
        return regex.test(pass);
    }
    var checkPhoneNo = function(phone_no) {
        var regex = /^([7-9]{1}[0-9]{9})$/;
        return regex.test(phone_no);
    }

    //-------------------------------------------------------------------------------------------------

    // if (typeof window.location.origin === "undefined"){
    //     window.location.origin = window.location.protocol + "//" + window.location.host;
    // }
    // Utility (helper) functions
    var utils = {

        // Finds a handlebars template by id.
        // Populates it with the passed in data
        // Appends the generated html to div#order-page-container
        renderPageTemplate: function(templateId, data) {
            console.log(templateId);
            var _data = data || {};
            var templateScript = $(templateId).html();
            var template = Handlebars.compile(templateScript);
            // Empty the container and append new content
            $("#page-container").empty();

            // Empty the container and append new content
            $("#page-container").append(template(_data));
        },

        // If a hash can not be found in routes
        // then this function gets called to show the 404 error page
        pageNotFoundError: function() {

            var data = {
                errorMessage: "404 - Page Not Found"
            };
            this.renderPageTemplate("#error-page-template", data);
        },

        // Fetch json data from the given url
        // @return promise
        // fetch: function(url, data) {
        //     var _data = data || {};
        //     return $.ajax({
        //         context: this,
        //         url: window.location.origin + "/" + url,
        //         data: _data,
        //         method: "GET",
        //         dataType: "JSON"
        //     });
        // }
    };

    /**
     *  Router - Handles routing and rendering for the order pages
     *
     *  Summary:
     *      - url hash changes
     *      - render function checks routes for the hash changes
     *      - function for that hash gets called and loads page content
     */
    var router = {

        // An object of all the routes
        routes: {},
        init: function() {
            console.log('router was created...');
            this.bindEvents();

            // Manually trigger a hashchange to start the router.
            // This make the render function look for the route called "" (empty string)
            // and call it"s function
            $(window).trigger("hashchange");
        },
        bindEvents: function() {

            // Event handler that calls the render function on every hashchange.
            // The render function will look up the route and call the function
            // that is mapped to the route name in the route map.
            // .bind(this) changes the scope of the function to the
            // current object rather than the element the event is bound to.
            $(window).on("hashchange", this.render.bind(this));
        },
        // Checks the current url hash tag
        // and calls the function with that name
        // in the routes
        render: function() {

            // Get the keyword from the url.
            var keyName = window.location.hash.split("/")[0];
            console.log(keyName);
            // Grab anything after the hash
            var url = window.location.hash;
            console.log(url);
            // Hide whatever page is currently shown.
            $("#page-container")
                .find(".active")
                .hide()
                .removeClass("active");

            // Call the the function
            // by key name
            if (this.routes[keyName]) {
                this.routes[keyName](url);

                // Render the error page if the
                // keyword is not found in routes.
            } else {
                utils.pageNotFoundError();
            }
        }
    };

    var spaRoutes = {

        // Default route (home page)
        "#home": function(url) {
            console.log('home was called...');
            utils.renderPageTemplate("#home-page-template");

        },
        "#about": function(url) {
            console.log('about was called...');
            utils.renderPageTemplate("#about-page-template");
        },
        "#contact": function(url) {
            console.log('contact was called...');
            utils.renderPageTemplate("#contact-page-template");
        },
        "#login": function(url) {
            console.log('login was called...');
            utils.renderPageTemplate("#login-page-template");
        },
        "#signup": function(url) {
            console.log('signup was called...');
            utils.renderPageTemplate("#signup-page-template");
        }
    };

    // Create a new instance of the router
    var spaRouter = $.extend({}, router, {
        routes: spaRoutes
    });

    spaRouter.init();
    // window.location.hash = "#login";



});
