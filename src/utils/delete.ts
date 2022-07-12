import * as amqp from "amqplib/callback_api";

let queue = 'message_queue';

const deleteQueue = () => {
    amqp.connect('amqp://localhost', (err, connection) => {
        if (err) {
            throw err;
        }
        
        connection.createChannel((err, channel) => {
            if (err) {
                throw err;
            }
            
            channel.deleteQueue(queue);
        });
    });
}

deleteQueue();
