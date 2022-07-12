import { produceMessage, consumeMessages, purgeQueue, deleteQueue } from "./processes";
import { NumArgsError, UnrecognizedCommandError } from "./exceptions";

let commands = ['produce', 'consume', 'purge', 'delete'];

const handleArgs = (args: string[]) => {
    if (args.length < 1) {
        throw new NumArgsError (
            'Incorrect number of arguments\n' +
            'Usage: node main.js <command> <producerMessageIfApplicable\>'
        );
    }
    if (!commands.includes(args[0])) {
        throw new UnrecognizedCommandError (
            `Unrecognized command ${args[0]}\n` +
            'Commands: produce | consume | purge |  delete'
        );
    }
    if (args[0] === 'produce' && args.length === 1) {
        throw new NumArgsError (
            'Producer needs a message\n' +
            'Usage: node main.js produce <message>'
        );
    }
    if (args[0] !== 'produce' && args.length > 1) {
        throw new NumArgsError (
            `The ${args[0]} command takes no arguments\n` +
            `Usage: node main.js ${args[0]}`
        );
    }
}

const execute = (command: string, message: string) => {
    switch (command) {
        case 'produce':
            produceMessage(message);
            break;
        case 'consume':
            consumeMessages();
            break;
        case 'purge':
            purgeQueue();
            break;
        case 'delete':
            deleteQueue();
            break;
    }
}

const main = () => {
    let args = process.argv.slice(2);
    handleArgs(args);
    execute(args[0], args.slice(1).join(' '));
}

main();
