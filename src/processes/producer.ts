import * as amqp from "amqplib/callback_api";

let queue = 'message_queue';

export const produceMessage = (message: string) => {
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
            
            let msg = JSON.stringify({
                message: message
            });

            // Assert queue
            channel.assertQueue(queue, { durable: true });

            // Send message to queue
            channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });
            console.log(`[x] Message sent: ${msg}`);
        });

        // Close connection after x amount of time
        setTimeout(() => {
            connection.close();
            process.exit(0);
        }, 5000);
    });
}
