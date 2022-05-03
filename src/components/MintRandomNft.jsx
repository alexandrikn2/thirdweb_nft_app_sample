import React from "react";
import {useNFTCollection} from "@thirdweb-dev/react";
import {
    useNetwork,
    useAddress,
} from '@thirdweb-dev/react';
import {Button} from "react-bootstrap";
import {NATIVE_TOKEN_ADDRESS, ThirdwebSDK} from "@thirdweb-dev/sdk";
import {ethers} from "ethers";

const MintRandomNft = () => {

    const address = useAddress();
    const network = useNetwork();

    const sdk = new ThirdwebSDK(
        new ethers.Wallet(
            process.env.REACT_APP_PRIVATE_KEY,
            ethers.getDefaultProvider('https://eth-rinkeby.alchemyapi.io/v2/P58x1g6491qUhIgG6ElZqBjdhKspr3A_')
            // ethers.getDefaultProvider('rinkeby')
        )
    );

    const contract = useNFTCollection(process.env.REACT_APP_COLLECTION_ADDRESS);
    // const contract = sdk.getNFTCollection("0x46e95a2bD18c15AdD77e5451aa4559d804252490");
    // const edition = useEdition("0x98e67c37eb71AEcda9A2640e324D88caC45e8288");

    // const nftCollection = useNFTCollection("0x46e95a2bD18c15AdD77e5451aa4559d804252490");
    // let nftCount = 0
    // if (nftCollection) {
    //     // call functions on your contract
    //     nftCollection
    //         .getAll()
    //         .then((nfts) => {
    //             nftCount = nfts.length
    //         })
    //         .catch((error) => {
    //             console.error("failed to fetch nfts", error);
    //         });
    // }

    const mint = async () => {

        // const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        const provider = ethers.getDefaultProvider('https://eth-rinkeby.alchemyapi.io/v2/P58x1g6491qUhIgG6ElZqBjdhKspr3A_');
        const signer = provider.getSigner();
        console.log(signer);

        const metadata = {
            name: "$HPNY NFT",
            // name: "Random NFT # " + (nftCount + 1),
            description: "Just a simple hpny logo",
            // description: "Randomly generated NFT number " + (nftCount + 1),
            image: "https://ipfs.filebase.io/ipfs/bafkreiaudd7ffpzwvhhrdwjoxoij5mhc3gyaycgyk5mjdzizynunk2dyxe"
        };
        const signedPayload = await contract.signature.generate({
            metadata: metadata,
            tokenId: 1,
            quantity: "1",
            to: address,
            currencyAddress: NATIVE_TOKEN_ADDRESS,
            price: '0.01',
        });

        const mint = await contract.signature.mint(signedPayload)

        // const tx = await contract.mintTo(address, metadata);
        // const receipt = tx.receipt; // the transaction receipt
        // const tokenId = tx.id; // the id of the NFT minted
        // const nft = await tx.data(); // (optional) fetch details of minted NFT

        // console.log(receipt, tokenId, nft)
        // console.log(signedPayload)
        console.log(mint)
    }

    return(
        <div>
            <Button onClick={mint} style={{width:"220px", margin: "20px auto"}} type="button" variant="primary">
                Mint random NFT
            </Button>
        </div>
    )
}

export default MintRandomNft