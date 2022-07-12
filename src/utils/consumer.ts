import * as amqp from "amqplib/callback_api";

let queue = 'message_queue';

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

            // Assert queue
            channel.assertQueue(queue, { durable: true })

            // Receive message from queue and dequeue it
            channel.consume(queue, (msg) => {
                let message = JSON.parse(msg?.content.toString()!);
                console.log(`Message received: ${message.test}`);
            }, {
                noAck: true
            });
        });
    });
}
