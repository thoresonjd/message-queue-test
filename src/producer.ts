import * as amqp from "amqplib/callback_api";

export const produce = () => {
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
            let msg = 'test message';

            // Assert queue and send message to queue
            channel.assertQueue(queue, { durable: true });
            channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });
            console.log(`Message sent: ${msg}`);
        });
    });
}