var _icons = {
    'commons' : 
    [
      {'code' : ':D', 'url'  : 'https://cdn1.iconfinder.com/data/icons/silk2/emoticon_happy.png'}, //Grin
      {'code' : ':(', 'url' : 'https://cdn3.iconfinder.com/data/icons/fugue/icon/smiley-sad.png'}, // Sad
      {'code' : ':)', 'url' : 'https://cdn1.iconfinder.com/data/icons/silk2/emoticon_smile.png'}, //Smile
      {'code' : ';)', 'url' : 'https://cdn3.iconfinder.com/data/icons/fugue/icon/smiley-wink.png' }, // Wink
      {'code' : ':p', 'url' : 'https://cdn3.iconfinder.com/data/icons/fugue/icon/smiley-razz.png' }, // Tongue smile
      {'code' : ':o', 'url' : 'https://cdn3.iconfinder.com/data/icons/fugue/icon/smiley-eek.png' }, // Suprised
      {'code' : [':\'(', ':&#39;('] , 'url' : 'http://www.freesmileys.org/smileys/smiley-basic/cry.gif'}, // Crying
      {'code' : ':$'  , 'url' : 'https://cdn2.iconfinder.com/data/icons/ledicons/smiley_red.png'}, // Shy
      {'code' : ':/'    , 'url' : 'https://cdn2.iconfinder.com/data/icons/ledicons/smiley_fat.png'}, // 
      {'code' :  ':@'  , 'url' : 'http://www.freesmileys.org/smileys/smiley-basic/rant.gif'} , // Angry
      {'code' : '(H)' , 'url' : 'https://cdn2.iconfinder.com/data/icons/ledicons/smiley_cool.png' }, // Cool
      {'code' : '^o)', 'url' : 'http://www.freesmileys.org/smileys/smiley-basic/huh.gif'}, //  Sarcastic
      {'code' : '(A)', 'url' : 'https://cdn2.iconfinder.com/data/icons/splashyIcons/smiley_amused.png'}, // Angel
      {'code' : '(Y)' , 'url' : 'https://cdn3.iconfinder.com/data/icons/fugue/icon/thumb-up.png' }, // Thumb up 
      {'code' : '(N)', 'url' : 'https://cdn3.iconfinder.com/data/icons/fugue/icon/thumb.png' },  // Thumb down
      {'code' : 'Oo', 'url' : 'https://cdn0.iconfinder.com/data/icons/fugue/icon/smiley-eek-blue.png' },  // Thumb down
      {'code' : ['><','&#62;&#60;'], 'url' : 'http://www.freesmileys.org/smileys/smiley-basic/badday.gif' }, // &#38;gt;&#38;lt; === ><
      {'code' : '>:)', 'url' : 'https://cdn2.iconfinder.com/data/icons/ledicons/smiley_yell.png' }, //
      {'code' : ':s', 'url' : 'https://cdn2.iconfinder.com/data/icons/ledicons/smiley_confuse.png'}, // confuse
      {'code' : ';:D', 'url' : 'https://cdn1.iconfinder.com/data/icons/silk2/emoticon_wink.png'}, // 
      {'code' : ':|', 'url' : 'https://cdn3.iconfinder.com/data/icons/fugue/icon/smiley-neutral.png' }, // 
      {'code' : '(S)', 'url' : 'https://cdn0.iconfinder.com/data/icons/fugue/icon/smiley-sleep.png' }, // sleep
      {'code' : '(doctor)', 'url' : 'https://cdn3.iconfinder.com/data/icons/pidginsmilies/doctor.png'} , // doctor
      {'code' : '(6)', 'url' : 'https://cdn3.iconfinder.com/data/icons/fugue/icon/smiley-twist.png'}, // Devil
      {'code' : '(f)', 'url' : 'https://cdn0.iconfinder.com/data/icons/fugue/icon/hand-finger.png'}, // fuck,
      {'code' : '(rock)', 'url' : 'https://cdn0.iconfinder.com/data/icons/fugue/icon/hand-ily.png'}, // rock
      {'code' : '(a)', 'url' : 'https://cdn2.iconfinder.com/data/icons/gnomeicontheme/16x16/stock/emoticons/stock_smiley-21.png'}, // aviator
      {'code' : '$;)', 'url' : 'https://cdn2.iconfinder.com/data/icons/gnomeicontheme/16x16/stock/emoticons/stock_smiley-23.png'},
      {'code' : 'O:/', 'url' : 'https://cdn0.iconfinder.com/data/icons/fugue/icon/smiley-roll-blue.png'},
      {'code' : '(kiss)', 'url' : 'https://cdn0.iconfinder.com/data/icons/fugue/icon/smiley-kiss.png'}, // kiss
      
      
    ]
}


var smiley_controller = function()
{
    var imgHtml = '<img class="smile" src="__url__" alt="__code__" border="0"   />' ;
    var urlError = '&err' ;
    var liSmile = '<li class="li-smile" data-value="__code__" title="__code__" >'+ imgHtml +'</li>'
    
    
    function getSmileyFromCode(code)
    {

      var url = null ;
      var common_icons_length =  _icons.commons.length ;
      for(var i = 0 ; i < common_icons_length ; i++)
      {
        var common_icon = _icons.commons[i] ;
        var common_code = common_icon.code ;
        
        var common_url = common_icon.url ;
        if(Array.isArray(common_code))
        {
          var common_code_length = common_code.length;
          for(var j = 0 ; j < common_code_length ; j++)
          {
            if( common_code[j] === code)
            {
                url = common_url ;
                j = common_code_length ;
            }
          }
        }
        else if( common_code === code)
        {
            url = common_url ;
            i = common_icons_length ;
        }
      }
      return  (url !== null)? url : urlError ;
      
    }
    function getCodeFromUrl(url)
    {

      var code = null ;
      var common_icons_length =  _icons.commons.length ;
      for(var i = 0 ; i < common_icons_length ; i++)
      {
        var common_icon = _icons.commons[i] ;
        var common_code = common_icon.code ;
        var common_url = common_icon.url ;
        
        if( common_url === url)
        {
            code = common_code ;
            i = common_icons_length ;
        }
      }
      return  (code !== null)? code : urlError ;
      
    }
    function extractSrc(baliseImg)
    {
      /*var split_balise = baliseImg.split(" ");
      return split_balise[1].replace("src=", '').replace('"', '');*/
    }
    function dynamizeMessage(message)
    {
       var split_message = message.split(" ");
       var final_message = '' ;
       
       for(var i = 0 ; i < split_message.length ; i++)
       {
          var curr_word =  split_message[i];

            var find_smiley = getSmileyFromCode(curr_word);
            if(find_smiley !== urlError)
            {
              final_message += " " + imgHtml.replace("__url__", find_smiley).replace("__code__", curr_word);
            }
            else
            {
              final_message += " " + curr_word ;
            }
          

          
       }
       // remove first escape
       return final_message.trim();
      
    }
    
    function normalizeMessage(message)
    {
       var split_message = message.split(" ");
 
       
       for(var i = 0 ; i < split_message.length ; i++)
       {
          var curr_word =  split_message[i];
          if(curr_word.startsWith('src='))
          {
            var src = curr_word.replace('src=', '').replace(/"/g, '');
            var find_smiley = getCodeFromUrl(src) ; 
            if( find_smiley !== urlError)
            {
               var balise_img = imgHtml.replace("__url__", src).replace("__code__", find_smiley);
              message =  message.replace(balise_img, find_smiley);
            }
          
          }
      }
      return message;
    }
    
    function initListGraphique(ul)
    {
      var common_icons_length =  _icons.commons.length ;
      for(var i = 0 ; i < common_icons_length ; i++)
      {
        var common_icon = _icons.commons[i] ;
        var common_code = common_icon.code ;
        var common_url = common_icon.url ;
        ul.append(liSmile.replace("__url__", common_url).replace(/__code__/g,(Array.isArray(common_icon.code))? common_icon.code[0] : common_icon.code));
      }
    }
    
    function watch(selector)
    {
     
    }
    
    

    return {
      getSmileyFromCode : getSmileyFromCode,
      dynamizeMessage : dynamizeMessage,
      normalizeMessage : normalizeMessage,
      initListGraphique : initListGraphique
    }
}();


// Compatib with expressjs
try{
	module.exports  = smiley_controller;}
catch(e){

}