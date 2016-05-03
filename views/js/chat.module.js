var CHAT = function(){
    
    
    function createPrivateRoom(id, callback)
    {
        var url = "/room/create-private-room/" + id;
        $.post(url)
        .done(callback)
        .fail(function(data)
        {
            console.log(data);
        });
    };
    
    function init()
    {
        
    };
    
    return {
        init: init,
        createPrivateRoom : createPrivateRoom
    }
}();