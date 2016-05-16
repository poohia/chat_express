var NOTIFICATION = function()
{
      /******* sounds *************/
   
   var basique_notification_sound = "/sounds/basique_notification.mp3";
   var audio = null;
   /***************************/
   
   var documentTitle = {} ;
   var speed = 100 ;
   var timeOut = null ;
   /***************************/
   
   function playSound()
   {
       audio.play();
   }

   function sendNotificationTitleDocument(message)
   {
        clearTimeout(timeOut);
       if(message !== undefined)
       {
         document.title = message ;
         documentTitle.base_new_message = message ; 
         documentTitle.message_dynamique = message ; 
         timeOut = setTimeout(sendNotificationTitleDocument, speed);
       }
       else
       {
           var message2 = documentTitle.message_dynamique.substring(2,documentTitle.message_dynamique.length) + "  ";
    	   document.title = message2;
    	   timeOut =  setTimeout(sendNotificationTitleDocument, speed);
    	   documentTitle.message_dynamique = message2;
    	   if (documentTitle.message_dynamique.substring(0,1) == "-") 
    	     documentTitle.message_dynamique = documentTitle.base_new_message ;
    	     sendNotificationTitleDocument(documentTitle.base_new_message);
           }
   }
   
   function stopNotificationTitleDocument()
   {
       clearTimeout(timeOut);
       document.title = documentTitle.document_title  ;
   }
   
   function appendBadgeNotificaiton(selectors)
   {
       if(Array.isArray(selectors))
       {
           for(var i = 0 ; i < selectors.length; i++)
           {
               var selector = selectors[i];
               var txt = selector.text();
               selector.text(parseInt(selector.text()) + 1).removeClass("invisible");
           }
       }
       else
       {
         var txt = selectors.text();
         selectors.text(parseInt(txt) + 1).removeClass("invisible");
       }
       
   }
   
   function resetBadgeNotification(selectors)
   {
              if(Array.isArray(selectors))
       {
           for(var i = 0 ; i < selectors.length; i++)
           {
               var selector = selectors[i];
               selector.text(0).addClass("invisible");
           }
       }
       else
       {
         selectors.text(0).addClass("invisible")
       }
   }
   
   function init()
   {
       audio = new Audio();
       audio.src = basique_notification_sound;
       documentTitle.document_title = document.title ;
   }
   
   return {
       init: init,
       playSound: playSound,
       sendNotificationTitleDocument: sendNotificationTitleDocument,
       stopNotificationTitleDocument: stopNotificationTitleDocument,
       appendBadgeNotificaiton : appendBadgeNotificaiton,
       resetBadgeNotification : resetBadgeNotification
   }
}()