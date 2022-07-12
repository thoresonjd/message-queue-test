import { produce, consume, purgeQueue, deleteQueue } from "./utils";
import { NumArgsError, UnrecognizedCommandError } from "./exceptions";

const main = () => {
    let args = process.argv.slice(2)
    if (args.length !== 1) {
        throw new NumArgsError (
            'Incorrect number of arguments\n' +
            'Usage: node main.js <command>'
        )
    }

    let command = args[0];
    switch (command) {
        case 'run':
            produce();
            consume();
            break;
        case 'purge':
            purgeQueue();
            break;
        case 'delete':
            deleteQueue();
            break;
        default:
            throw new UnrecognizedCommandError (
                'Unrecognized command\n' +
                'Commands: run | purge |  delete'
            )
    }
}

main()
