sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
  "use strict";
  
  return Controller.extend("newstore.controller.shopview", {
    
    onInit: function () {
      // Create a new JSON model for your table data
      var oJSONModel = new JSONModel();
      this.getView().setModel(oJSONModel, "orderModel");  // Changed the model name to 'orderModel'
      
      // Get the OData V4 model (as defined in the manifest.json)
      var oODataModel = this.getOwnerComponent().getModel();
      if (!oODataModel) {
        console.error("❌ OData V4 model not found in Component");
        return;
      }
      
      // Bind to the Orders entity set (changed from Products to Orders)
      var oListBinding = oODataModel.bindList("/Orders");  // Changed '/Products' to '/Orders'
      
      // Fetch contexts asynchronously
      oListBinding.requestContexts().then(function (aContexts) {
        // Map each context to a plain JS object
        var aOrders = aContexts.map(function (oContext) {
          return oContext.getObject();
        });
        
        // Update the JSON model with the orders data
        oJSONModel.setData(aOrders);
        console.log("✅ Orders loaded successfully:", aOrders);
      }).catch(function (oError) {
        console.error("❌ Error while fetching Orders:", oError);
      });
    }
  });
});
