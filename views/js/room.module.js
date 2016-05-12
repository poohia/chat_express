var ROOM  = function(){
   
   var _selectors = {
       portlet : ".portlet-chat",
       chat_content : ".chat-content",
       message_info : ".chat-content .message-info",
       message_content : ".row .message-content",
       send_message : ".btn-send",
       btn_close  : ".close-widget",
       btn_smiley : ".lien-smileys"
   }
   
   var rooms = new Array();
   
   
   /*** message text **************/
   var messageNewUser = "__speudo__ rejoint this room" ;
   var messageTyping = "__speudo__ writing" ;
   var messageDisconnect = "__speudo__ quit this room";
   /******************************/
   
   /**** div chat content *********/
   
   var divMessageInfo  = "<div class='message-chat message-info-content message-right'> __content__ </div>" ;
   var spanInfo = "<span class='infos-message grey-text lighten-3'>__user__ - __date__</span>"
   var divMyMessage = "<div class='message-chat message-content message-right '> <span class='theme-color white-text my-message bubble'> __content__  </span><br />"+ spanInfo +"</div>" ;
   var divUserMessage = "<div class='message-chat message-content message-left '> <span class='theme-color-2 white-text user-message bubble'> __content__  </span><br />"+ spanInfo +"</div>" ;
   
   /******************************/
 
   var typingTimer;  
   var isTyping = false;
   
   
   
   
   function createEvents(id_chat)
   {
       /**** init room *************/
       rooms[id_chat] = {};
       var room = rooms[id_chat];
       room.id = id_chat;
       //rooms[id_chat].portlet  = $(_selectors.portlet + "#" + id_chat);
       $(_selectors.portlet).each(function(){
           var $that = $(this);
           if($that.data("id") === id_chat)
           {
                 room.portlet = $that;
                 return ;
           }
       })
       room.chatContent = $(_selectors.chat_content, room.portlet);
       room.messageInfo = $(_selectors.message_info, room.portlet);
       room.textarea = $(_selectors.message_content, room.portlet);
       room.smileys  = $(_selectors.btn_smiley, room.portlet);
       room.btnSend = $(_selectors.send_message, room.portlet);
       room.btnClose = $(_selectors.btn_close, room.portlet);
       room.users = new Array();
       
       /***************************/
       
       /**** init socket **********/
       
       room.socket = io.connect(window.location.origin);
       jointRoom(id_chat, room.socket);
       socketController(room.socket);
       /****************************/
       
       
       /***** events ********/
       room.textarea.focus();
       
       room.btnSend.on("click", $.proxy(sendMessage, null,  room));
       room.textarea.enterKey($.proxy(sendMessage, null,  room));
       room.btnClose.on("click", $.proxy(closeChat, null, room));
       room.chatContent.on("DOMSubtreeModified", function(){
           var $that = $(this);
           var height = $that.prop('scrollHeight');
           $that.clearQueue();
           $that.stop();
           $that.animate({
               scrollTop : height
           });
               
           });
           
        eventSmileys(room);

       setEventWriting(room);
       
       /*********************/
       
       
   }
   function socketController(socket)
   {
       socket.on('new user', newUser);
       socket.on('update start typing', function(data)
       {
           setMessageInfo(data.roomId, messageTyping.replace("__speudo__", data.user.name));
       });
       socket.on('update stop typing', function(data){
            clearMessageInfo(data.roomId);
       });
       socket.on('update disconnect', function(data){
           setMessageInfoInChatRoom(data.roomId, messageDisconnect.replace("__speudo__", data.user.name));
       });
       socket.on('update message chat', newMessageRecept);
   }
   
   function jointRoom(id, socket)
   {
       var data = {};
       data.user = _user ;
       data.roomId = id ;
       socket.emit("joint room", data);
   }
   
   function newUser(data)
   {
       
       setMessageInfoInChatRoom(data.roomId, messageNewUser.replace("__speudo__", data.user.name));
   }
   function sendMessage(room)
   {
       var myMessage = room.textarea.val();
       if(myMessage.length !== 0)
       {
           var data = {};
           data.message = smiley_controller.normalizeMessage(myMessage) ; 
           data.user = _user;
           room.socket.emit("message chat", data);
           sendMyMessage(room, myMessage);
       }
   }
   
   function closeChat(room)
   {
       room.portlet.remove();
       var data = {};
       data.user = _user ;
       room.socket.emit("disconnect user", data);
       room.socket.disconnect();
       delete rooms[room.id] ;
        /*
       room.portlet.fadeOut(function(){
           $(this).remove();
       });*/
   }
   function setMessageInfo(id, message)
   {
       var room  = rooms[id];
       room.messageInfo.text(message);
   }
   function clearMessageInfo(id)
   {
      var room  = rooms[id];
      room.messageInfo.text("");         
   }
   function setMessageInfoInChatRoom(id, message)
   {
       var room = rooms[id];
       room.chatContent.append(divMessageInfo.replace("__content__", message));
       
   }
   function setEventWriting(room)
   {
       var data = {};
       data.user = _user;
       room.textarea.keypress(function () {
          clearTimeout(typingTimer);
          if (!isTyping) {
            room.socket.emit('start typing', data);
            isTyping = true;
          }
        });
        
       room.textarea.keyup(function () {
          clearTimeout(typingTimer);
          typingTimer = setTimeout(function () {
            if (isTyping) {
              room.socket.emit('stop typing', data);
              isTyping = false;
            }
          }, 500);
        });
   }
   function sendMyMessage(room, message)
   {
       room.chatContent.append(smiley_controller.dynamizeMessage(divMyMessage.replace("__content__",message).replace("__user__", _user.name).replace("__date__",getDateTime)));
       room.textarea.val('');
   }
   function newMessageRecept(data)
   {
       var room = rooms[data.roomId];
       room.chatContent.append(divUserMessage.replace("__content__", data.message).replace("__user__",data.user.name).replace("__date__",getDateTime));
   }
   function eventSmileys(room)
   {
        var smileys_content = $(".smileys-content" , room.smileys);
        room.smileys.on("click", function(e)
        {
            e.preventDefault();
            e.stopPropagation();
            var $that = $(this);
            $(".smileys-content", $that).toggle();
        });
        
        $(".close", smileys_content).on("click",function(e)
        {
            e.preventDefault();
            e.stopPropagation();
            smileys_content.hide();
        });
        smiley_controller.initListGraphique($(" > ul.smileys", smileys_content));
        $(".li-smile", smileys_content).on("click",$.proxy(addSmiley, null, room));
   }
   function addSmiley(room, e)
   {
       try
       {
            e.stopPropagation();
           var smileys_content = $(".smileys-content" , room.smileys);
           room.textarea.val(room.textarea.val() + ' ' + $(this).data("value"));
           smileys_content.hide();
           room.textarea.focus();
       }catch(e)
       {
           console.log(e);
       }
   }
   function getDateTime()
   { 
        var date = new Date(Date.now());
        var options = {
            weekday: "long", year: "numeric", month: "short",
            day: "numeric", hour: "2-digit", minute: "2-digit"
        };
        return date.toLocaleTimeString("en-us", options);
   }
   function init()
   {
       
   }
   return {
       init : init,
       createEvents: createEvents
   } 
}();
