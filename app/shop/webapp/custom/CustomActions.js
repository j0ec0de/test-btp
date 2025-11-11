sap.ui.define([
    "sap/ui/core/BusyIndicator",
    "sap/m/MessageToast",
    "sap/m/Dialog"
], function (BusyIndicator, MessageToast, Dialog) {
    "use strict";
 
    return {
        click: function () {
            BusyIndicator.show(0);
 
            setTimeout(function () {
                BusyIndicator.hide();
                MessageToast.show("Action completed successfully!");
            }, 2000);
        //},
            // another button function

            // show: function () {
            //     BusyIndicator.show(0);

            // ajax call
            jQuery.ajax({
                url:"/odata/v4/shop/Orders",
                type: "GET",
                contentType: "application/json",

                success: function (data) {
                    BusyIndicator.hide();
                    
                    // For OData v4, the array of results is in 'data.value'
                    const orderCount = data.value.length;
                    MessageToast.show(`AJAX Success! Fetched ${orderCount} orders.`);
                    

                    // You can loop through the data
                    console.log("Fetched Orders:", data.value);
                    data.value.forEach(order => {
                        console.log(`Order ID: ${order.ID}, Customer: ${order.customerName}`);
                    });
                },

                error: function (xhr, status, error) {
                    BusyIndicator.hide();
                    MessageBox.error(`AJAX Failed: ${error}`);
                }
            })
        },

        show: function() {
            BusyIndicator.show(0);
            
            // static payload

            const myPayLoad = {
                "orderID": "OR003",
            };

            jQuery.ajax({
                url: "/odata/v4/shop/checkOrderStatus",
                type: "POST",
                contentType: "application/json",

                data: JSON.stringify(myPayLoad),

                success: function (data) {
                    BusyIndicator.hide();
                    MessageToast.show("POST request successfully!");
                    console.log("Response:", data);
                },
                
                error: function(error) {
                    BusyIndicator.hide();
                    MessageBox.error(`Post action failed: ${error}`);
                }
                
            })
        }
    };
});