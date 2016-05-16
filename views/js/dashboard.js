$(document).ready(function(){
  DASHBOARD.init();
  NOTIFICATION.init();
  CONTACT.init();
  CHAT.init();
  ROOM.init();
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
      list_request_contact : $("#portlet-request-friend ul"),
      icon_valid_contact : ".accepte-request-friend",
      icon_refuse_contact : ".refuse-request-friend",
      list_contact   : $("#portlet-friends ul"),
      btn_refresh_contact : "i.refresh-contact",
      btn_refresh_spool : "i.refresh-spool",  
      btn_remove_contact : "#portlet-friends i.btn-remove-contact",
      list_my_request : $("#portlet-my-request-friend ul"),
      btn_refresh_my_request : "i.refresh-my-spool",
      btn_remove_my_request : "i.btn-remove-my-request-contact",
      btn_mini_portlet  : "i.btn-mini-portlet",
      portlet_chat_private : $("#prototype-chat-private").data("prototype"),
      column_chats : ".column-chats",
      btn_create_private_chat : "i.private-chat",
      portlets_chats : ".portlet-chat"
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
            
                      var RequestExist = ($(CONTACT.findRequestContactById(user._id)).length !== 0);
                      var ContactExist = ($(CONTACT.findContactById(user._id)).length !== 0);
                      var MyRequestExist =  ($(CONTACT.findMyRequestById(user._id)).length !== 0);
                      var img = user.local.avatar;
                      var alt = "avatar";
                      var id = user._id;
                      var title = user.local.name;
                      var content = "";
                      var $li = $((li).replace("__id__",id).replace("__img__",img).replace("__alt__",alt).replace("__title__",title).replace("__content__",content));
                      if(RequestExist || ContactExist || MyRequestExist)
                      {
                            $(_global.icon_add_user + " > i ", $li ).removeClass("fa-user-plus").addClass("fa-check");
                            $(_global.icon_add_user, $li).removeClass("icon_add_user");
                      }
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
      $(" > * ",_global.list_request_contact).remove();
      CONTACT.getRequestContact(function(data){
        var li = _global.list_request_contact.data("prototype");

        $(_global.icon_refuse_contact).off("click");
        $(_global.icon_valid_contact).off("click");

        var countData = data.length;
        if(countData !== 0)
        {
          for(var i = 0 ; i < countData ; i++)
          {
            var user = data[i] ;
            var img = user.local.avatar;
            var alt = "avatar";
            var id = user._id;
            var title = user.local.name;
            var content = "";
            _li = li.replace("__id__",id).replace("__img__",img).replace("__alt__",alt).replace("__title__",title); 
            _global.list_request_contact.append($(_li));
          }

           $(_global.icon_refuse_contact).on("click", refuseRequestContact);
           $(_global.icon_valid_contact).on("click", acceptRequestContact);

        };
      });
    }
    function refuseRequestContact()
    {
       var $icon = $(this);
       var $li   = $icon.closest(".li-request-contact");
       var id    = $li.data("id");
       $icon.removeClass("fa-times").addClass("fa-spinner fa-pulse fa-fw");

       CONTACT.refuseRequestContact(id, function(data){
        if(data.work)
           refreshDashboard();
         else
         {
           Materialize.toast('error ::: 10001', 4000);
           $icon.addClass("fa-times").removeClass("fa-spinner fa-pulse fa-fw");
         }
       });
    }
    function acceptRequestContact()
    {
       var $icon = $(this);
       var $li   = $icon.closest(".li-request-contact");
       var id    = $li.data("id");
       $icon.removeClass("fa-check").addClass("fa-spinner fa-pulse fa-fw");

       CONTACT.acceptRequestContact(id, function(data){
        if(data.work)
        {
           refreshDashboard();
        }
         else
         {
           Materialize.toast('error ::: 10001', 4000);
           $icon.addClass("fa-check").removeClass("fa-spinner fa-pulse fa-fw");
         }
       });

    };
    function getContacts()
    {
      $(" > *", _global.list_contact).remove();
      CONTACT.getContacts(function(contacts){
        if(contacts && contacts[0].length > 0)
        {
          var li = _global.list_contact.data("prototype");
          for(var i = 0 ; i < contacts[0].length ; i++)
          {
              var contact = contacts[0][i];
              var img = contact.local.avatar;
              var alt = "avatar";
              var id = contact._id;
              var title = contact.local.name;
              var content = "";
              var $li = $((li).replace("__id__",id).replace("__img__",img).replace("__alt__",alt).replace("__title__",title).replace("__content__",content));
              _global.list_contact.append($li);
          }
          $(_global.btn_remove_contact).click( removeContact);
          $(_global.btn_create_private_chat).on("click", createPrivateChat);
        }
      })
    };
    function removeContact()
    {
       var id = $(this).closest("li.li-contact").data("id");
       CONTACT.removeContact(id, refreshDashboard);
    };
    
    function getMyRequest()
    {
        $(" > *", _global.list_my_request).remove();
        CONTACT.getMyRequest(function(contacts)
        {

             if(contacts && contacts.length > 0)
             {
                 var li = _global.list_my_request.data("prototype");
                 for(var i = 0 ; i < contacts.length ; i++)
                 {
                      var contact = contacts[i];
                      var img = contact.local.avatar;
                      var alt = "avatar";
                      var id = contact._id;
                      var title = contact.local.name;
                      var content = "";
                      var $li = $((li).replace("__id__",id).replace("__img__",img).replace("__alt__",alt).replace("__title__",title).replace("__content__",content));
                      _global.list_my_request.append($li);
                 }
                 $(_global.btn_remove_my_request).on("click", removeMyRequest);
                 
             }
        });
    };
    function removeMyRequest()
    {
       var id = $(this).closest("li.li-myrequest").data("id");
       CONTACT.removeMyRequest(id, getMyRequest);
    };
    function refreshDashboard()
    {
      getRequestContact();
      getContacts();
     // getMyRequest();
    };
    
    function miniPortlet()
    {
         var $that = $(this);
         var $portlet = $that.closest(".portlet");
         $portlet = $(".portlet-content", $portlet ) ;
         var $portlet_content = $(" > *", $portlet);
         if($portlet.hasClass("mini-portlet"))
         {
               $portlet.animate({'height' : $portlet[0].scrollHeight}, function(){
                   $portlet_content.css('visibility', 'visible');
                   $portlet.removeClass("mini-portlet");
                   $that.removeClass("fa-expand").addClass("fa-minus");
               });

               
         }
         else
         {
             $portlet.animate({'height' : 0}, function(){
                 $portlet.addClass("mini-portlet");
                $that.addClass("fa-expand").removeClass("fa-minus");
             });
             $portlet_content.css('visibility', 'hidden')

         }
         
           
    };

    function createPrivateChat()
    {
        var $li = $(this).closest(".li-contact") ;
        var id = $li.data("id");
        var speudo = $(".title", $li).text();
        
        CHAT.createPrivateRoom(id, function(data){
           var isExist = false ; 
           $(_global.portlets_chats).each(function(){
               if($(this).data("id") === data._id)
               {
                   isExist = true ;
                   return ;
               }
           });
           if(!isExist)
           {
             var $newPortlet = $(_global.portlet_chat_private.replace("__id__", data._id).replace("__speudo1__",_user.name).replace("__speudo2__",speudo)) ;
             $(_global.column_chats).append($newPortlet);
             $(_global.btn_mini_portlet , $newPortlet).on('click',miniPortlet);
             ROOM.createEvents(data._id);
           }
        });
        
        
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

      $(_global.btn_refresh_spool).on("click", getRequestContact);
      $(_global.btn_refresh_contact).on("click", getContacts);
      $(_global.btn_refresh_my_request).on("click", getMyRequest);

      getRequestContact();
      getContacts();
      getMyRequest();
      
     $(_global.btn_mini_portlet).on("click", miniPortlet); 
     
    };

    return {
      init : init
    }

}();