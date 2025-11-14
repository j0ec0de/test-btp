sap.ui.define([
    "sap/ui/core/BusyIndicator",
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/ButtonType",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/m/Table",
    "sap/m/Column",
    "sap/m/ColumnListItem",
    "sap/m/Text",
    "sap/f/Card",
    "sap/m/VBox",
    "sap/m/List",
    "sap/m/StandardListItem"
], function (BusyIndicator, MessageToast, Dialog, Button, ButtonType, MessageBox, JSONModel, Table, Column, ColumnListItem, Text, Card, VBox, List, StandardListItem ) {
    "use strict";
 
    return {
        // click: function () {
        //     BusyIndicator.show(0);
 
        //     setTimeout(function () {
        //         BusyIndicator.hide();
        //         MessageToast.show("Action completed successfully!");
        //     }, 2000);
        //     //},
        //         // another button function

        //         // show: function () {
        //         //     BusyIndicator.show(0);

        //         // ajax call
        //     jQuery.ajax({
        //         url:"/odata/v4/shop/Orders",
        //         type: "GET",
        //         contentType: "application/json",

        //         success: function (data) {
        //             BusyIndicator.hide();
                    
        //             // For OData v4, the array of results is in 'data.value'
        //             const orderCount = data.value.length;
        //             MessageToast.show(`AJAX Success! Fetched ${orderCount} orders.`);
                    

        //             // You can loop through the data
        //             console.log("Fetched Orders:", data.value);
        //             data.value.forEach(order => {
        //                 console.log(`Order ID: ${order.ID}, Customer: ${order.customerName}`);
        //             });
        //         },

        //         error: function (xhr, status, error) {
        //             BusyIndicator.hide();
        //             MessageBox.error(`AJAX Failed: ${error}`);
        //         }
        //     })
        // },

        show: function() {
            BusyIndicator.show(0);
            
            // static payload

            

            const myPayLoad = {
                "orderID": "OR002",
            };

            jQuery.ajax({
                url: "/odata/v4/shop/",
                type: "GET",
                headers: {
                    "X-CSRF-Token": "fetch" // ask for a token
                },

                success : function (data, status, xhr) {
                    const sCsrfToken = xhr.getResponseHeader("X-CSRF-Token");

                    jQuery.ajax({
                        url: "/odata/v4/shop/checkOrderStatus",
                        type: "POST",
                        contentType: "application/json",

                        data: JSON.stringify(myPayLoad),
                        headers: {
                            "X-CSRF-Token": sCsrfToken
                        },

                        success: function (data) {
                            BusyIndicator.hide();
                            MessageToast.show(`POST request successfully  ${data.value}`);
                            console.log("Response:", data);
                        },
                        
                        error: function(error) {
                            BusyIndicator.hide();
                            MessageBox.error(`Post action failed: ${error}`);
                        }
                    })

                
                },

                error : function (error) {
                    BusyIndicator.hide();
                    MessageBox.error(`Request failed: ${error}`);
                }
            })

        },

        send: function() {
            BusyIndicator.show(0);

            jQuery.ajax({
                url: "/odata/v4/shop/Orders",
                type: "GET",
                contentType: "application/json",

                success: function (data) {
                    BusyIndicator.hide()

                    console.log("Fetched Orders:", data.value);
                    // data.value.forEach(order => {
                    //     console.log(`Order ID: ${order.ID}, Customer: ${order.customerName}`);
                    //     // MessageToast.show(`Details are: ${order.customerName}`);
                    // })


                    // array of orders
                    const aOrders = data.value;

                    // sort
                    aOrders.sort(function(a, b) {
                        return a.customerName.localeCompare(b.customerName);
                    });

                    const oSortedModel = new JSONModel(aOrders);


                    // const oList = new List({
                    //     items: {
                    //         path: "/",
                    //         template: new StandardListItem({
                    //             title: "{customerName}",
                    //             description: "Order ID: {ID} | Total: {totalPrice}"
                    //         })
                    //     }
                    // });

                    // oList.setModel(oSortedModel);


                    const oTable = new Table({
                        // sticky: ["Sticky.HeaderToolbar", "Sticky.ColumnHeader"],
                        columns: [
                            new Column({
                                header: new Text({ text: "Customer Name" })
                            }),
                            new Column({
                                header: new Text({ text: "Order ID" })
                            }),
                            new Column({
                                header: new Text({ text: "Total Price" })
                            }),
                            new Column({
                                header: new Text({ text: "Currency" })
                            }),
                            new Column({
                                header: new Text({ text: "Status" })
                            })
                        ],
                        items: {
                            path: "/",
                            template: new ColumnListItem({
                                cells: [
                                    new Text({ text: "{customerName}" }),
                                    new Text({ text: "{ID}" }),
                                    new Text({ text: "{totalPrice}" }),
                                    new Text({ text: "{currency_code}" }),
                                    new Text({ text: "{status}" })
                                ]
                            })
                        }
                    });

                    oTable.setModel(oSortedModel);

                    const oDialog = new Dialog({
                        title: "Orders",
                        contentWidth: "50rem",
                        contentHeight: "30rem",
                        content: [oTable],
                        beginButton: new Button({
                            text: "Submit",
                            type: ButtonType.Emphasized,
                            press: function () {
                                const aSortedData = oSortedModel.getData();

                                if(!aSortedData || aSortedData.length === 0) {
                                    MessageToast.show("No Data to submit");
                                    return;
                                }

                                // get ID of the first row

                                const sFirstRowID = aSortedData[0].ID;

                                // payload

                                const oPayload = {
                                    orderID: sFirstRowID
                                };

                                BusyIndicator.show(0);

                                jQuery.ajax({
                                    url: "/odata/v4/shop",
                                    type: "GET",
                                    headers: {
                                        "X-CSRF-Token": "fetch" // ask for token
                                    },

                                    success: function (data, status, xhr) {
                                        const sCsrfToken = xhr.getResponseHeader("X-CSRF-Token")
                                        jQuery.ajax({
                                            url: "/odata/v4/shop/checkPayloadStatus",
                                            type: "POST",
                                            contentType: "application/json",

                                            data: JSON.stringify(oPayload),
                                            headers: {
                                                "X-CSRF-Token": sCsrfToken
                                            },

                                            success: function (data) {
                                                BusyIndicator.hide();
                                                MessageToast.show(`Submit Success: ${data.value}`);
                                                oDialog.close();
                                            }, 
                                            error: function (error) {
                                                BusyIndicator.hide();
                                                MessageBox.error(`Submit Failed: ${error}`);
                                            }
                                        })
                                    },

                                    error: function (error) {
                                        MessageBox.error(`Action Failed: ${error}`);
                                    }
                                })  
                            }
                        }),
                        endButton: new Button({
                            text: "Cancel",
                            press: function () {
                                oDialog.close();
                            }
                        }),
                        afterClose: function() {
                            oDialog.destroy();
                        }
                    });
                    oDialog.open();
                },

                error: function(xhr, status, error) {
                    BusyIndicator.hide();
                    MessageBox.error(`Failed: ${error}`);
                }
            })

        },

        view: function() {
            BusyIndicator.show(0);

            // setTimeout(function() {
            //     BusyIndicator.hide();
            //     MessageToast.show("Button Works!");
            // }, 1000)  
            
            // const currentOrderId = this.getCurrentOrderId();
            // if (!currentOrderId) {
            //     MessageBox.error("No order id found!")
            //     return;
            // }

            jQuery.ajax({
                url: `/odata/v4/shop/OrderItems`,
                type: "GET",
                contentType: "application/json",

                success: function (data) {
                    BusyIndicator.hide();

                    console.log("Items: ",data.value )

                    const rOrders = data.value

                    // convert to JSON

                    const oModel = new JSONModel(rOrders);

                    const oList = new List({
                        items: {
                            path: "/",
                            template: new StandardListItem({
                                title: "{productName}",
                                description: "{customerName}",
                                info: "{formattedPrice}",
                                infoState: "Success"
                            })
                        }
                    });
                    oList.setModel(oModel);

                    const oDialog = new Dialog({
                        title: "Order Items",
                        contentWidth: "50rem",
                        contentHeight: "30rem",
                        content: [oList],
                        endButton: new Button({
                            text: "Cancel",
                            press: function() {
                                oDialog.close();
                            }
                        }),
                        afterClose: function() {
                            oDialog.destroy();
                        }
                    });
                    oDialog.open();

                },

                error: function (error) {
                    BusyIndicator.hide();
                    MessageBox.error(`Request failed: ${error}`);
                }
            })
        },

        change: function() {
            BusyIndicator.show(0);
            setTimeout( function (){
                BusyIndicator.hide();
                MessageToast.show("Change button works!!!")
            }, 1000)
        }   
    };
});