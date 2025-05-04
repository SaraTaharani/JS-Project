function netWorkClientToServer(fxhr) {
    sendFXMLHttpRequest(fxhr);
}


function netWorkServerToClient(fxhr) {
    fxhr.dispatchEvent(fxhr.customEvent);
}

