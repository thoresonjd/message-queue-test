import { produce } from "./producer";
import { consume } from "./consumer";

const main = () => {
    produce();
    consume();
} 

main()