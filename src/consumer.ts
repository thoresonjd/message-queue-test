import * as amqp from "amqplib/callback_api";

export const consume = () => {
    // Create connections
    amqp.connect('amqp://localhost', (err, connection) => {
        if (err) {
            throw err;
        }

        // Create channel
        connection.createChannel((err, channel) => {
            if (err) {
                throw err;
            }

            let queue = 'message_queue';

            // Assert queue and receive message 
            channel.assertQueue(queue, { durable: true })
            channel.consume(queue, (msg) => {
                console.log(`Message received: ${msg?.content.toString()}`);
            });
        });
    });
}