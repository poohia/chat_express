$(document).ready(function(){
  DASHBOARD.init();
  CONTACT.init();
});
var DASHBOARD = function()
{

    var _global = {
      btn_collapse : ".button-collapse",
      columns      : "ul.column",
      portlets     : ".portlet",
      close_widget : ".close-widget",
      btn_modal    : ".modal-trigger",
      btn_search   : "#btn_search",
      $input_search_value : $("#search_contact_value"),
      add_contact_modal : $("#addContactModal"),
      list_find_contact  : $("ul#list_find_contact"),
      icon_add_user     : "a.icon_add_user",
      list_request_contact : $("#portlet-request-friend ul")
    };

 

   function searchContact(e)
   {
      e.preventDefault();
      var tmp_contact = _global.$input_search_value.val();
      if(tmp_contact.length > 0)
      {
          $(_global.btn_search).addClass("disabled");
          CONTACT.searchContact(tmp_contact, 
          function(data){
              var users = data.users;
              if(users.length > 0)
              {
                $(" .not-found", _global.add_contact_modal).fadeOut();
                _global.$input_search_value.removeClass("invalid").addClass("valid");
                var li = _global.list_find_contact.data("prototype");
                $(" > * ",_global.list_find_contact).remove();
                $(_global.icon_add_user).off("click");
                  for(var i = 0 ; i < users.length ; i++)
                  {
                      var user = users[i];
                      var img = user.local.avatar;
                      var alt = "avatar";
                      var id = user._id;
                      var title = user.local.name;
                      var content = "";
                      var $li = $((li).replace("__id__",id).replace("__img__",img).replace("__alt__",alt).replace("__title__",title).replace("__content__",content));
                      _global.list_find_contact.append($li);
                  }
                  _global.list_find_contact.fadeIn();
                  $(_global.icon_add_user).on("click", addContact);

              }
              else
              {
                  _global.list_find_contact.fadeOut();
                $(" .not-found", _global.add_contact_modal).fadeIn();
                _global.$input_search_value.removeClass("valid").addClass("invalid");

              }
            })
           $(_global.btn_search).removeClass("disabled");
       }
       else
       {
        _global.$input_search_value.removeClass("valid").addClass("invalid");
       }
  };
    

    function addContact(e)
    {
       e.preventDefault();
       var  $that = $(this);
       var  curr_icon = $(" >i ", $that);
       /*** Async ************/
       curr_icon.removeClass("fa-user-plus").addClass("fa-spinner fa-pulse fa-fw");
       var  cuurLi    = $that.closest("li"); 
       var  id_user   = cuurLi.data("id");

       CONTACT.addContact(id_user, function(data)
       {
          curr_icon.removeClass("fa-spinner fa-pulse fa-fw").addClass("fa-check");
          $that.off("click");
       });

    };

    function getRequestContact()
    {
      CONTACT.getRequestContact(function(data){
        var li = _global.list_find_contact.data("prototype");
        $(" > * ",_global.list_request_contact).remove();
        var countData = data.length;
        if(countData !== 0)
        {
          for(var i = 0 ; i < countData ; i++)
          {
            var user = data[i];
            var img = user.local.avatar;
            var alt = "avatar";
            var id = user._id;
            var title = user.local.name;
            var content = "";
            var $li = $((li).replace("__id__",id).replace("__img__",img).replace("__alt__",alt).replace("__title__",title).replace("__content__",content));
            console.log(_global.list_request_contact);
            _global.list_request_contact.append(li);
          }
        }
      })
    }

    function init()
    {
      $(_global.btn_collapse).sideNav();
      $(_global.btn_modal).leanModal();
      $( _global.columns ).sortable({
          connectWith: ".column",
          handle: ".portlet-header",
          cancel: ".portlet-toggle",
          placeholder: "portlet-placeholder ui-corner-all"
      });
      $( _global.portlets )
         .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
         .find( ".portlet-header" )
        .addClass( "ui-widget-header ui-corner-all" )
        .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");
      $( ".portlet-toggle" ).click(function() {
          var icon = $( this );
          icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
          icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
      });
      $(_global.close_widget).on("click", function(){
        $(this).closest(".portlet").fadeOut("slow");
      });
      $(_global.columns).each(function(){
         Materialize.showStaggeredList($(this));
      });

      $(_global.btn_search).on("click",searchContact);
      $(_global.$input_search_value).on('keypress', function (event) {
         if(event.which === 13){
            searchContact(event);
         };
      });
      getRequestContact();
    };

    return {
      init : init
    }

}();