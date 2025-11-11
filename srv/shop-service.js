const cds = require('@sap/cds');

module.exports = (srv) => {

    // handler function

    srv.on('checkOrderStatus', async (req) => {
        const { Orders } = srv.entities;

        const { orderID } = req.data;

        const order = await SELECT.one.from(Orders).where({ ID: orderID });

        if (order) {
            return `Order ${orderID} (${order.customerName}) is being processed.`;
        } else {
            return `Order ${orderID} was not found.`;
        }
    });

    // handler function

    srv.on('checkPayloadStatus', async (req) => {
        const { Orders } = srv.entities;

        const { orderID } = req.data;

        const order = await SELECT.one.from(Orders).where({ ID: orderID });

        if (order) {
            return `Submit successful for: ${order.customerName}`;
        } else {
            return `Submit successful, order ${orderID} not found`;
        }
    })
    
    srv.after('READ', 'Orders', (data) => {
        const orders = Array.isArray(data) ? data : [data];

        for(const order of orders) {
            switch(order.status) {
                case 'P':
                    order.statusText = 'Pending';
                    order.criticality = 2;
                    break;
                case 'C':
                    order.statusText = 'Completed';
                    order.criticality = 3;
                    break;
                case 'F':
                    order.statusText = 'Failed';
                    order.criticality = 1;
                    break;
                default:
                    order.statusText = 'Unknown';
                    order.criticality = 0;
                    break;
            }
        }
    });         
};