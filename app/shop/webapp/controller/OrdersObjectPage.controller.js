sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("shop.controller.OrdersObjectPage", {

        // Custom logic when the "View" button is clicked
        view: function () {
            // Show the message toast when the button is clicked
            MessageToast.show("View Button clicked!");
        }
    });
});
