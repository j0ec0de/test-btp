const cds = require('@sap/cds');

module.exports = (srv) => {
    
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