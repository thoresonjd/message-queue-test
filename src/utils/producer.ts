import * as amqp from "amqplib/callback_api";

let queue = 'message_queue';
let msg = {
    test: "this is a test message",
};

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

            // Assert queue and send message to queue
            channel.assertQueue(queue, { durable: true });
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)), { persistent: true });
            console.log(`Message sent: ${msg}`);
        });
    });
}
