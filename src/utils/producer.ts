import * as amqp from "amqplib/callback_api";

let queue = 'message_queue';
let msg = JSON.stringify({
    test: "this is a test message",
});

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

            // Assert queue
            channel.assertQueue(queue, { durable: true });

            // Send message to queue
            channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });
            console.log(`Message sent: ${msg}`);
        });
    });
}
