$(function(){
    chrome.storage.sync.get('limit', function(budget){
        $('#limit').val(budget.limit);
    });
    $('#saveLimit').click(function(){
        var limit = $('#limit').val();
        if(limit){
            chrome.storage.sync.set({"limit" : limit}, function(){
                close();
            })
        }
    });
    $('#resetTotal').click(function(){
        chrome.storage.sync.set({'total' : 0});
        var notifOptions = {
            type : 'basic',
            iconUrl : 'images/icon32.png',
            title : "Reset Spend!",
            message : "The spend has been reset to 0."
        };
        chrome.notifications.create("resetNotif", notifOptions);
    });
});