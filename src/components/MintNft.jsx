import {React, useState} from "react";
import {create as ipfsHttpClient} from 'ipfs-http-client'
import {useNFTCollection, useAddress} from "@thirdweb-dev/react";
import {NATIVE_TOKEN_ADDRESS} from "@thirdweb-dev/sdk";
import {Button, Col, Form, Row} from "react-bootstrap";

const ipfsClient = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

const MintNft = () => {
    const [fileUrl, setFileUrl] = useState(null)
    const [formInput, updateFormInput] = useState({price: '', name: '', description: ''})

    const address = useAddress();
    const contract = useNFTCollection(process.env.REACT_APP_COLLECTION_ADDRESS);

    async function onChange(e) {
        const file = e.target.files[0]
        try {
            const added = await ipfsClient.add(
                file,
                {
                    progress: (prog) => console.log(`received: ${prog}`)
                }
            )
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            console.log('Filename:' + url)
            setFileUrl(url)
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }

    async function uploadToIPFS() {
        const {name, description, price} = formInput
        if (!name || !description || !price || !fileUrl) return
        const data = JSON.stringify({
            name, description, image: fileUrl
        })
        try {
            await ipfsClient.add(data)
            // const url = `https://ipfs.infura.io/ipfs/${added.path}`
            return fileUrl
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }

    async function listNFTForSale() {
        const url = await uploadToIPFS()

        const metadata = {
            name: formInput.name,
            description: formInput.description,
            image: url
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
        console.log(mint)
    }

    return (
        <Row xs={2} md={2} className="g-4 px-4 my-5">
            <Col>
                <Form>
                    <Form.Group className="mb-3" controlId="formHorizontalName">
                        <Form.Label column sm={2}>
                            Name
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Name"
                                          onChange={e => updateFormInput({...formInput, name: e.target.value})}/>
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formHorizontalDescription">
                        <Form.Label column sm={2}>
                            Description
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Description"
                                          onChange={e => updateFormInput({...formInput, description: e.target.value})}/>
                        </Col>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formHorizontalImage">
                        <Form.Label column sm={2}>
                            Image
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="file" placeholder="Image" onChange={onChange}/>
                        </Col>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Col sm={{span: 10, offset: 2}}>
                            <Button onClick={listNFTForSale} type="button">Mint NFT</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Col sm={{span: 10, offset: 2}}>
                        {
                            fileUrl && (
                                <img className="rounded mt-4" width="350" src={fileUrl}/>
                            )
                        }
                    </Col>
                </Form.Group>
            </Col>
        </Row>
    )
}

export default MintNft