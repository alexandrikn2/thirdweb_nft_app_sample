import {
    useMetamask,
    useNetwork,
    useAddress,
    useDisconnect,
} from '@thirdweb-dev/react';
import {Button} from "react-bootstrap";

export const ConnectWallet = () => {

    const connectWithMetamask = useMetamask();
    const disconnectWallet = useDisconnect();
    const address = useAddress();

    // If a wallet is connected, show address, chainId and disconnect button
    if (address) {
        return (
            <div>
                <Button onClick={disconnectWallet} type="button" variant="outline-danger">
                    {address.slice(0, 5) + '...' + address.slice(-3)} Disconnect
                </Button>
            </div>
        );
    }

    // If no wallet is connected, show connect wallet options
    return (
        <div>
            <Button onClick={connectWithMetamask} type="button" variant="outline-warning">
                Connect wallet
            </Button>
        </div>
    );
};