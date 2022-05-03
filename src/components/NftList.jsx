import { useNFTCollection } from "@thirdweb-dev/react";
import React, {useEffect, useState} from "react";
import NftCard from "./NftCard";
import {Col, Row} from "react-bootstrap";

const NFTList = () => {
    const nftCollection = useNFTCollection(process.env.REACT_APP_COLLECTION_ADDRESS);
    const [nfts, setNfts] = useState([]);

    useEffect(() => {
        fetchCollection()
    }, []);
    // }, [nftCollection]);

    const fetchCollection = () => {
        if (nftCollection) {
            nftCollection
                .getAll()
                .then((nfts) => {
                    console.log(nfts)
                    setNfts(nfts);
                })
                .catch((error) => {
                    console.error("failed to fetch nfts", error);
                });
        }
    }

    return (
        <Row xs={1} md={4} className="g-4 px-4 my-5">
            {nfts.map((nft) => (
                <Col key={process.env.REACT_APP_COLLECTION_ADDRESS + '_' + nft.metadata.id.toString()}>
                  <NftCard owner={nft.owner} metadata={nft.metadata}/>
                </Col>
            ))}
        </Row>
    );
};

export default NFTList