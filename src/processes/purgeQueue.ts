import * as amqp from "amqplib/callback_api";

let queue = 'message_queue';

export const purgeQueue = () => {
    amqp.connect('amqp://localhost', (err, connection) => {
        if (err) {
            throw err;
        }
        
        connection.createChannel((err, channel) => {
            if (err) {
                throw err;
            }
            
            channel.purgeQueue(queue);
            console.log(`[x] Queue ${queue} was purged of all messages`);
        });
    });
};
