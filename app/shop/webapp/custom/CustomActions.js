sap.ui.define([
    "sap/ui/core/BusyIndicator",
    "sap/m/MessageToast"
], function (BusyIndicator, MessageToast) {
    "use strict";
 
    return {
        click: function () {
            BusyIndicator.show(0);
 
            setTimeout(function () {
                BusyIndicator.hide();
                MessageToast.show("Action completed successfully!");
            }, 2000);
        }
    };
});