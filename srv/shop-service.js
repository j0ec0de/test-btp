const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {

    const { Orders } = this.entities;

    // handler function

    this.on('checkOrderStatus', async (req) => {
        // const { Orders } = this.entities;

        const { orderID } = req.data;

        const order = await SELECT.one.from(Orders).where({ ID: orderID });

        if (order) {
            return `Order ${orderID} is being processed.`;
        } else {
            return `Order ${orderID} was not found.`;
        }
    });

    // handler function

    this.on('checkPayloadStatus', async (req) => {
        // const { Orders } = this.entities;

        const { orderID } = req.data;
        const order = await SELECT.one.from(Orders).where({ ID: orderID });

        if (order) {
            return `Submit successful for: ${order.customerName} and order ID: ${orderID}`;
        } else {
            return `Submit successful, order ${orderID} not found`;
        }
    });

    this.on('checkNewAction', async (req) => {
        console.log("Button works")
    })
    
    // this.after('READ', 'Orders', (data) => {
        // const orders = Array.isArray(data) ? data : [data];

        // for(const order of orders) {
        //     switch(order.status) {
        //         case 'P':
        //             order.statusText = 'Pending';
        //             order.criticality = 2;
        //             break;
        //         case 'C':
        //             order.statusText = 'Completed';
        //             order.criticality = 3;
        //             break;
        //         case 'F':
        //             order.statusText = 'Failed';
        //             order.criticality = 1;
        //             break;
        //         default:
        //             order.statusText = 'Unknown';
        //             order.criticality = 0;
        //             break;
        //     }
        // }

        this.after("READ", Orders, (each) => {
            if(each.status) {
                switch (each.status) {
                    case "P": 
                        each.status = "Pending";
                        each.criticality = 2;
                        break;
                    case "C": 
                        each.status = "Completed";
                        each.criticality = 3;
                        break;
                    case "F": 
                        each.status = "Failed";
                        each.criticality = 1;
                        break;
                    default: 
                        each.status = "Unknown";
                        each.criticality = 0;
                        break;
                }
            }
        });


    // });         
});