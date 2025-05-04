class FXMLHttpRequest extends EventTarget {
    constructor() {
        super();
        this.customEvent = new CustomEvent("load");
        this.fOnreadystatechange = null
        this.fReadyState = 0;
        this.fResponseText = "";
        this.fHeaders = {}; //אובייקט המאחסן זוגות מפתח-ערך של כותרות שיישלחו עם הבקשה.
        this.fMethod = null; // מציין את שיטת ה-HTTP שתשמש עבור הבקשה
        this.fUrl = null; //מציין את כתובת האתר של נקודת הקצה של השרת שאליה יש לשלוח את הבקשה.
        this.fData = null; // מכיל את הנתונים שיש לשלוח יחד עם הבקשה
        this.fOnProgress = null; //פונקציה שמראה את מצב הבקשה 
        this.fStatus = 0;
        this.fStatusText = "";
    }
    fOpen(method, url) {
        this.fMethod = method;
        this.fUrl = url;
        this.fReadyState = 1;
    }
    fAbort() { }
    fGetAllResponseHeaders() {}
    fSend() {
        netWorkClientToServer(this);
    }
}