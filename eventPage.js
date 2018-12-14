var contextMenuItem = {
        "id" : "spendMoney",
        "title" : "Spend Money",
        "contexts" : ["selection"]
};

chrome.contextMenus.create(contextMenuItem);

function isInt(value){
    return !isNaN(value)&&parseInt(value)==value;
}

chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItemId=='spendMoney' && clickData.selectionText){
        if(isInt(clickData.selectionText)){
            chrome.storage.sync.get(['total','limit'], function(budget){
                var newTotal = 0;
                if(budget.total){
                    newTotal+=parseInt(budget.total);
                }
                newTotal+=parseInt(clickData.selectionText);
                chrome.storage.sync.set({'total':newTotal});
                if(newTotal>=budget.limit){
                    var notifOptions = {
                        type : 'basic',
                        iconUrl : 'images/icon32.png',
                        title : "Limit Reached!",
                        message : "Uh oh! Looks like you have reached your limit."
                    };
                    chrome.notifications.create("limitNotif", notifOptions);
                }
            });    
        } else {
            var notifOptions = {
                type : 'basic',
                iconUrl : 'images/icon32.png',
                title : "Invalid Spend",
                message : "Uh oh! Looks like you have selected wrong spend."
            };
            chrome.notifications.create("InvalidInputNotif", notifOptions);
        }
    }
});

chrome.storage.onChanged.addListener(function(changes, storageName){
    chrome.browserAction.setBadgeText({'text' : changes.total.newValue.toString()});
});